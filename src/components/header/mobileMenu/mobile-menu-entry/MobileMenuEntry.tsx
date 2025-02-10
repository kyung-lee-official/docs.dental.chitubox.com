"use client";

import { useState } from "react";
import { CloseOutlineIcon, MenuIcon } from "../../../icons/Icons";
import { useMediaQuery } from "react-responsive";
import { MediaQuery } from "@/utils/types";
import MobileMenuModal from "../MobileMenuModal";

export const MobileMenuEntry = () => {
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const isLg = useMediaQuery({ query: MediaQuery.lg });

	if (isLg) {
		return null;
	} else {
		return (
			<div className="flex justify-center items-center">
				<button
					onClick={() => {
						setShowMenu(!showMenu);
					}}
				>
					{showMenu ? (
						<CloseOutlineIcon size={36} />
					) : (
						<MenuIcon size={36} />
					)}
				</button>
				<MobileMenuModal
					showMenu={showMenu}
					setShowMenu={setShowMenu}
				/>
			</div>
		);
	}
};

export default MobileMenuEntry;
