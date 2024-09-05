"use client";

import { DiscordIcon, FacebookIcon, InstagramIcon, TwitterXIcon } from "../icons/Sns";
import { useMediaQuery } from "react-responsive";
import { MediaQuery } from "@/utils/types";

const LowerSns = () => {
	const isLg = useMediaQuery({ query: MediaQuery.lg });

	if (isLg) {
		return (
			<div className="flex items-center gap-4">
				<a href="https://discord.com/invite/E45UFqGPZh">
					<DiscordIcon size={16} />
				</a>
				<a href="https://www.facebook.com/profile.php?id=61558975455282">
					<FacebookIcon size={16} />
				</a>
				<a href="https://www.instagram.com/chitubox_dental/">
					<InstagramIcon size={16} />
				</a>
				<a href="https://x.com/CHITUBOX_Dental">
					<TwitterXIcon size={16} />
				</a>
			</div>
		);
	} else {
		return null;
	}
};

export default LowerSns;
