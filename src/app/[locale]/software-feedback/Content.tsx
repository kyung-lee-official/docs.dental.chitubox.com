"use client";

import { Link } from "@/navigation";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { Form } from "./Form";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/utils/tanstack-query";
import { DiscordIcon, FacebookIcon } from "@/components/icons/Sns";
import { useTranslations } from "next-intl";

const DynamicHero = dynamic(() => import("./DynamicHero"), {
	ssr: false,
});

const DocNavItem = (props: { children: ReactNode; href: string }) => {
	const { children, href } = props;
	return (
		<Link
			href={href}
			target="_blank"
			className="flex items-center p-2.5 gap-2.5
			text-base
			hover:bg-[#E5E7EB]
			rounded duration-150"
		>
			<div
				className="w-1 h-6
				bg-[#2B7FFF] rounded-full"
			></div>
			{children}
		</Link>
	);
};

export const Content = () => {
	const t = useTranslations("pages.software-feedback");

	return (
		<QueryClientProvider client={queryClient}>
			<div className="w-full">
				<DynamicHero />
				<div
					className="flex justify-center p-10 lg:p-20
					bg-[#F1F5F9]"
				>
					<div
						className="grid grid-cols-1 justify-items-stretch gap-8
						lg:flex lg:min-w-0 lg:max-w-[1240px] lg:gap-8"
					>
						<div className="flex-none lg:w-[324px] space-y-9">
							<div
								className="w-full p-10 space-y-8
								bg-white
								rounded-[16px]"
							>
								<h2 className="text-[22px] font-bold">
									{t("documentation-guide")}
								</h2>
								<div className="flex flex-col gap-4">
									<DocNavItem href="/tutorials">
										{t("tutorials")}
									</DocNavItem>
									<DocNavItem href="/user-manual/latest/introduction">
										{t("user-manual")}
									</DocNavItem>
								</div>
							</div>
							<div
								className="w-full p-12 space-y-8
								bg-white
								rounded-[16px]"
							>
								<div className="space-y-4">
									<h2 className="text-[22px] font-bold">
										{t("community-groups")}
									</h2>
									<div className="flex flex-col gap-2.5">
										<Link
											href={
												"https://www.facebook.com/chitubox"
											}
											target="_blank"
											className="flex items-center h-11 gap-2.5
											text-blue-500"
										>
											<FacebookIcon size={24} /> Facebook
										</Link>
										<Link
											href={
												"https://discord.gg/E45UFqGPZh"
											}
											target="_blank"
											className="flex items-center h-11 gap-2.5
											text-blue-500"
										>
											<DiscordIcon size={24} /> Discord
										</Link>
									</div>
								</div>
								<div className="space-y-4">
									<h2 className="text-[22px] font-bold">
										{t("support-email")}
									</h2>
									<div
										className="flex flex-col gap-2.5
										text-blue-500"
									>
										<Link
											href={
												"mailto://support@dental.chitubox.com"
											}
										>
											support@dental.chitubox.com
										</Link>
									</div>
								</div>
							</div>
						</div>
						<Form />
					</div>
				</div>
			</div>
		</QueryClientProvider>
	);
};
