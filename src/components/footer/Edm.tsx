"use client";

import React, { useMemo, useState } from "react";
import { FacebookIcon } from "../icons/Sns";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { subscribeEdm } from "@/utils/api";
import { useLocale, useTranslations } from "next-intl";

const Google = ({ size, fill }: any) => {
	return (
		<svg
			viewBox="0 0 16 16"
			height={size}
			width={size}
			focusable="false"
			role="img"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"></path>
		</svg>
	);
};

interface IFormInput {
	email: string;
}

const schema = z.object({
	email: z.string().toLowerCase().email({ message: "Invalid email address" }),
});

export const Edm = () => {
	const locale = useLocale();
	const language = locale === "zh-CN" ? "zh-Hans" : "en";
	const [isEdmSubsribed, setIsEdmSubsribed] = useState<boolean>(false);
	const [isEdmSubsribedWithGoogle, setIsEdmSubsribedWithGoogle] =
		useState<boolean>(false);
	const [isEdmSubsribedWithFacebook, setIsEdmSubsribedWithFacebook] =
		useState<boolean>(false);
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		trigger,
	} = useForm<IFormInput>({
		mode: "onChange",
		resolver: zodResolver(schema),
	});

	const subscribeEdmMutation = useMutation<any, AxiosError<any>, IFormInput>({
		mutationFn: async (data: IFormInput) => {
			const { email } = data;
			return subscribeEdm(email, language);
		},
		onSuccess: (data) => {
			if (data.success) {
				setIsEdmSubsribed(true);
			}
		},
	});

	
	const validateBeforeSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const isEmailValid = await trigger("email"); 
		if (isEmailValid) {
			handleSubmit(onSubmit)(); 
		}
	};

	const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
		subscribeEdmMutation.reset();
		subscribeEdmMutation.mutate(data);
	};

	const app = useMemo(() => {
		/* Initialize Firebase */
		const firebaseConfig = {
			apiKey: "AIzaSyBSPWjPFoy6m8V9vL1fFcSNUq11ih7Wtvw",
			authDomain: "chitubox-web.firebaseapp.com",
			projectId: "chitubox-web",
			storageBucket: "chitubox-web.appspot.com",
			messagingSenderId: "998506226946",
			appId: "1:998506226946:web:f01898e5c311b521b0ce1b",
		};
		const app = initializeApp(firebaseConfig);
		return app;
	}, []);

	const t = useTranslations();

	return (
		<div className="flex flex flex-col gap-[22px]">
			<div className="flex flex-col gap-[10px]">
				<div className="text-[#E2E2E2] text-[14px]">
					{t("footer.subDesc")}
				</div>
				<form
					className="flex justify-start items-center text-gray-400"
					onSubmit={validateBeforeSubmit} 
				>
					<input
						type="text"
						disabled={isEdmSubsribed}
						className={`w-full 2xl:w-[320px] h-[40px] p-2
							${
								isEdmSubsribed
									? "cursor-not-allowed"
									: isFocused
									? "text-gray-300 duration-300"
									: errors.email
									? "text-red-600 duration-300"
									: "text-gray-300 duration-300"
							}
							bg-white/5 rounded-l outline-none`}
						placeholder={isFocused ? undefined : "Email"}
						{...register("email")}
						onFocus={() => setIsFocused(true)}
						onBlur={async () => {
							setIsFocused(false);
							await trigger("email"); 
						}}
					/>
					<button
						type="submit"
						className={
							isEdmSubsribed
								? `flex justify-center items-center w-[100px] h-[40px] p-2
									text-white bg-green-500 rounded-r cursor-default duration-300`
								: subscribeEdmMutation.isPending
								? `flex justify-center items-center w-[100px] h-[40px] p-2
									text-gray-400 bg-[hsl(201,100%,30%)] rounded-r cursor-wait duration-300`
								: isValid
								? `flex justify-center items-center w-[100px] h-[40px] p-2
									text-white bg-[#0086cc] hover:bg-[#0086ee] rounded-r duration-300`
								: `flex justify-center items-center w-[100px] h-[40px] p-2
									text-gray-400 bg-white/10 rounded-r cursor-not-allowed duration-300`
						}
						disabled={
							!isValid ||
							subscribeEdmMutation.isPending ||
							isEdmSubsribed
						}
					>
						{isEdmSubsribed
							? t("footer.subscribed")
							: t("footer.subscribe")}
					</button>
				</form>
			</div>
			<div className="flex justify-between items-center gap-4 2xl:w-[420px]">
				<button
					disabled={isEdmSubsribedWithGoogle}
					className={`flex-[0_1_200px] flex justify-center items-center h-10 gap-[10px]
						text-base
						${isEdmSubsribedWithGoogle ? "text-white/40" : "text-white/80"} ${
						!isEdmSubsribedWithGoogle && "hover:text-white"
					}
						bg-white/5 hover:bg-white/10
						rounded duration-200 ${isEdmSubsribedWithGoogle && "cursor-not-allowed"}`}
					title="Google"
					onClick={() => {
						const auth = getAuth(app);
						const provider = new GoogleAuthProvider();
						signInWithPopup(auth, provider)
							.then((result) => {
								result.user.email &&
									subscribeEdmMutation.mutate({
										email: result.user.email,
									});
								setIsEdmSubsribed(true);
								setIsEdmSubsribedWithGoogle(true);
								const credential =
									GoogleAuthProvider.credentialFromResult(
										result
									);
								const token = credential?.accessToken;
								const user = result.user;
							})
							.catch((error) => {
								const errorCode = error.code;
								const errorMessage = error.message;
								const email = error.email;
								const credential =
									GoogleAuthProvider.credentialFromError(
										error
									);
							});
					}}
				>
					<Google size={24} />
					Google
				</button>
				<button
					disabled={isEdmSubsribedWithFacebook}
					className={`flex-[0_1_200px] flex justify-center items-center h-10 gap-[10px]
						text-base
						${isEdmSubsribedWithFacebook ? "text-white/40" : "text-white/80"} ${
						!isEdmSubsribedWithFacebook && "hover:text-white"
					}
						bg-white/5 hover:bg-white/10
						rounded duration-200 ${isEdmSubsribedWithFacebook && "cursor-not-allowed"}`}
					title="Facebook"
					onClick={() => {
						const auth = getAuth(app);
						const provider = new FacebookAuthProvider();
						signInWithPopup(auth, provider)
							.then((result) => {
								result.user.email &&
									subscribeEdmMutation.mutate({
										email: result.user.email,
									});
								setIsEdmSubsribed(true);
								setIsEdmSubsribedWithFacebook(true);
								const credential =
									FacebookAuthProvider.credentialFromResult(
										result
									);
								const accessToken = credential?.accessToken;
								const user = result.user;
							})
							.catch((error) => {
								const errorCode = error.code;
								const errorMessage = error.message;
								const email = error.email;
								const credential =
									FacebookAuthProvider.credentialFromError(
										error
									);
							});
					}}
				>
					<FacebookIcon size={24} />
					Facebook
				</button>
			</div>
		</div>
	);
};
