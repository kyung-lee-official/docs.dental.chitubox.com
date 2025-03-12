import axios from "axios";

export const subscribeEdm = async (
	email: string,
	locale: "en" | "zh-Hans"
): Promise<any> => {

	const res = await axios.post(
		"https://cas.chitubox.com/marketing/subscribeInfo.do2",
		{
			customerEmail: email,
			customerLocale: locale,
			subscribeSource: "dental-footer",
			sourceType: "website-dental",
		}
	);

	return res.data;
};
