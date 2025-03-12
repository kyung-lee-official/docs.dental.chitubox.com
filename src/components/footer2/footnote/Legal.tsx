import Link from "next/link";

import { useTranslations } from "next-intl";
import { useMediaQuery } from "react-responsive";
import { MediaQuery } from "@/utils/types";

function Legal() {
	const t = useTranslations();

	const isXl = useMediaQuery({ query: MediaQuery.xl });

	const privacyAndSecurity = t("footer.legal.privacy-policy.title");
	const legalNotice = t("footer.legal.legal-notice.title");
	if (isXl) {
		return (
			<>
				<div
					className="flex items-end gap-16
						text-[#9E9E9E] text-[14px]"
				>
					<Link
						href="https://www.chitubox.com/en/article/law/privacy"
						className="hover:text-[#0284C7] text-nowrap"
					>
						{privacyAndSecurity}
					</Link>
					<Link
						href="https://www.chitubox.com/en/article/law/legal"
						className="hover:text-[#0284C7] text-nowrap"
					>
						{legalNotice}
					</Link>
				</div>
			</>
		);
	} else {
		return (
			<div className="flex-1 flex justify-between items-end flex-wrap">
				<div
					className="flex items-end gap-16
						text-[#9E9E9E] text-[14px]"
				>
					<Link
						href="https://www.chitubox.com/en/article/law/privacy"
						className="hover:text-[#0284C7] text-nowrap"
					>
						{privacyAndSecurity}
					</Link>
					<Link
						href="https://www.chitubox.com/en/article/law/legal"
						className="hover:text-[#0284C7] text-nowrap"
					>
						{legalNotice}
					</Link>
				</div>
			</div>
		);
	}
}

export default Legal;
