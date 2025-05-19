"use client";

import { Dropdown } from "@/components/universal-dropdown/dropdown/Dropdown";
import { Country, FormType, formTypes } from "./form-options";
import { useReducer } from "react";
import { IntegerInput } from "@/components/input/integer-input/IntegerInput";
import { z } from "zod";
import { countries } from "./countries";

type State = {
	country: Country | Country[] | null;
	formType: FormType | FormType[] | null;

	softwareVersion?: string;
	computerSpecs: {
		os: string | null;
		cpu: string | null;
		gpu: string | null;
		gpuDriverVersion: string | null;
		ramVolume: number | null;
		storageVolume: number | null;
	};
	description: string | null;
};

const initialState = {
	country: null as Country | Country[] | null,
	formType: null as FormType | FormType[] | null,
	softwareVersion: "",
	computerSpecs: {
		os: "",
		cpu: "",
		gpu: "",
		gpuDriverVersion: "",
		ramVolume: null,
		storageVolume: null,
	},
	description: "",
};

type Action =
	| { type: "SET_COUNTRY"; payload: Country | Country[] | null }
	| { type: "SET_FORM_TYPE"; payload: FormType | FormType[] | null }
	| { type: "SET_SOFTWARE_VERSION"; payload: string }
	| { type: "SET_COMPUTER_SPECS_OS"; payload: string }
	| { type: "SET_COMPUTER_SPECS_CPU"; payload: string }
	| { type: "SET_COMPUTER_SPECS_GPU"; payload: string }
	| { type: "SET_COMPUTER_SPECS_GPU_DRIVER_VERSION"; payload: string }
	| { type: "SET_COMPUTER_SPECS_RAM_VOLUME"; payload: number }
	| { type: "SET_COMPUTER_SPECS_STORAGE_VOLUME"; payload: number };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_COUNTRY":
			return { ...state, country: action.payload };
		case "SET_FORM_TYPE":
			return { ...state, formType: action.payload };
		case "SET_SOFTWARE_VERSION":
			return { ...state, softwareVersion: action.payload };
		case "SET_COMPUTER_SPECS_OS":
			return {
				...state,
				computerSpecs: {
					...state.computerSpecs,
					os: action.payload,
				},
			};
		case "SET_COMPUTER_SPECS_CPU":
			return {
				...state,
				computerSpecs: {
					...state.computerSpecs,
					cpu: action.payload,
				},
			};
		case "SET_COMPUTER_SPECS_GPU":
			return {
				...state,
				computerSpecs: {
					...state.computerSpecs,
					gpu: action.payload,
				},
			};
		case "SET_COMPUTER_SPECS_GPU_DRIVER_VERSION":
			return {
				...state,
				computerSpecs: {
					...state.computerSpecs,
					gpuDriverVersion: action.payload,
				},
			};
		case "SET_COMPUTER_SPECS_RAM_VOLUME":
			return {
				...state,
				computerSpecs: {
					...state.computerSpecs,
					ramVolume: action.payload,
				},
			};
		case "SET_COMPUTER_SPECS_STORAGE_VOLUME":
			return {
				...state,
				computerSpecs: {
					...state.computerSpecs,
					storageVolume: action.payload,
				},
			};
		default:
			return state;
	}
};

export const Form = () => {
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
							<Dropdown<Country>
								kind="object"
								sortBy="code"
								label={{ primaryKey: "name" }}
								mode="search"
								options={countries}
								selected={state.country}
								setSelected={(value) =>
									dispatch({
										type: "SET_COUNTRY",
										payload: value as
											| Country
											| Country[]
											| null,
									})
								}
								placeholder="Please select your country or region"
							/>
						</div>
						{/* type */}
						<div className="space-y-1">
							<div>What is your issue about?</div>
							<Dropdown<FormType>
								kind="object"
								label={{ primaryKey: "value" }}
								mode="regular"
								options={formTypes}
								selected={state.formType}
								setSelected={(value) =>
									dispatch({
										type: "SET_FORM_TYPE",
										payload: value as
											| FormType
											| FormType[]
											| null,
									})
								}
								placeholder="Please select your feedback type (required)"
							/>
						</div>
						{(state.formType as FormType)?.key ===
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
						)}
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
