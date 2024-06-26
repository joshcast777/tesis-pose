/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApiResponse, AuthUser } from "@/types";
import { Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase";

const firebaseAuth: Auth = getAuth(app);

export async function firebaseSignInUser({ email, password }: AuthUser): Promise<ApiResponse<undefined>> {
	try {
		await signInWithEmailAndPassword(firebaseAuth, email, password);

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

export async function firebaseSignOutUser(): Promise<ApiResponse<string>> {
	try {
		await signOut(firebaseAuth);

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

export async function firebaseSignUpUser({ email, password }: AuthUser): Promise<ApiResponse<undefined>> {
	try {
		await createUserWithEmailAndPassword(firebaseAuth, email, password);

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

export async function firebaseGetAuthenticatedUser(): Promise<void> {
	onAuthStateChanged(
		firebaseAuth,
		(user) => {
			if (user) {
				console.log(user);
			} else {
				console.log("Error");
			}
		},
		(error: any) => {
			console.error(error);
		}
	);
}

// signInWithEmailAndPassword(auth, email, password)
// 	.then((userCredential) => {
// 		// Signed in
// 		const user = userCredential.user;
// 		// ...
// 	})
// 	.catch((error) => {
// 		const errorCode = error.code;
// 		const errorMessage = error.message;
// 	});
