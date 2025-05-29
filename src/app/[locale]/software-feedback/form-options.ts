import { DropdownOption } from "@/components/universal-dropdown/dropdown/Dropdown";
import { z } from "zod";
import { countryCodes } from "./countries";

export const formTypes: DropdownOption[] = [
	{ id: "ORDER_AND_ACCOUNT_ISSUES" },
	{ id: "BUG_REPORTING" },
	{ id: "USAGE_HELP" },
	{ id: "SUGGESTIONS" },
	{ id: "OTHER_ISSUES" },
];

export const formTypesEnUS = [
	{ id: "ORDER_AND_ACCOUNT_ISSUES", value: "Order and Account Issues" },
	{ id: "BUG_REPORTING", value: "Bug Reporting" },
	{ id: "USAGE_HELP", value: "Usage Help" },
	{ id: "SUGGESTIONS", value: "Suggestions" },
	{ id: "OTHER_ISSUES", value: "Other" },
];
export const formTypesZhCN = [
	{ id: "ORDER_AND_ACCOUNT_ISSUES", value: "订单和账户问题" },
	{ id: "BUG_REPORTING", value: "错误报告" },
	{ id: "USAGE_HELP", value: "使用帮助" },
	{ id: "SUGGESTIONS", value: "建议" },
	{ id: "OTHER_ISSUES", value: "其他" },
];

export const formTypeSchema = z.union([
	z.literal("ORDER_AND_ACCOUNT_ISSUES"),
	z.literal("BUG_REPORTING"),
	z.literal("USAGE_HELP"),
	z.literal("SUGGESTIONS"),
	z.literal("OTHER_ISSUES"),
]);
export type FormType = z.infer<typeof formTypeSchema>;

const countrySchema = z.object({
	code: z.string(),
	name: z.string(),
	nameZhCn: z.string(),
});
export type Country = z.infer<typeof countrySchema>;

const commonFields = {
	name: z.string().min(1).max(50),
	email: z.string().email(),
	country: z.enum(countryCodes),
	attachments: z.array(z.string()),
};

export const orderAndAccountIssuesSchema = z.object({
	formType: z.literal("ORDER_AND_ACCOUNT_ISSUES"),
	orderId: z.string().min(1),
	description: z.string(),
});

export const bugReportingSchema = z.object({
	formType: z.literal("BUG_REPORTING"),
	os: z.string(),
	softwareVersion: z.string(),
	cpu: z.string(),
	gpu: z.string(),
	gpuDriverVersion: z.string(),
	ramVolume: z.number(),
	storageVolume: z.number(),
	description: z.string(),
});

export const usageHelpSchema = z.object({
	formType: z.literal("USAGE_HELP"),
	softwareVersion: z.string(),
	description: z.string(),
});

export const suggestionsSchema = z.object({
	formType: z.literal("SUGGESTIONS"),
	description: z.string(),
});

export const otherSchema = z.object({
	formType: z.literal("OTHER_ISSUES"),
	description: z.string(),
});

export const dtoSchema = z.object({
	...commonFields,
	dedicatedFields: z.discriminatedUnion("formType", [
		orderAndAccountIssuesSchema,
		bugReportingSchema,
		usageHelpSchema,
		suggestionsSchema,
		otherSchema,
	]),
});
export type CreateChituboxDentalUserFeedbackDto = z.infer<typeof dtoSchema>;
export type FormTypeLiteral =
	CreateChituboxDentalUserFeedbackDto["dedicatedFields"]["formType"];

const commonFieldsForm = {
	name: z.string().min(1).max(50),
	email: z.string().email(),
	country: z.object({ id: z.string(), value: z.string() }),
	attachments: z.array(z.string()),
};

export const orderAndAccountIssuesSchemaLoose = z.object({
	formType: z.object({
		id: z.literal("ORDER_AND_ACCOUNT_ISSUES"),
	}),
	orderId: z.string().min(1),
	description: z.string().min(3),
});

export const bugReportingSchemaLoose = z.object({
	formType: z.object({
		id: z.literal("BUG_REPORTING"),
	}),
	os: z.string().min(3),
	softwareVersion: z.string().min(3),
	cpu: z.string().min(2),
	gpu: z.string().min(3),
	gpuDriverVersion: z.string().min(3),
	ramVolume: z.number().min(1),
	storageVolume: z.number().min(1),
	description: z.string().min(3),
});

export const usageHelpSchemaLoose = z.object({
	formType: z.object({
		id: z.literal("USAGE_HELP"),
	}),
	softwareVersion: z.string().min(3),
	description: z.string().min(3),
});

export const suggestionsSchemaLoose = z.object({
	formType: z.object({
		id: z.literal("SUGGESTIONS"),
	}),
	description: z.string().min(3),
});

export const otherSchemaLoose = z.object({
	formType: z.object({
		id: z.literal("OTHER_ISSUES"),
	}),
	description: z.string().min(3),
});

export const formSchema = z.object({
	...commonFieldsForm,
	dedicatedFields: z.union([
		orderAndAccountIssuesSchemaLoose,
		bugReportingSchemaLoose,
		usageHelpSchemaLoose,
		suggestionsSchemaLoose,
		otherSchemaLoose,
	]),
});
export type FormState = z.infer<typeof formSchema>;
