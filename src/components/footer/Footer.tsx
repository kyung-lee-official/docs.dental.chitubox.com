import { useTranslations } from "next-intl";
import { Year } from "./Year";
import Link from "next/link";
import { DynamicFooterTop } from "./footer-top/DynamicFooterTop";
import { DynamicFooterLogoLg } from "./footer-logo-lg/DynamicFooterLogoLg";
import { DynamicLowerSns } from "./lower-sns/DynamicLowerSns";

const FooterCol = (props: any) => {
	const { title, children } = props;
	return (
		<div className="flex flex-col min-w-32 gap-4">
			<div className="text-neutral-600 dark:text-neutral-100">
				{title}
			</div>
			<div className="flex flex-col gap-3">{children}</div>
		</div>
	);
};

const Flink = (props: any) => {
	const { href, children } = props;
	return (
		<Link
			href={href}
			className="hover:text-neutral-800 dark:hover:text-white duration-200"
		>
			{children}
		</Link>
	);
};

export const Footer = () => {
	const t = useTranslations();
	return (
		<footer
			className="w-full
			text-neutral-400
			dark:bg-black"
		>
			<hr className="dark:border-neutral-800" />
			<div
				className="flex flex-col items-center max-w-[1200px] py-[36px] px-4 mx-auto gap-12
				text-sm"
			>
				<DynamicFooterTop />
				<div
					className="lg:flex lg:justify-between
					grid [grid-template-columns:repeat(auto-fill,minmax(140px,1fr))]
					w-full gap-10"
				>
					<DynamicFooterLogoLg />
					<FooterCol title={t("footer.software.title")}>
						<Flink href={t("footer.software.chitubox-pro.link")}>
							{t("footer.software.chitubox-pro.title")}
						</Flink>
						<Flink href={t("footer.software.chitubox-basic.link")}>
							{t("footer.software.chitubox-basic.title")}
						</Flink>
						<Flink href={t("footer.software.chitubox-dental.link")}>
							{t("footer.software.chitubox-dental.title")}
						</Flink>
						<Flink
							href={t("footer.software.chitubox-manager.link")}
						>
							{t("footer.software.chitubox-manager.title")}
						</Flink>
					</FooterCol>
					<FooterCol title={t("footer.customer.title")}>
						<Flink href={t("footer.customer.refer-and-get.link")}>
							{t("footer.customer.refer-and-get.title")}
						</Flink>
						<Flink href={t("footer.customer.education-price.link")}>
							{t("footer.customer.education-price.title")}
						</Flink>
						<Flink
							href={t("footer.customer.affiliate-program.link")}
						>
							{t("footer.customer.affiliate-program.title")}
						</Flink>
					</FooterCol>
					<FooterCol title={t("footer.company.title")}>
						<Flink href={t("footer.company.about-us.link")}>
							{t("footer.company.about-us.title")}
						</Flink>
						<Flink href={t("footer.company.chitu-systems.link")}>
							{t("footer.company.chitu-systems.title")}
						</Flink>
						<Flink href={t("footer.company.contact.link")}>
							{t("footer.company.contact.title")}
						</Flink>
						<Flink href={t("footer.company.partners.link")}>
							{t("footer.company.partners.title")}
						</Flink>
						<Flink href={t("footer.company.cbd-tech.link")}>
							{t("footer.company.cbd-tech.title")}
						</Flink>
					</FooterCol>
					<FooterCol title={t("footer.legal.title")}>
						<Flink href={t("footer.legal.privacy-policy.link")}>
							{t("footer.legal.privacy-policy.title")}
						</Flink>
						<Flink href={t("footer.legal.legal-notice.link")}>
							{t("footer.legal.legal-notice.title")}
						</Flink>
					</FooterCol>
				</div>
				<div className="flex flex-col items-start w-full gap-4 text-neutral-600 dark:text-inherit">
					<div>
						&copy; <Year /> <span>{t("footer.companyName")}</span>
					</div>
					<DynamicLowerSns />
				</div>
			</div>
		</footer>
	);
};
