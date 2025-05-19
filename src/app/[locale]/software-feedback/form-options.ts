import { z } from "zod";

export type FormType = {
	key: string;
	value: string;
};

export const formTypes: FormType[] = [
	{ key: "ORDER_AND_ACCOUNT_ISSUES", value: "Order and Account Issues" },
	{ key: "BUG_REPORTING", value: "Bug Reporting" },
	{ key: "USAGE_HELP", value: "Usage Help" },
	{ key: "SUGGESTIONS", value: "Suggestions" },
	{ key: "OTHER", value: "Other" },
];

const formSchema = z.object({
	country: z.any().nullable(),
	formType: z.any().nullable(),
	softwareVersion: z.string().optional(),
	computerSpecs: z.object({
		os: z.string().nullable(),
		cpu: z.string().nullable(),
		gpu: z.string().nullable(),
		gpuDriverVersion: z.string().nullable(),
		ramVolume: z.number().nullable(),
		storageVolume: z.number().nullable(),
	}),
	description: z.string().nullable(),
});

const countrySchema = z.object({
	code: z.string(),
	name: z.string(),
	nameZhCn: z.string(),
});
export type Country = z.infer<typeof countrySchema>;
