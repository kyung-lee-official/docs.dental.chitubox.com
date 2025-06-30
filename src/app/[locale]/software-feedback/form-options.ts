import { DropdownOption } from "@/components/universal-dropdown/dropdown/Dropdown";
import { z } from "zod";
import { countryCodes } from "./countries";
import { useTranslations } from "next-intl";

export const formTypes: DropdownOption[] = [
	{ id: "ORDER_AND_ACCOUNT_ISSUES" },
	{ id: "BUG_REPORTING" },
	{ id: "USAGE_HELP" },
	{ id: "SUGGESTIONS" },
	{ id: "OTHER_ISSUES" },
];

export const formTypesEnUS = [
	{ id: "ORDER_AND_ACCOUNT_ISSUES", value: "Order and Account Issues" },
	{ id: "BUG_REPORTING", value: "Software Bug" },
	{ id: "USAGE_HELP", value: "Software Help" },
	{ id: "SUGGESTIONS", value: "Suggestions" },
	{ id: "OTHER_ISSUES", value: "Other" },
];
export const formTypesZhCN = [
	{ id: "ORDER_AND_ACCOUNT_ISSUES", value: "订单和账户问题" },
	{ id: "BUG_REPORTING", value: "软件 Bug" },
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

const countryEnumSchema = z.enum(countryCodes);
const countryObjectSchema = z.object({ id: z.string(), value: z.string() });

const nameSchema = z.string().min(1).max(50);
const emailSchema = z.string().email();
const attachmentsSchema = z.array(z.string());
const attachmentsFileSchema = z.array(z.instanceof(File)).optional();

function makeOrderAndAccountIssuesSchemas() {
	return {
		dto: z.object({
			formType: z.literal("ORDER_AND_ACCOUNT_ISSUES"),
			orderId: z
				.string()
				.optional()
				.refine((val) => !val || /^\d{16}$/.test(val)),
			description: z.string(),
		}),
		form: z.object({
			formType: z.literal("ORDER_AND_ACCOUNT_ISSUES"),
			orderId: z
				.string()
				.optional()
				.refine((val) => !val || /^\d{16}$/.test(val)),
			description: z.string().min(3),
		}),
	};
}
const orderAndAccountIssuesSchemas = makeOrderAndAccountIssuesSchemas();

function makeBugReportingSchemas() {
	return {
		dto: z.object({
			formType: z.literal("BUG_REPORTING"),
			os: z.string().min(3),
			softwareVersion: z.string().min(3),
			cpu: z.string().min(2),
			gpu: z.string().min(3),
			gpuDriverVersion: z.string().min(3),
			ramVolume: z.number().min(1),
			storageVolume: z.number().min(1),
			description: z.string().min(3),
		}),
		form: z.object({
			formType: z.literal("BUG_REPORTING"),
			os: z.string().min(3),
			softwareVersion: z.string().min(3),
			cpu: z.string().min(2),
			gpu: z.string().min(3),
			gpuDriverVersion: z.string().min(3),
			ramVolume: z.number().min(1),
			storageVolume: z.number().min(1),
			description: z.string().min(3),
		}),
	};
}
const bugReportingSchemas = makeBugReportingSchemas();

function makeUsageHelpSchemas() {
	return {
		dto: z.object({
			formType: z.literal("USAGE_HELP"),
			softwareVersion: z.string().min(3),
			description: z.string().min(3),
		}),
		form: z.object({
			formType: z.literal("USAGE_HELP"),
			softwareVersion: z.string().min(3),
			description: z.string().min(3),
		}),
	};
}
const usageHelpSchemas = makeUsageHelpSchemas();

function makeSuggestionsSchemas() {
	return {
		dto: z.object({
			formType: z.literal("SUGGESTIONS"),
			description: z.string().min(3),
		}),
		form: z.object({
			formType: z.literal("SUGGESTIONS"),
			description: z.string().min(3),
		}),
	};
}
const suggestionsSchemas = makeSuggestionsSchemas();

function makeOtherSchemas() {
	return {
		dto: z.object({
			formType: z.literal("OTHER_ISSUES"),
			description: z.string().min(3),
		}),
		form: z.object({
			formType: z.literal("OTHER_ISSUES"),
			description: z.string().min(3),
		}),
	};
}
const otherSchemas = makeOtherSchemas();

export const dtoSchema = z.object({
	name: nameSchema,
	email: emailSchema,
	country: countryEnumSchema,
	attachments: attachmentsSchema,
	dedicatedFields: z.discriminatedUnion("formType", [
		orderAndAccountIssuesSchemas.dto,
		bugReportingSchemas.dto,
		usageHelpSchemas.dto,
		suggestionsSchemas.dto,
		otherSchemas.dto,
	]),
});
export type CreateChituboxDentalUserFeedbackDto = z.infer<typeof dtoSchema>;
export type FormTypeLiteral =
	CreateChituboxDentalUserFeedbackDto["dedicatedFields"]["formType"];

export const formSchema = z.object({
	name: nameSchema,
	email: emailSchema,
	country: countryObjectSchema,
	attachments: attachmentsFileSchema,
	dedicatedFields: z.discriminatedUnion("formType", [
		orderAndAccountIssuesSchemas.form,
		bugReportingSchemas.form,
		usageHelpSchemas.form,
		suggestionsSchemas.form,
		otherSchemas.form,
	]),
});
export type FormState = z.infer<typeof formSchema>;
