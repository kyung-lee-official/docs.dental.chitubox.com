import { MediaQuery } from "@/utils/types";
import { useMediaQuery } from "react-responsive";
import FooterLogo from "../FooterLogo";

const FooterLogoLg = ({ size, fill }: any) => {
	const isLg = useMediaQuery({ query: MediaQuery.lg });

	if (isLg) {
		return (
			<div className="flex items-center h-8 gap-4">
				<FooterLogo />
				<div className="text-neutral-800 dark:text-white text-nowrap">CHITUBOX Dental</div>
			</div>
		);
	} else {
		return null;
	}
};

export default FooterLogoLg;
