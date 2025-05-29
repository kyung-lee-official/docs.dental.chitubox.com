"use client";

import { Dropdown } from "@/components/universal-dropdown/dropdown/Dropdown";
import {
	CreateChituboxDentalUserFeedbackDto,
	formSchema,
	FormState,
	formTypes,
	formTypesEnUS,
	formTypesZhCN,
} from "./form-options";
import { countries } from "./countries";
import { useLocale, useTranslations } from "next-intl";
import { IntegerInput } from "@/components/input/integer-input/IntegerInput";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dentalUserFeedback } from "@/utils/api/dental-user-feedback";

export const Form = () => {
	const locale = useLocale();
	const t = useTranslations("pages.software-feedback");
	let formTypeList;
	let countryList;
	switch (locale) {
		case "en-US":
			formTypeList = formTypesEnUS;
			countryList = countries.map((c) => ({
				id: c.code,
				value: c.name,
			}));
			break;
		case "zh-CN":
			formTypeList = formTypesZhCN;
			countryList = countries.map((c) => ({
				id: c.code,
				value: c.nameZhCn,
			}));
			break;
		default:
			formTypeList = formTypesEnUS;
			countryList = countries.map((c) => ({
				id: c.code,
				value: c.name,
			}));
			break;
	}

	const {
		register,
		watch,
		handleSubmit,
		formState,
		formState: { errors },
		control,
	} = useForm<FormState>({
		/**
		 * onChange only tracks independent fields,
		 * which means when an error is reported on a field, it will not be removed
		 * if you change another field to make the error condition go away.
		 *
		 * for example, if an error is reported in confirmPassword,
		 * and you try to change the password field to make the error go away,
		 * the error will still be there.
		 *
		 * therefore you can either using useEffect (recommended) or `watch` to track the changes
		 */
		mode: "onSubmit",
		resolver: zodResolver(formSchema),
		defaultValues: {
			attachments: [],
		},
	});
	const values = watch();

	function onSubmit() {
		const formState = {
			...values,
			country: values.country?.id,
			dedicatedFields: {
				...values.dedicatedFields,
				formType: values.dedicatedFields?.formType?.id,
			},
		};
		mutation.mutate(formState as CreateChituboxDentalUserFeedbackDto);
	}

	const mutation = useMutation({
		mutationFn: async (data: CreateChituboxDentalUserFeedbackDto) => {
			await dentalUserFeedback(data);
		},
		onSuccess: () => {},
		onError: (error) => {},
	});

	return (
		<div
			className="flex-auto lg:w-[884px] p-12 
			bg-white
			rounded-[16px]"
		>
			<div className="space-y-12">
				<div className="space-y-2">
					<h1
						className="flex justify-center w-full
						text-3xl font-bold"
					>
						{t("form-title")}
					</h1>
					<span
						className="flex justify-center w-full
						text-neutral-500 text-lg"
					>
						{t("form-subtitle")}
					</span>
				</div>
				<form className="space-y-12">
					<div className="space-y-6">
						<div className="space-y-1">
							{/* name */}
							<input
								type="text"
								placeholder={t("form-name-placeholder")}
								className="block w-full h-12 px-4 py-1.5
								bg-neutral-100 rounded-md outline-none"
								{...register("name")}
							/>
							{errors.name && (
								<div
									className="pl-1.5
									text-red-500 text-sm"
								>
									{t("form-name-error")}
								</div>
							)}
						</div>
						<div className="space-y-1">
							{/* email */}
							<input
								type="email"
								placeholder={t("form-email-placeholder")}
								className="block w-full h-12 px-4 py-1.5
								bg-neutral-100 rounded-md outline-none"
								{...register("email")}
							/>
							{errors.email && (
								<div className="text-red-500 text-sm">
									{t("form-email-error")}
								</div>
							)}
						</div>
						<div className="space-y-1">
							{/* country/region */}
							<div>{t("form-country-title")}</div>
							<Controller
								control={control}
								name="country"
								render={({ field }) => (
									<Dropdown
										mode="search"
										options={countryList}
										selected={field.value}
										// setSelected={(value) =>
										// 	dispatch({
										// 		type: "SET_COUNTRY",
										// 		payload:
										// 			value as DropdownOption,
										// 	})
										// }
										setSelected={field.onChange}
										placeholder={t(
											"form-country-placeholder"
										)}
										getLabel={(option) => {
											const country = countryList.find(
												(item) => item.id === option.id
											);
											return country?.value as string;
										}}
										renderOption={(
											option,
											{ selected }
										) => {
											const country = countryList.find(
												(item) => item.id === option.id
											);
											return (
												<div
													className={`px-2 py-1
													hover:text-blue-500
													hover:bg-neutral-100
													rounded-md cursor-pointer`}
												>
													<span>
														{country?.value}
													</span>
												</div>
											);
										}}
										controlClassName="flex items-center flex-wrap w-full h-12 px-4 py-1.5 gap-2
										bg-neutral-100
										rounded-md cursor-pointer"
										selectedItemClassName={(option) => {
											return `text-black truncate`;
										}}
										placeholderClassName="text-neutral-500/90 text-base truncate"
										menuClassName="absolute z-10 w-full mt-1 p-2.5
										bg-white
										rounded-md shadow-lg overflow-auto"
										getSearchString={(opt) => {
											const value = countryList.find(
												(c) => {
													return c.id === opt.id;
												}
											)!.value;
											return value;
										}}
										searchInputClassName="w-full p-2 border-b border-neutral-200 outline-none"
										optionWrapperClassName={(
											option,
											{ selected, hovered }
										) => {
											return `px-2 py-1
											hover:text-blue-500
											hover:bg-neutral-100
											rounded-md cursor-pointer`;
										}}
									/>
								)}
							/>
							{errors.country && (
								<div
									className="pl-1.5
									text-red-500 text-sm"
								>
									{t("form-country-error")}
								</div>
							)}
						</div>
						{/* type */}
						<div className="space-y-1">
							<div>{t("form-issue-type-title")}</div>
							<Controller
								control={control}
								name="dedicatedFields.formType"
								render={({ field }) => (
									<Dropdown
										mode="regular"
										options={formTypes}
										selected={field.value as any}
										setSelected={field.onChange}
										placeholder={t("form-issue-type-title")}
										getLabel={(option) => {
											const formType = formTypeList.find(
												(item) => item.id === option.id
											);
											return formType?.value as string;
										}}
										renderOption={(
											option,
											{ selected }
										) => {
											const formType = formTypeList.find(
												(item) => item.id === option.id
											);
											return (
												<div
													className={`px-2 py-1
													hover:text-blue-500
													hover:bg-neutral-100
													rounded-md cursor-pointer`}
												>
													<span>
														{formType?.value}
													</span>
												</div>
											);
										}}
										controlClassName="flex items-center flex-wrap w-full h-12 px-4 py-1.5 gap-2
										bg-neutral-100
										rounded-md cursor-pointer"
										selectedItemClassName={(option) => {
											return `text-black truncate`;
										}}
										placeholderClassName="text-neutral-500/90 text-base truncate"
										menuClassName="absolute z-10 w-full mt-1 p-2.5
										bg-white
										rounded-md shadow-lg overflow-auto"
										searchInputClassName="w-full p-2 border-b border-neutral-200 outline-none"
										optionWrapperClassName={(
											option,
											{ selected, hovered }
										) => {
											return `px-2 py-1
											hover:text-blue-500
											hover:bg-neutral-100
											rounded-md cursor-pointer`;
										}}
									/>
								)}
							/>
							{errors.dedicatedFields?.formType && (
								<div
									className="pl-1.5
									text-red-500 text-sm"
								>
									{t("form-issue-type-error")}
								</div>
							)}
						</div>
						{values.dedicatedFields?.formType?.id ===
							"ORDER_AND_ACCOUNT_ISSUES" && (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
								<div className="space-y-1">
									<div>{t("form-order-id-title")}</div>
									<input
										type="text"
										placeholder={t(
											"form-order-id-placeholder"
										)}
										className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
										{...register("dedicatedFields.orderId")}
									/>
									{values.dedicatedFields?.formType?.id ===
										"ORDER_AND_ACCOUNT_ISSUES" &&
										errors.dedicatedFields &&
										"orderId" in errors.dedicatedFields && (
											<div className="pl-1.5 text-red-500 text-sm">
												{t("form-order-id-error")}
											</div>
										)}
								</div>
							</div>
						)}
						{values.dedicatedFields?.formType?.id ===
							"BUG_REPORTING" && (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
								<div className="space-y-1">
									<div>
										{t("form-operating-system-title")}
									</div>
									<input
										type="text"
										placeholder="e.g. Windows 11 Pro 23H2"
										className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
										{...register("dedicatedFields.os")}
									/>
									{values.dedicatedFields?.formType?.id ===
										"BUG_REPORTING" &&
										errors.dedicatedFields &&
										"os" in errors.dedicatedFields && (
											<div className="pl-1.5 text-red-500 text-sm">
												{t(
													"form-operating-system-error"
												)}
											</div>
										)}
								</div>
								<div className="space-y-1">
									<div>
										{t("form-software-version-title")}
									</div>
									<input
										type="text"
										placeholder="e.g. 1.0.0"
										className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
										{...register(
											"dedicatedFields.softwareVersion"
										)}
									/>
									{values.dedicatedFields?.formType?.id ===
										"BUG_REPORTING" &&
										errors.dedicatedFields &&
										"softwareVersion" in
											errors.dedicatedFields && (
											<div className="pl-1.5 text-red-500 text-sm">
												{t(
													"form-software-version-error"
												)}
											</div>
										)}
								</div>
								<div className="space-y-1">
									<div>CPU</div>
									<input
										type="text"
										placeholder="e.g. Intel Core i7-12700K"
										className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
										{...register("dedicatedFields.cpu")}
									/>
									{values.dedicatedFields?.formType?.id ===
										"BUG_REPORTING" &&
										errors.dedicatedFields &&
										"cpu" in errors.dedicatedFields && (
											<div className="pl-1.5 text-red-500 text-sm">
												{t("form-cpu-error")}
											</div>
										)}
								</div>
								<div className="space-y-1">
									<div>GPU</div>
									<input
										type="text"
										placeholder="e.g. NVIDIA GeForce RTX 3080"
										className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
										{...register("dedicatedFields.gpu")}
									/>
									{values.dedicatedFields?.formType?.id ===
										"BUG_REPORTING" &&
										errors.dedicatedFields &&
										"gpu" in errors.dedicatedFields && (
											<div className="pl-1.5 text-red-500 text-sm">
												{t("form-gpu-error")}
											</div>
										)}
								</div>
								<div className="space-y-1">
									<div>
										{t("form-gpu-driver-version-title")}
									</div>
									<input
										type="text"
										placeholder="e.g. 576.02"
										className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
										{...register(
											"dedicatedFields.gpuDriverVersion"
										)}
									/>
									{values.dedicatedFields?.formType?.id ===
										"BUG_REPORTING" &&
										errors.dedicatedFields &&
										"gpuDriverVersion" in
											errors.dedicatedFields && (
											<div className="pl-1.5 text-red-500 text-sm">
												{t(
													"form-gpu-driver-version-error"
												)}
											</div>
										)}
								</div>
								<div className="space-y-1">
									<div>{t("form-ram-volume-title")}</div>
									<Controller
										control={control}
										name="dedicatedFields.ramVolume"
										render={({ field }) => (
											<IntegerInput
												placeholder="e.g. 32"
												unit="GB"
												value={field.value as any}
												onChange={field.onChange}
											/>
										)}
									/>
									{values.dedicatedFields?.formType?.id ===
										"BUG_REPORTING" &&
										errors.dedicatedFields &&
										"ramVolume" in
											errors.dedicatedFields && (
											<div className="pl-1.5 text-red-500 text-sm">
												{t("form-ram-volume-error")}
											</div>
										)}
								</div>
								<div className="space-y-1">
									<div>{t("form-storage-volume-title")}</div>
									<Controller
										control={control}
										name="dedicatedFields.storageVolume"
										render={({ field }) => (
											<IntegerInput
												placeholder="e.g. 2048"
												unit="GB"
												value={field.value as any}
												onChange={field.onChange}
											/>
										)}
									/>
									{values.dedicatedFields?.formType?.id ===
										"BUG_REPORTING" &&
										errors.dedicatedFields &&
										"storageVolume" in
											errors.dedicatedFields && (
											<div className="pl-1.5 text-red-500 text-sm">
												{t("form-storage-volume-error")}
											</div>
										)}
								</div>
							</div>
						)}
						{values.dedicatedFields?.formType?.id ===
							"USAGE_HELP" && (
							<div className="space-y-1">
								<div>{t("form-software-version-title")}</div>
								<input
									type="text"
									placeholder="e.g. 1.0.0"
									className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
									{...register(
										"dedicatedFields.softwareVersion"
									)}
								/>
								{values.dedicatedFields?.formType?.id ===
									"USAGE_HELP" &&
									errors.dedicatedFields &&
									"softwareVersion" in
										errors.dedicatedFields && (
										<div className="pl-1.5 text-red-500 text-sm">
											{t("form-software-version-error")}
										</div>
									)}
							</div>
						)}
						{values.dedicatedFields?.formType?.id ===
							"SUGGESTIONS" && (
							<div className="space-y-1">
								<div>{t("form-suggestions-title")}</div>
							</div>
						)}
						{/* description */}
						<div className="space-y-1">
							<textarea
								className="w-full h-40 px-4 py-1.5
								bg-neutral-100 rounded-md outline-none"
								placeholder={t("form-description-placeholder")}
								{...register("dedicatedFields.description")}
							></textarea>
							{errors.dedicatedFields?.description && (
								<div
									className="pl-1.5
									text-red-500 text-sm"
								>
									{t("form-description-error")}
								</div>
							)}
						</div>
						{/* attachment */}
						<div className="space-y-1">
							<div>{t("form-attachment-title")}</div>
							<Controller
								control={control}
								name="attachments"
								render={({ field }) => (
									<input
										type="file"
										accept=".png,.jpg,.jpeg,.pdf"
										className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
										onChange={(e) => {
											if (e.target.files?.length) {
												field.onChange(
													Array.from(e.target.files)
												);
											} else {
												field.onChange([]);
											}
										}}
									/>
								)}
							/>
						</div>
					</div>
					<div className="flex justify-center w-full">
						<button
							className={`flex justify-center w-[360px] py-[15.5px]
							text-white
							bg-[#2B7FFF] hover:bg-[#1E5BB8]
							rounded-full transition-colors duration-200 cursor-pointer`}
							onClick={(e) => {
								e.preventDefault();
								handleSubmit(onSubmit)();
							}}
						>
							{t("form-submit-button")}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
