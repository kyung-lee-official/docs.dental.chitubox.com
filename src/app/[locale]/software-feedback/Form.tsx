"use client";

import {
	Dropdown,
	DropdownOption,
} from "@/components/universal-dropdown/dropdown/Dropdown";
import {
	bugReportingSchemaLoose,
	formSchema,
	formSchemaLoose,
	FormState,
	FormStateLoose,
	formTypes,
	formTypesEnUS,
	formTypesZhCN,
	orderAndAccountIssuesSchemaLoose,
	otherSchemaLoose,
	suggestionsSchemaLoose,
	usageHelpSchemaLoose,
} from "./form-options";
import { useReducer } from "react";
import { z } from "zod";
import { countries } from "./countries";
import { useLocale, useTranslations } from "next-intl";
import { IntegerInput } from "@/components/input/integer-input/IntegerInput";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const initialState: FormStateLoose = {
	name: "",
	email: "",
	country: null,
	attachments: [],
	dedicatedFields: null,
};

type OrderAndAccountIssues = z.infer<typeof orderAndAccountIssuesSchemaLoose>;
type BugReporting = z.infer<typeof bugReportingSchemaLoose>;
type UsageHelp = z.infer<typeof usageHelpSchemaLoose>;
type Suggestions = z.infer<typeof suggestionsSchemaLoose>;
type Other = z.infer<typeof otherSchemaLoose>;

type Action =
	/* common */
	| { type: "SET_NAME"; payload: FormState["name"] }
	| { type: "SET_EMAIL"; payload: FormState["email"] }
	| { type: "SET_COUNTRY"; payload: DropdownOption }
	| { type: "SET_ATTACHMENTS"; payload: string[] }
	/* dedicated */
	| {
			type: "SET_FORM_TYPE";
			payload: DropdownOption;
	  }
	| { type: "ORDER_ID"; payload: OrderAndAccountIssues["orderId"] }
	| { type: "SET_COMPUTER_SPECS_OS"; payload: BugReporting["os"] }
	| { type: "SET_SOFTWARE_VERSION"; payload: BugReporting["softwareVersion"] }
	| { type: "SET_COMPUTER_SPECS_CPU"; payload: BugReporting["cpu"] }
	| { type: "SET_COMPUTER_SPECS_GPU"; payload: BugReporting["gpu"] }
	| {
			type: "SET_COMPUTER_SPECS_GPU_DRIVER_VERSION";
			payload: BugReporting["gpuDriverVersion"];
	  }
	| {
			type: "SET_COMPUTER_SPECS_RAM_VOLUME";
			payload: BugReporting["ramVolume"];
	  }
	| {
			type: "SET_COMPUTER_SPECS_STORAGE_VOLUME";
			payload: BugReporting["storageVolume"];
	  }
	| { type: "SET_DESCRIPTION"; payload: string };

const reducer = (state: FormStateLoose, action: Action): FormStateLoose => {
	switch (action.type) {
		case "SET_NAME":
			return { ...state, name: action.payload as string };
		case "SET_EMAIL":
			return { ...state, email: action.payload as string };
		case "SET_COUNTRY":
			return {
				...state,
				country: action.payload as {
					id: string;
					value: string;
				},
			};
		case "SET_FORM_TYPE":
			let newDedicatedFields;
			switch (action.payload.id) {
				case "ORDER_AND_ACCOUNT_ISSUES":
					newDedicatedFields = {
						formType: "ORDER_AND_ACCOUNT_ISSUES",
						orderId: "",
						description: "",
					} as const;
					break;
				case "BUG_REPORTING":
					newDedicatedFields = {
						formType: "BUG_REPORTING",
						os: null,
						softwareVersion: "",
						cpu: null,
						gpu: null,
						gpuDriverVersion: null,
						ramVolume: null,
						storageVolume: null,
						description: "",
					} as const;
					break;
				case "USAGE_HELP":
					newDedicatedFields = {
						formType: "USAGE_HELP",
						softwareVersion: "",
						description: "",
					} as const;
					break;
				case "SUGGESTIONS":
					newDedicatedFields = {
						formType: "SUGGESTIONS",
						description: "",
					} as const;
					break;
				case "OTHER_ISSUES":
					newDedicatedFields = {
						formType: "OTHER_ISSUES",
						description: "",
					} as const;
					break;
				default:
					newDedicatedFields = {
						formType: "OTHER_ISSUES",
						description: "",
					} as const;
					break;
			}
			return {
				...state,
				dedicatedFields: newDedicatedFields,
			};
		case "ORDER_ID":
			if (
				state.dedicatedFields?.formType === "ORDER_AND_ACCOUNT_ISSUES"
			) {
				return {
					...state,
					dedicatedFields: {
						...state.dedicatedFields,
						orderId: action.payload as string,
					},
				};
			}
		case "SET_COMPUTER_SPECS_OS":
			if (state.dedicatedFields?.formType === "BUG_REPORTING") {
				return {
					...state,
					dedicatedFields: {
						...state.dedicatedFields,
						os: action.payload as string,
					},
				};
			}
		case "SET_SOFTWARE_VERSION":
			if (state.dedicatedFields?.formType === "BUG_REPORTING") {
				return {
					...state,
					dedicatedFields: {
						...state.dedicatedFields,
						softwareVersion: action.payload as string,
					},
				};
			}

		case "SET_COMPUTER_SPECS_CPU":
			if (state.dedicatedFields?.formType === "BUG_REPORTING") {
				return {
					...state,
					dedicatedFields: {
						...state.dedicatedFields,
						cpu: action.payload as string,
					},
				};
			}
		case "SET_COMPUTER_SPECS_GPU":
			if (state.dedicatedFields?.formType === "BUG_REPORTING") {
				return {
					...state,
					dedicatedFields: {
						...state.dedicatedFields,
						gpu: action.payload as string,
					},
				};
			}
		case "SET_COMPUTER_SPECS_GPU_DRIVER_VERSION":
			if (state.dedicatedFields?.formType === "BUG_REPORTING") {
				return {
					...state,
					dedicatedFields: {
						...state.dedicatedFields,
						gpuDriverVersion: action.payload as string,
					},
				};
			}

		case "SET_COMPUTER_SPECS_RAM_VOLUME":
			if (state.dedicatedFields?.formType === "BUG_REPORTING") {
				return {
					...state,
					dedicatedFields: {
						...state.dedicatedFields,
						ramVolume: action.payload as number,
					},
				};
			}
		case "SET_COMPUTER_SPECS_STORAGE_VOLUME":
			if (state.dedicatedFields?.formType === "BUG_REPORTING") {
				return {
					...state,
					dedicatedFields: {
						...state.dedicatedFields,
						storageVolume: action.payload as number,
					},
				};
			}
		case "SET_DESCRIPTION":
			return {
				...state,
				dedicatedFields: state.dedicatedFields
					? {
							...state.dedicatedFields,
							description: action.payload as string,
					  }
					: null,
			};
		default:
			return state;
	}
};

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

	const [state, dispatch] = useReducer(reducer, initialState);

	function validate(data: FormStateLoose) {
		const result = formSchema.safeParse(data);
		if (!result.success) {
			console.error(result.error);
			return false;
		}
		return true;
	}

	const mutation = useMutation({
		mutationFn: async (data: FormState) => {
			console.log(data);
			// await dentalUserFeedback(data);
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
						{/* name */}
						<input
							type="text"
							placeholder={t("form-name-placeholder")}
							className="block w-full h-12 px-4 py-1.5
							bg-neutral-100 rounded-md outline-none"
							onChange={(e) =>
								dispatch({
									type: "SET_NAME",
									payload: e.target.value,
								})
							}
						/>
						{/* email */}
						<input
							type="email"
							placeholder={t("form-email-placeholder")}
							className="block w-full h-12 px-4 py-1.5
							bg-neutral-100 rounded-md outline-none"
							onChange={(e) =>
								dispatch({
									type: "SET_EMAIL",
									payload: e.target.value,
								})
							}
						/>
						{/* region */}
						<div className="space-y-1">
							<div>{t("form-country-title")}</div>
							<Dropdown
								mode="search"
								options={countryList}
								selected={state.country}
								setSelected={(value) =>
									dispatch({
										type: "SET_COUNTRY",
										payload: value as DropdownOption,
									})
								}
								placeholder={t("form-country-placeholder")}
								getLabel={(option) => {
									const country = countryList.find(
										(item) => item.id === option.id
									);
									return country?.value as string;
								}}
								renderOption={(option, { selected }) => {
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
											<span>{country?.value}</span>
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
									const value = countryList.find((c) => {
										return c.id === opt.id;
									})!.value;
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
						</div>
						{/* type */}
						<div className="space-y-1">
							<div>{t("form-issue-type-title")}</div>
							<Dropdown
								mode="regular"
								options={formTypes}
								selected={
									{
										id: state.dedicatedFields?.formType,
									} as DropdownOption
								}
								setSelected={(value) =>
									dispatch({
										type: "SET_FORM_TYPE",
										payload: value as DropdownOption,
									})
								}
								placeholder={t("form-issue-type-title")}
								getLabel={(option) => {
									const formType = formTypeList.find(
										(item) => item.id === option.id
									);
									return formType?.value as string;
								}}
								renderOption={(option, { selected }) => {
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
											<span>{formType?.value}</span>
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
						</div>
						{state.dedicatedFields?.formType ===
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
										onChange={(e) => {
											dispatch({
												type: "ORDER_ID",
												payload: e.target.value,
											});
										}}
									/>
								</div>
							</div>
						)}
						{state.dedicatedFields?.formType ===
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
										onChange={(e) =>
											dispatch({
												type: "SET_COMPUTER_SPECS_OS",
												payload: e.target.value,
											})
										}
									/>
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
										onChange={(e) =>
											dispatch({
												type: "SET_SOFTWARE_VERSION",
												payload: e.target.value,
											})
										}
									/>
								</div>
								<div className="space-y-1">
									<div>CPU</div>
									<input
										type="text"
										placeholder="e.g. Intel Core i7-12700K"
										className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
										onChange={(e) =>
											dispatch({
												type: "SET_COMPUTER_SPECS_CPU",
												payload: e.target.value,
											})
										}
									/>
								</div>
								<div className="space-y-1">
									<div>GPU</div>
									<input
										type="text"
										placeholder="e.g. NVIDIA GeForce RTX 3080"
										className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
										onChange={(e) =>
											dispatch({
												type: "SET_COMPUTER_SPECS_GPU",
												payload: e.target.value,
											})
										}
									/>
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
										onChange={(e) =>
											dispatch({
												type: "SET_COMPUTER_SPECS_GPU_DRIVER_VERSION",
												payload: e.target.value,
											})
										}
									/>
								</div>
								<div className="space-y-1">
									<div>{t("from-ram-volume-title")}</div>
									<IntegerInput
										placeholder="e.g. 32"
										unit="GB"
										onChange={(value) =>
											dispatch({
												type: "SET_COMPUTER_SPECS_RAM_VOLUME",
												payload: value,
											})
										}
									/>
								</div>
								<div className="space-y-1">
									<div>{t("form-storage-volume-title")}</div>
									<IntegerInput
										placeholder="e.g. 2048"
										unit="GB"
										onChange={(value) =>
											dispatch({
												type: "SET_COMPUTER_SPECS_STORAGE_VOLUME",
												payload: value,
											})
										}
									/>
								</div>
							</div>
						)}
						{/* description */}
						<textarea
							className="w-full h-40 px-4 py-1.5
							bg-neutral-100 rounded-md outline-none"
							placeholder={t("form-description-placeholder")}
							onChange={(e) => {
								dispatch({
									type: "SET_DESCRIPTION",
									payload: e.target.value,
								});
							}}
						></textarea>
						{/* attachment */}
						<div className="space-y-1">
							<div>{t("form-attachment-title")}</div>
							<div
								className="w-32 h-20
								bg-neutral-100"
							></div>
						</div>
					</div>
					<div className="flex justify-center w-full">
						<button
							className="flex justify-center w-[360px] py-[15.5px]
							text-white/50
							bg-[#2B7FFF]/80
							rounded-full"
							onClick={(e) => {
								e.preventDefault();
								const formState = {
									...state,
									country: state.country?.id,
								};
								/* validate formState */
								const result = formSchema.safeParse(formState);
								if (!result.success) {
									console.error(result.error);
									return;
								}
								mutation.mutate(formState as FormState);
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
