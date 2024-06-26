import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components/ui";
import { DefaultValues, LocalStorageKeys } from "@/constants";
import { ToastIcons } from "@/constants/ui";
import { AuthFields, ToastTitles, ToastTypes } from "@/enums";
import { showToast } from "@/lib";
import { formSchema } from "@/schemas";
import { authStore, doctorStore, globalStore } from "@/store";
import { AuthForm, AuthUser, Doctor } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Auth(): React.ReactNode {
	const { setIsAuthenticated, signInUser, signUpUser } = authStore();
	const { getDoctorByEmail: getDoctorByEmail } = doctorStore();
	const { errorMessage, isLoading, clearErrorMessage, enableLoading, disableLoading, setErrorMessage } = globalStore();

	const navigate: NavigateFunction = useNavigate();

	const form = useForm<AuthForm>({
		resolver: zodResolver(formSchema),
		defaultValues: DefaultValues.Login
	});

	const onSubmit = async (formData: AuthUser): Promise<void> => {
		const authUser: AuthUser = structuredClone(formData);

		enableLoading();

		const doctorResponse: Doctor | string = await getDoctorByEmail(authUser.email);

		if (typeof doctorResponse === "string" && doctorResponse !== "") {
			setErrorMessage(doctorResponse);

			disableLoading();

			return;
		}

		const authResponse: string = await signInUser(authUser);

		if (authResponse === "") {
			localStorage.setItem(LocalStorageKeys.Id, (doctorResponse as Doctor).id);
			localStorage.setItem(LocalStorageKeys.Role, (doctorResponse as Doctor).role);

			setIsAuthenticated(doctorResponse as Doctor);

			disableLoading();

			return;
		}

		const response: string = await signUpUser(authUser);

		if (response !== "") {
			setErrorMessage(response);

			disableLoading();

			return;
		}

		localStorage.setItem(LocalStorageKeys.Id, (doctorResponse as Doctor).id);
		localStorage.setItem(LocalStorageKeys.Role, (doctorResponse as Doctor).role);

		setIsAuthenticated(doctorResponse as Doctor);

		disableLoading();

		navigate(`/${(doctorResponse as Doctor).role}/dashboard`);

		return;
	};

	useEffect((): void => {
		if (errorMessage !== "") {
			showToast({
				type: ToastTypes.Error,
				title: ToastTitles.Error,
				message: errorMessage,
				icon: ToastIcons.Error,
				onDismissAndOnAutoCloseFunctions: clearErrorMessage
			});
		}
	}, [errorMessage]);

	return (
		<div className="relative flex h-screen w-full items-center justify-center bg-[url('/src/assets/background-login.jpg')] bg-cover bg-center bg-no-repeat">
			{/* {isLoading && <Loader />} */}

			<div className="mx-5 rounded bg-blue-900/75 p-5 text-gray-100">
				<h3 className="mb-11 text-center text-5xl font-bold">Inicio de sesión</h3>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name={AuthFields.Email}
							render={({ field }) => (
								<FormItem className="text-center">
									<div className="relative">
										<FormControl>
											<Input {...field} type="email" className="border-b-1 login-input h-12 rounded-none border-transparent border-b-gray-50 bg-transparent text-center text-lg focus:outline-none" placeholder="" />
										</FormControl>

										<FormLabel className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-text text-2xl">Correo</FormLabel>
									</div>

									<div className="h-5">
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name={AuthFields.Password}
							render={({ field }) => (
								<FormItem className="text-center">
									<div className="relative">
										<FormControl>
											<Input {...field} type="password" className="border-b-1 login-input h-12 rounded-none border-transparent border-b-gray-50 bg-transparent text-center text-lg focus:outline-none" placeholder="" />
										</FormControl>

										<FormLabel className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-text text-2xl">Contraseña</FormLabel>
									</div>

									<div className="h-5">
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>

						<Button type="submit" size={"lg"} className="h-11 w-full text-lg" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Por favor, espere...
								</>
							) : (
								<>Iniciar sesión</>
							)}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
