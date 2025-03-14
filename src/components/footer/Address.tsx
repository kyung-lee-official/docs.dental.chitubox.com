import { useTranslations } from "next-intl";
import { processHref } from "@/utils/data";

import Link from "next/link";
import { ReactNode } from "react";

const A = (props: { href: string; children: ReactNode }) => {
	const { href, children } = props;
	return (
		<Link href={processHref(href)}>
			<div className="text-sm text-neutral-500 hover:text-white text-nowrap">
				{children}
			</div>
		</Link>
	);
};

const Col = (props: any) => {
	const { title, children } = props;
	return (
		<div className="flex flex-col w-fit gap-6">
			<div className="text-white font-bold">{title}</div>
			<div className="flex flex-col gap-4">{children}</div>
		</div>
	);
};

function Address() {
	const t = useTranslations();

	return (
		<div className="flex flex-col gap-[28px] text-[#9E9E9E] text-[14px]">
			<div>
				{t("footer.address.phoneTitle")}
				{t("footer.address.phoneNumber")}
			</div>
			<div>
				{t("footer.address.email")}
				{t("footer.address.emailNumber")}
			</div>
			<div>
				<div>{t("footer.address.row1")}</div>
				<div>{t("footer.address.row2")}</div>
				<div>{t("footer.address.row3")}</div>
				<div>{t("footer.address.row4")}</div>
			</div>
		</div>
	);
}

export default Address;
