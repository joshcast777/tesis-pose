/* eslint-disable @typescript-eslint/no-explicit-any */

import { getFirestore, doc, getDoc, Firestore, DocumentSnapshot, collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { dataNotFound, errorResponse } from "@/constants";
import { app } from "../firebase";
import { ApiResponse, Doctor, User } from "@/types";

const database: Firestore = getFirestore(app);

export async function firebaseGetUser(id: string): Promise<ApiResponse<User>> {
	try {
		const userSnapshot: DocumentSnapshot = await getDoc(doc(database, "users", id));

		if (!userSnapshot.exists()) {
			return {
				message: dataNotFound,
				success: false,
				data: undefined
			};
		}

		// const roleSnapshot: DocumentSnapshot = await getDoc(userSnapshot.get("role"));

		// if (!roleSnapshot.exists()) {
		// 	return {
		// 		message: dataNotFound,
		// 		success: false,
		// 		data: undefined
		// 	};
		// }

		const user: User = userSnapshot.data() as User;

		user.id = id;

		return {
			message: "",
			success: true,
			data: structuredClone(user)
		};
	} catch (error) {
		return {
			message: dataNotFound,
			success: false,
			data: undefined
		};
	}
}

export async function firebaseGetDoctors(): Promise<ApiResponse<Doctor[]>> {
	try {
		const doctorSnapshot: QuerySnapshot = await getDocs(collection(database, "doctors"));

		const doctors: Doctor[] = [];

		if (doctorSnapshot.size === 0) {
			return {
				message: "",
				success: true,
				data: structuredClone(doctors)
			};
		}

		doctorSnapshot.forEach((doctor): void => {
			doctors.push({
				...(doctor.data() as Doctor),
				id: doctor.id
			});
		});

		return {
			message: "",
			success: true,
			data: structuredClone(doctors)
		};
	} catch (error: any) {
		return {
			message: `${errorResponse}${error.code}`,
			success: false,
			data: undefined
		};
	}
}
