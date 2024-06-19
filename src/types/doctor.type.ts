export type Doctor = {
	id: string;
	firstName: string;
	lastName: string;
	role: string;
};

export type DoctorTable = {
	index: string;
	firstName: string;
	lastName: string;
	role: string;
	actions: React.ReactNode;
};
