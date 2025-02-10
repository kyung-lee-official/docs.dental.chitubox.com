"use client";

import { useTranslations } from "next-intl";
import { MediaQuery } from "@/utils/types";
import { useMediaQuery } from "react-responsive";
import { useRef, useState } from "react";
import { VersionDialog } from "../VersionDialog";
import { usePageContext } from "@/utils/hooks";

const VersionTag = () => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [showVersionDialog, setShowVersionDialog] = useState<boolean>(false);

	const t = useTranslations();
	const isLg = useMediaQuery({ query: MediaQuery.lg });

	const pageCtx = usePageContext();
	if (!pageCtx) return null;
	const { isVersioned, versionCode } = pageCtx;
	if (!isVersioned) return null;

	if (isLg) {
		return (
			<div
				className="flex justify-center items-center max-w-max h-8 px-4 mb-8
				text-sm
				border-[1px] border-neutral-200 dark:border-neutral-800
				rounded-full select-none"
			>
				{t("docContent.version")}: {versionCode}
			</div>
		);
	} else {
		return (
			<div>
				<button
					className="flex justify-center items-center max-w-max h-8 px-4 mb-8
					text-sm
					border-[1px] border-neutral-200 dark:border-neutral-800
					rounded-full select-none"
					onClick={() => {
						if (dialogRef.current) {
							dialogRef.current.showModal();
							setShowVersionDialog(true);
						}
					}}
				>
					{t("docContent.version")}: {versionCode}
				</button>
				<VersionDialog
					ref={dialogRef}
					showDialog={showVersionDialog}
					setShowDialog={setShowVersionDialog}
				/>
			</div>
		);
	}
};

export default VersionTag;
