import type { Metadata } from "next";
import "../globals.css";
import { notFound, useParams } from "next/navigation";
import {
	getMessages,
	getTranslations,
	setRequestLocale,
} from "next-intl/server";
import { UrlHashPilot } from "@/components/urlHashPilot/UrlHashPilot";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { locales, Locale } from "@/utils/types";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";

/* https://nextjs.org/docs/app/api-reference/functions/generate-static-params */
export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	return {
		metadataBase: new URL("https://docs.dental.chitubox.com"),
		icons: {
			icon: "/logo.png",
		},
		title: {
			template: "%s | " + t("title"),
			default: t("title"),
		},
		description: t("description"),
		openGraph: {
			title: {
				template: "%s | " + t("title"),
				default: t("title"),
			},
			description: t("description"),
		},
	};
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: Locale }>;
}) {
	/* Validate that the incoming `locale` parameter is valid */
	const { locale } = await params;
	if (!routing.locales.includes(locale)) {
		notFound();
	}

	/**
	 * Providing all messages to the client side is the easiest way to get started
	 */
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body className="font-[HarmonyOS_Sans_SC_Regular]">
				<UrlHashPilot />
				<div id="root-portal"></div>
				<NextIntlClientProvider messages={messages}>
					<Header />
					{children}
				</NextIntlClientProvider>
				<Footer />
			</body>
		</html>
	);
}
