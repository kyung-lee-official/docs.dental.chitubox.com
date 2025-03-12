import React from "react";
import {
	FacebookIcon,
	DiscordIcon,
	YouTubeIcon,
	TwitterXIcon,
	InstagramIcon,
	GroupIcon,
} from "../icons/Sns";
import Link from "next/link";

import { useTranslations } from "next-intl";

const A = (props: any) => {
	const { href, children, title } = props;
	return (
		<Link
			href={href}
			title={title}
			className="w-[30px] h-[30px]
			text-white/80 hover:text-white duration-200"
		>
			{children}
		</Link>
	);
};

export const Sns = () => {
	const t = useTranslations();

	return (
		<div className="flex flex-col justify-start items-start gap-[14px] mb-[56px]">
			<div className="text-[#E2E2E2] text-[14px]">{t("footer.socialMedia")}</div>
			<div className="flex items-center gap-x-[20px]">
				<A href="https://www.facebook.com/chitubox/" title="Facebook">
					<FacebookIcon size={30} />
				</A>
				<A href="https://discord.gg/E45UFqGPZh" title="Discord">
					<DiscordIcon size={30} />
				</A>
				<A
					href="https://www.youtube.com/channel/UC6mxsxtv6XwDEAq5vzQOXEw"
					title="YouTube"
				>
					<YouTubeIcon size={30} />
				</A>
				<A href="https://twitter.com/chitubox" title="X">
					<TwitterXIcon size={30} />
				</A>
				<A
					href="https://www.instagram.com/chitubox_official/"
					title="Instagram"
				>
					<InstagramIcon size={30} />
				</A>
				<A
					href="https://www.facebook.com/groups/104983723495672/"
					title="Facebook Group"
				>
					<GroupIcon size={30} />
				</A>
			</div>
		</div>
	);
};
