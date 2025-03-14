import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "react-responsive";
import { MediaQuery } from "@/utils/types";
import { DynamicYear } from "../DynamicYear/DynamicYear";

function Copyright() {
	const t = useTranslations();

	const isXl = useMediaQuery({ query: MediaQuery.xl });

	if (isXl) {
		return (
			<>
				<span className="text-[#737373] h-fit">
					Copyright © <DynamicYear /> CHITUBOX.{" "}
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
					Copyright © <DynamicYear /> CHITUBOX.{" "}
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
