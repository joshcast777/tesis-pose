import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Loader } from "@/components/ui";
import { loginDefault as defaultValues, notValidCredentials } from "@/constants";
import { formSchema } from "@/schemas";
import { authStore, userStore } from "@/store";
import { AuthForm, AuthUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const showToast = (clearErrorMessages: () => void): void => {
	toast.error("", {
		className: "bg-rose-800 gap-5 border-rose-800",
		description: (
			<div className="text-gray-50">
				<h5 className="text-lg font-semibold">Error</h5>

				<p className="text-base">{notValidCredentials.split("/")[1]}</p>
			</div>
		),
		icon: <CircleX size={30} className="text-gray-50" />,
		duration: 3000,
		dismissible: false,
		onDismiss: function (): void {
			clearErrorMessages();
		},
		onAutoClose: function (): void {
			clearErrorMessages();
		}
	});
};

const clearErrorMessages = (clearAuthErrorMessage: () => void, clearUserErrorMessage: () => void): void => {
	clearAuthErrorMessage();
	clearUserErrorMessage();
};

export default function Auth(): React.ReactNode {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { errorMessage: authErrorMessage, clearErrorMessage: clearAuthErrorMessage, signInUser } = authStore();
	const { errorMessage: userErrorMessage, clearErrorMessage: clearUserErrorMessage } = userStore();

	const form = useForm<AuthForm>({
		resolver: zodResolver(formSchema),
		defaultValues
	});

	const onSubmit = async (formData: AuthUser): Promise<void> => {
		const authUser: AuthUser = structuredClone(formData);

		setIsLoading(true);

		await signInUser(authUser);

		setIsLoading(false);
	};

	useEffect((): void => {
		console.log(authErrorMessage);
		console.log(userErrorMessage);
		if (authErrorMessage !== "" || userErrorMessage !== "") {
			showToast((): void => {
				clearErrorMessages(clearAuthErrorMessage, clearUserErrorMessage);
			});
		}
	}, [authErrorMessage, userErrorMessage]);

	return (
		<div className="relative flex h-screen w-full items-center justify-center bg-[url('../assets/background-login.jpg')] bg-cover bg-center bg-no-repeat">
			{isLoading && <Loader />}

			<div className="mx-5 rounded bg-blue-900/75 p-5 text-gray-100">
				<h3 className="mb-11 text-center text-5xl font-bold">Inicio de sesión</h3>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="email"
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
							name="password"
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

						<Button type="submit" size={"lg"} className="h-11 w-full text-lg">
							Iniciar sesión
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
