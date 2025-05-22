"use client";

import {
	Dropdown,
	DropdownOption,
} from "@/components/universal-dropdown/dropdown/Dropdown";
import {
	bugReportingSchemaLoose,
	Country,
	FormState,
	FormStateLoose,
	FormTypeLiteral,
	formTypes,
	formTypesEnUS,
	formTypesZhCN,
	orderAndAccountIssuesSchemaLoose,
	otherSchemaLoose,
	suggestionsSchemaLoose,
	usageHelpSchemaLoose,
} from "./form-options";
import { useReducer } from "react";
import { IntegerInput } from "@/components/input/integer-input/IntegerInput";
import { z } from "zod";
import { countries } from "./countries";
import { useLocale } from "next-intl";

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
						formType: { id: "ORDER_AND_ACCOUNT_ISSUES" },
						orderId: "",
						description: "",
					} as const;
					break;
				case "BUG_REPORTING":
					newDedicatedFields = {
						formType: { id: "BUG_REPORTING" },
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
						formType: { id: "USAGE_HELP" },
						softwareVersion: "",
						description: "",
					} as const;
					break;
				case "SUGGESTIONS":
					newDedicatedFields = {
						formType: { id: "SUGGESTIONS" },
						description: "",
					} as const;
					break;
				case "OTHER":
					newDedicatedFields = {
						formType: { id: "OTHER" },
						description: "",
					} as const;
					break;
				default:
					newDedicatedFields = state.dedicatedFields;
			}
			return {
				...state,
				dedicatedFields: newDedicatedFields,
			};
		case "ORDER_ID":
			if (
				state.dedicatedFields?.formType?.id ===
				"ORDER_AND_ACCOUNT_ISSUES"
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
			if (state.dedicatedFields?.formType?.id === "BUG_REPORTING") {
				return {
					...state,
					dedicatedFields: {
						...state.dedicatedFields,
						os: action.payload as string,
					},
				};
			}
		case "SET_SOFTWARE_VERSION":
			if (state.dedicatedFields?.formType?.id === "BUG_REPORTING") {
				return {
					...state,
					dedicatedFields: {
						...state.dedicatedFields,
						softwareVersion: action.payload as string,
					},
				};
			}

		case "SET_COMPUTER_SPECS_CPU":
			if (state.dedicatedFields?.formType?.id === "BUG_REPORTING") {
				return {
					...state,
					dedicatedFields: {
						...state.dedicatedFields,
						cpu: action.payload as string,
					},
				};
			}
		case "SET_COMPUTER_SPECS_GPU":
			if (state.dedicatedFields?.formType?.id === "BUG_REPORTING") {
				return {
					...state,
					dedicatedFields: {
						...state.dedicatedFields,
						gpu: action.payload as string,
					},
				};
			}
		case "SET_COMPUTER_SPECS_GPU_DRIVER_VERSION":
			if (state.dedicatedFields?.formType?.id === "BUG_REPORTING") {
				return {
					...state,
					dedicatedFields: {
						...state.dedicatedFields,
						gpuDriverVersion: action.payload as string,
					},
				};
			}

		case "SET_COMPUTER_SPECS_RAM_VOLUME":
			if (state.dedicatedFields?.formType?.id === "BUG_REPORTING") {
				return {
					...state,
					dedicatedFields: {
						...state.dedicatedFields,
						ramVolume: action.payload as number,
					},
				};
			}
		case "SET_COMPUTER_SPECS_STORAGE_VOLUME":
			if (state.dedicatedFields?.formType?.id === "BUG_REPORTING") {
				return {
					...state,
					dedicatedFields: {
						...state.dedicatedFields,
						storageVolume: action.payload as number,
					},
				};
			}
		default:
			return state;
	}
};

export const Form = () => {
	const locale = useLocale();
	let formTypeList;
	let countryList: DropdownOption[];
	switch (locale) {
		case "en-US":
			formTypeList = formTypesEnUS;
			countryList = countries
				.map((c) => ({
					id: c.code,
					value: c.name,
				}));
			break;
		case "zh-CN":
			formTypeList = formTypesZhCN;
			countryList = countries
				.map((c) => ({
					id: c.code,
					value: c.nameZhCn,
				}));
			break;
		default:
			formTypeList = formTypesEnUS;
			countryList = countries
				.map((c) => ({
					id: c.code,
					value: c.name,
				}));
			break;
	}

	const [state, dispatch] = useReducer(reducer, initialState);

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
						Submit a Ticket
					</h1>
					<span
						className="flex justify-center w-full
						text-neutral-500 text-lg"
					>
						Please submit your ticket, and we will contact you as
						soon as possible.
					</span>
				</div>
				<form className="space-y-12">
					<div className="space-y-6">
						{/* name */}
						<input
							type="text"
							placeholder="Name (required)"
							className="block w-full h-12 px-4 py-1.5
							bg-neutral-100 rounded-md outline-none"
						/>
						{/* email */}
						<input
							type="email"
							placeholder="Email (required)"
							className="block w-full h-12 px-4 py-1.5
							bg-neutral-100 rounded-md outline-none"
						/>
						{/* region */}
						<div className="space-y-1">
							<div>Country/Region</div>
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
								placeholder="Please select your country or region"
								getLabel={(option) => {
									const country = countries.find(
										(item) => item.code === option.id
									);
									return country?.name as string;
								}}
								renderOption={(option, { selected }) => {
									const country = countries.find(
										(item) => item.code === option.id
									);
									return (
										<div
											className={`px-2 py-1
											hover:text-blue-500
											hover:bg-neutral-100
											rounded-md cursor-pointer`}
										>
											<span>{country?.name}</span>
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
								optionClassName={(
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
							<div>What is your issue about?</div>
							<Dropdown
								mode="regular"
								options={formTypes}
								selected={
									state.dedicatedFields
										?.formType as DropdownOption
								}
								setSelected={(value) =>
									dispatch({
										type: "SET_FORM_TYPE",
										payload: value as DropdownOption,
									})
								}
								placeholder="Please select your feedback type (required)"
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
								optionClassName={(
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
						{(state.dedicatedFields?.formType as DropdownOption)
							?.id === "ORDER_AND_ACCOUNT_ISSUES" && (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
								<div className="space-y-1">
									<div>Order Id</div>
									<input
										type="text"
										placeholder="Your CHITUBOX Order ID (optional)"
										className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
									/>
								</div>
							</div>
						)}
						{/* {(state.formType as FormTypeOption)?.key ===
							"BUG_REPORTING" && (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
								<div className="space-y-1">
									<div>OS</div>
									<input
										type="text"
										placeholder="e.g. Windows 11 Pro 23H2"
										className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
									/>
								</div>
								<div className="space-y-1">
									<div>Software Version</div>
									<input
										type="text"
										placeholder="e.g. 1.0.0"
										className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
									/>
								</div>
								<div className="space-y-1">
									<div>CPU</div>
									<input
										type="text"
										placeholder="e.g. Intel Core i7-12700K"
										className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
									/>
								</div>
								<div className="space-y-1">
									<div>GPU</div>
									<input
										type="text"
										placeholder="e.g. NVIDIA GeForce RTX 3080"
										className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
									/>
								</div>
								<div className="space-y-1">
									<div>GPU Driver Version</div>
									<input
										type="text"
										placeholder="e.g. 576.02"
										className="block w-full h-12 px-4 py-1.5
										bg-neutral-100 rounded-md outline-none"
									/>
								</div>
								<div className="space-y-1">
									<div>RAM Volume</div>
									<IntegerInput
										placeholder="e.g. 32"
										unit="GB"
									/>
								</div>
								<div className="space-y-1">
									<div>Storage Volume</div>
									<IntegerInput
										placeholder="e.g. 2048"
										unit="GB"
									/>
								</div>
							</div>
						)} */}
						{/* description */}
						<textarea
							className="w-full h-40 px-4 py-1.5
							bg-neutral-100 rounded-md outline-none"
							placeholder="Please describe your issues in detail (required)"
						></textarea>
						{/* attachment */}
						<div className="space-y-1">
							<div>Attachment</div>
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
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
