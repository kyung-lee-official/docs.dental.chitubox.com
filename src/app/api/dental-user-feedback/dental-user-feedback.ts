import { CreateChituboxDentalUserFeedbackDto } from "@/app/[locale]/software-feedback/form-options";
import axios from "axios";

export const dentalUserFeedback = async (
	data: CreateChituboxDentalUserFeedbackDto
): Promise<any> => {
	const res = await axios.post(
		"/chitubox-dental-user-feedback/create-chitubox-dental-user-feedback",
		data,
		{
			baseURL: process.env.NEXT_PUBLIC_API_HOST,
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return res.data;
};
