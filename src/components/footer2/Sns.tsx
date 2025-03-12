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

import Data from "./website-en.json";

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


	if (Data) {
		return (
			<div className="flex flex-col justify-start items-start h-[130px] gap-[15px]">
				<div>{Data?.layout.newFooter.socialMedia}</div>
				<div className="grid grid-cols-3 items-center w-[172px] gap-y-[33px] gap-x-[41px]">
					<A
						href="https://www.facebook.com/chitubox/"
						title="Facebook"
					>
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
	} else {
		return null;
	}
};
