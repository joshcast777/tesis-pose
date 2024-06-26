import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, Calendar, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Loader, Popover, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem } from "@/components/ui";
import { DefaultValues } from "@/constants";
import { cn, showToast } from "@/lib";
import { doctorSchema } from "@/schemas";
import { doctorStore, globalStore } from "@/store";
import { Doctor, DoctorCreate } from "@/types";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DoctorFields, Roles, ToastTitles, ToastTypes } from "@/enums";
import { ToastIcons } from "@/constants/ui";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

export default function DoctorForm(): React.ReactNode {
	const [disable, setDisable] = useState<boolean>(false);

	const { editDoctor, getDoctor, saveDoctor } = doctorStore();
	const { errorMessage, isLoading, clearErrorMessage, enableLoading, disableLoading, setErrorMessage } = globalStore();

	const navigate: NavigateFunction = useNavigate();

	const { id } = useParams();

	const form = useForm<Doctor>({
		resolver: zodResolver(doctorSchema),
		defaultValues: DefaultValues.Doctor
	});

	const onSubmit: SubmitHandler<Doctor> = async (formData: Doctor): Promise<void> => {
		setDisable(true);
		enableLoading();

		const newDoctor: DoctorCreate = structuredClone(formData);

		const currentDate = new Date();

		newDoctor.role = id === undefined ? Roles.Doctor : form.getValues("role");
		newDoctor.creationDate = id === undefined ? currentDate : form.getValues("creationDate");
		newDoctor.updateDate = currentDate;
		newDoctor.status = true;

		let response: string = "";

		if (id === undefined) {
			response = await saveDoctor(newDoctor);
		} else {
			response = await editDoctor(id, newDoctor);
		}

		if (response !== "") {
			setErrorMessage(response);

			setDisable(false);
			disableLoading();

			return;
		}

		disableLoading();

		showToast({
			type: ToastTypes.Success,
			title: ToastTitles.Success,
			message: "Será redireccionado...",
			icon: ToastIcons.Success,
			onDismissAndOnAutoCloseFunctions: (): void => {
				navigate("/admin/dashboard");
			}
		});
	};

	const getDoctorById = async (id: string): Promise<void> => {
		enableLoading();

		const doctor: Doctor | string = await getDoctor(id);

		if (typeof doctor === "string") {
			setErrorMessage(doctor);

			disableLoading();

			return;
		}

		form.reset(doctor);
		console.log(form.getValues());

		disableLoading();
	};

	useEffect((): void => {
		if (id !== undefined) {
			getDoctorById(id);
		}
	}, []);

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
		<>
			{isLoading && <Loader />}

			<div className="flex h-screen flex-col items-center justify-start overflow-y-scroll bg-[url('/src/assets/background-doctor.webp')] bg-cover bg-center bg-no-repeat p-8 sm:justify-center landscape:sm:justify-start landscape:md:justify-center">
				<div className="container rounded bg-blue-100/75 p-5 text-gray-900 lg:max-w-[1024px]">
					<h2 className="text-center text-3xl font-bold uppercase xl:text-5xl">{id === undefined ? "Ingreso de doctor" : "Editar doctor"}</h2>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-5">
							<div className="sm:grid sm:grid-cols-2 sm:gap-5">
								<FormField
									control={form.control}
									name={DoctorFields.Dni}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">Cédula</FormLabel>

											<FormControl>
												<Input
													{...field}
													placeholder="Cédula"
													className={cn("text-base placeholder:text-base disabled:text-gray-900 disabled:opacity-75 md:h-12", {
														"shake-animation border-red-500 outline-red-500": Boolean(form.formState.errors.dni)
													})}
													disabled={id !== undefined}
												/>
											</FormControl>

											<div className="h-5">
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={DoctorFields.FirstName}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">Nombre</FormLabel>

											<FormControl>
												<Input
													{...field}
													placeholder="Nombre"
													className={cn("text-base placeholder:text-base md:h-12", {
														"shake-animation border-red-500 outline-red-500": Boolean(form.formState.errors.firstName)
													})}
												/>
											</FormControl>

											<div className="h-5">
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={DoctorFields.LastName}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">Apellido</FormLabel>

											<FormControl>
												<Input
													{...field}
													placeholder="Apellido"
													className={cn("text-base placeholder:text-base md:h-12", {
														"shake-animation border-red-500 outline-red-500": Boolean(form.formState.errors.lastName)
													})}
												/>
											</FormControl>

											<div className="h-5">
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={DoctorFields.BirthDate}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">Fecha de nacimiento</FormLabel>

											<Popover>
												<PopoverTrigger asChild>
													<FormControl className="placeholder:tex-base inline-flex w-full text-base md:h-12">
														<Button variant={"outline"} className={cn("pl-3 text-left font-normal", !Boolean(field.value) && "text-gray-100")}>
															{Boolean(field.value) ? format(field.value, "dd/MM/yyyy") : <span>Seleccione una fecha</span>} <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>

												<PopoverContent className="w-auto bg-gray-100 p-0" align="start">
													<Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
												</PopoverContent>
											</Popover>

											<div className="h-5">
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={DoctorFields.Sex}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">Sexo</FormLabel>

											<FormControl>
												<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex h-10 w-56 justify-between md:h-12">
													<FormItem className="flex items-center space-x-3 space-y-0 disabled:text-gray-900 disabled:opacity-75">
														<FormControl>
															<RadioGroupItem value="male" disabled={id !== undefined} />
														</FormControl>

														<FormLabel className="text-base font-normal">Masculino</FormLabel>
													</FormItem>

													<FormItem className="flex items-center space-x-3 space-y-0 disabled:text-gray-900 disabled:opacity-75">
														<FormControl>
															<RadioGroupItem value="female" disabled={id !== undefined} />
														</FormControl>

														<FormLabel className="text-base font-normal">Femenino</FormLabel>
													</FormItem>
												</RadioGroup>
											</FormControl>

											<div className="h-5">
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={DoctorFields.Phone}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">Celular</FormLabel>

											<FormControl>
												<Input
													{...field}
													placeholder="Celular"
													className={cn("text-base placeholder:text-base md:h-12", {
														"shake-animation border-red-500 outline-red-500": Boolean(form.formState.errors.phone)
													})}
												/>
											</FormControl>

											<div className="h-5">
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={DoctorFields.Email}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">Correo</FormLabel>

											<FormControl>
												<Input
													{...field}
													placeholder="Correo"
													className={cn("text-base placeholder:text-base disabled:text-gray-900 disabled:opacity-75 md:h-12", {
														"shake-animation border-red-500 outline-red-500": Boolean(form.formState.errors.email)
													})}
													disabled={id !== undefined}
												/>
											</FormControl>

											<div className="h-5">
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={DoctorFields.LocationAddress}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">Dirección domiciliaria</FormLabel>

											<FormControl>
												<Input
													{...field}
													placeholder="Dirección domiciliaria"
													className={cn("text-base placeholder:text-base md:h-12", {
														"shake-animation border-red-500 outline-red-500": Boolean(form.formState.errors.locationAddress)
													})}
												/>
											</FormControl>

											<div className="h-5">
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>
							</div>

							<div className="mt-5 flex items-center justify-between sm:justify-end sm:gap-5">
								<Button
									type="reset"
									variant="outline"
									disabled={disable}
									onClick={(): void => {
										form.reset();

										navigate("/admin/dashboard");
									}}
									className="w-28 lg:text-lg"
								>
									Cancelar
								</Button>

								<Button type="submit" disabled={disable} className="min-w-28 lg:text-lg">
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Por favor, espere...
										</>
									) : (
										"Guardar"
									)}
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</>
	);
}
