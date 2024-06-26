type ErrorMessage = {
	CouldNotCompleteTask: string;
	DataNotFound: string;
	InvalidCredentials: string;
};

export const ErrorMessages: ErrorMessage = {
	CouldNotCompleteTask: "No se pudo completar la tarea",
	DataNotFound: "Dato no encontrado",
	InvalidCredentials: "Credenciales no válidas"
};
