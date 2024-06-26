/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorMessages } from "@/constants";
import { Collections, DoctorFields, QueryOperator, Roles } from "@/enums";
import { ApiResponse, Doctor, DoctorCreate } from "@/types";
import { CollectionReference, DocumentSnapshot, Firestore, Query, QueryDocumentSnapshot, QueryFieldFilterConstraint, QuerySnapshot, Timestamp, addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { app } from "../firebase";

const database: Firestore = getFirestore(app);

export async function firebaseEditDoctor(id: string, doctor: DoctorCreate): Promise<ApiResponse<undefined>> {
	try {
		console.log(id);
		console.log(doctor);
		await setDoc(doc(database, Collections.Doctors, id), doctor);

		return {
			success: true,
			message: ""
		};
	} catch (error: any) {
		console.error(error);

		return {
			success: false,
			message: error.code
		};
	}
}

export async function firebaseGetDoctor(id: string): Promise<ApiResponse<Doctor>> {
	try {
		const doctorSnapshot: DocumentSnapshot = await getDoc(doc(database, Collections.Doctors, id));

		if (!doctorSnapshot.exists()) {
			return {
				success: false,
				message: ErrorMessages.DataNotFound
			};
		}

		return {
			message: "",
			success: true,
			data: {
				...(doctorSnapshot.data() as Doctor),
				id: doctorSnapshot.id,
				birthDate: (doctorSnapshot.data()["birthDate"] as Timestamp).toDate(),
				updateDate: (doctorSnapshot.data()["updateDate"] as Timestamp).toDate(),
				creationDate: (doctorSnapshot.data()["creationDate"] as Timestamp).toDate()
			}
		};
	} catch (error: any) {
		console.error(error);

		return {
			success: false,
			message: error.code
		};
	}
}

export async function firebaseGetDoctorByEmail(email: string): Promise<ApiResponse<Doctor>> {
	try {
		const usersRef: CollectionReference = collection(database, Collections.Doctors);

		const whereStatement: QueryFieldFilterConstraint = where(DoctorFields.Email, QueryOperator.EqualTo, email);

		const usersQuery: Query = query(usersRef, whereStatement);

		const doctorSnapshot: QuerySnapshot = await getDocs(usersQuery);

		if (doctorSnapshot.size === 0) {
			return {
				success: false,
				message: "Empty array"
			};
		}

		return {
			success: true,
			message: "",
			data: {
				...(doctorSnapshot.docs[0].data() as Doctor),
				id: doctorSnapshot.docs[0].id,
				birthDate: (doctorSnapshot.docs[0].data()["birthDate"] as Timestamp).toDate(),
				updateDate: (doctorSnapshot.docs[0].data()["updateDate"] as Timestamp).toDate(),
				creationDate: (doctorSnapshot.docs[0].data()["creationDate"] as Timestamp).toDate()
			}
		};
	} catch (error: any) {
		console.error(error);

		return {
			success: false,
			message: error.code
		};
	}
}

export async function firebaseGetDoctors(): Promise<ApiResponse<Doctor[]>> {
	try {
		const usersRef: CollectionReference = collection(database, Collections.Doctors);

		const whereStatement: QueryFieldFilterConstraint = where(DoctorFields.Role, QueryOperator.EqualTo, Roles.Doctor);

		const usersQuery: Query = query(usersRef, whereStatement);

		const doctorSnapshot: QuerySnapshot = await getDocs(usersQuery);

		let doctors: Doctor[] = [];

		if (doctorSnapshot.size === 0) {
			return {
				message: "",
				success: true,
				data: structuredClone(doctors)
			};
		}

		doctors = doctorSnapshot.docs.map(
			(doctor: QueryDocumentSnapshot): Doctor => ({
				...(doctor.data() as Doctor),
				birthDate: (doctor.data()["birthDate"] as Timestamp).toDate(),
				updateDate: (doctor.data()["updateDate"] as Timestamp).toDate(),
				creationDate: (doctor.data()["creationDate"] as Timestamp).toDate(),
				id: doctor.id
			})
		);

		return {
			message: "",
			success: true,
			data: structuredClone(doctors)
		};
	} catch (error: any) {
		console.error(error);

		return {
			success: false,
			message: error.code
		};
	}
}

export async function firebaseSaveDoctor(newDoctor: DoctorCreate): Promise<ApiResponse<undefined>> {
	try {
		await addDoc(collection(database, Collections.Doctors), newDoctor);

		return {
			success: true,
			message: ""
		};
	} catch (error: any) {
		console.error(error);

		return {
			success: false,
			message: error.code
		};
	}
}
