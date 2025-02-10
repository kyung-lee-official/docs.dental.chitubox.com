import "../globals.css";
import { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { UrlHashPilot } from "@/components/urlHashPilot/UrlHashPilot";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import KatexHtmlSanitizer from "@/components/katexHtmlSanitizer/KatexHtmlSanitizer";
import { locales } from "@/utils/types";
import { DynamicDocsSidebar } from "@/components/docsSidebar/DynamicDocsSidebar";
import { DynamicVersionTag } from "@/components/versionTag/version-tag/DynamicVersionTag";
import { DynamicToc } from "@/components/toc/DynamicToc";

/* https://nextjs.org/docs/app/api-reference/functions/generate-static-params */
export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
	params: { locale },
}: any): Promise<Metadata> {
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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	setRequestLocale("en-US");

	const messages = useMessages();

	return (
		<html lang="en-US">
			<body className="font-[NotoSansCJKsc-Regular]">
				<KatexHtmlSanitizer />
				<UrlHashPilot />
				<NextIntlClientProvider locale={"en-US"} messages={messages}>
					<div id="root-portal"></div>
					<Header />
					<main
						className="flex min-h-svh
						text-neutral-900 dark:text-neutral-200
						dark:bg-black"
					>
						<DynamicDocsSidebar />
						<div className="flex flex-col w-full min-w-0 max-w-[900px] p-4 mx-auto">
							<DynamicVersionTag />
							{children}
						</div>
						<DynamicToc />
					</main>
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
