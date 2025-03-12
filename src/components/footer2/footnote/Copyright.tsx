import Link from "next/link";
import Year from "../Year";

import { useTranslations } from "next-intl";
import { useMediaQuery } from "react-responsive";
import { MediaQuery } from "@/utils/types";

function Copyright() {
	const t = useTranslations();

	const isXl = useMediaQuery({ query: MediaQuery.xl });

	const privacyAndSecurity = t("footer.legal.privacy-policy.title");
	const legalNotice = t("footer.legal.legal-notice.title");
	if (isXl) {
		return (
			<>
				<span className="text-[#737373] h-fit">
					Copyright © <Year /> CHITUBOX.{" "}
					{t("footer.legal.rights.title")}
					<Link
						href="https://beian.miit.gov.cn/"
						target="_blank"
						className="hover:underline"
					>
						粤ICP备15098202号
					</Link>
				</span>
			</>
		);
	} else {
		return (
			<div className="flex flex-wrap">
				<span className="text-[#737373]">
					Copyright © <Year /> CHITUBOX.{" "}
					{t("footer.legal.rights.title")}
					<Link
						href="https://beian.miit.gov.cn/"
						target="_blank"
						className="hover:underline"
					>
						{" "}
						粤ICP备15098202号
					</Link>
				</span>
			</div>
		);
	}
}

export default Copyright;
