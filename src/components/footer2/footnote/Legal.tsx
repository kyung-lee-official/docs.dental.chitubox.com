import Link from "next/link";
import Year from "../Year";

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
				<span className="text-white/60 h-fit">
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
				<div
					className="flex items-end gap-16
						text-white/80"
				>
					<Link
						href="https://www.chitubox.com/en/article/law/privacy"
						className="hover:text-white text-nowrap"
					>
						{privacyAndSecurity}
					</Link>
					<Link
						href="https://www.chitubox.com/en/article/law/legal"
						className="hover:text-white text-nowrap"
					>
						{legalNotice}
					</Link>
				</div>
			</>
		);
	} else {
		return (
			<div className="flex-1 flex justify-between items-end flex-wrap">
				<span className="text-white/60">
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
				<div
					className="flex items-end gap-16
						text-white/80"
				>
					<Link
						href="https://www.chitubox.com/en/article/law/privacy"
						className="hover:text-white text-nowrap"
					>
						{privacyAndSecurity}
					</Link>
					<Link
						href="https://www.chitubox.com/en/article/law/legal"
						className="hover:text-white text-nowrap"
					>
						{legalNotice}
					</Link>
				</div>
			</div>
		);
	}
}

export default Legal;
