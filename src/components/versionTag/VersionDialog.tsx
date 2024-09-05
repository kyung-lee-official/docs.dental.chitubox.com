import {
	Dispatch,
	ForwardedRef,
	forwardRef,
	MutableRefObject,
	SetStateAction,
	useEffect,
	useRef,
} from "react";
import { CloseIcon } from "../icons/Icons";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePageContext } from "@/utils/hooks";
import docsContext from "@/preload/docsContext.json";
import { DocsContext } from "@/utils/types";

const DialogContent = forwardRef(function DialogContent(
	props: {
		setShowDialog: Dispatch<SetStateAction<boolean>>;
	},
	ref: ForwardedRef<HTMLDialogElement | null>
) {
	const { setShowDialog } = props;
	const dialogRef = ref as MutableRefObject<HTMLDialogElement | null>;
	const dialogBgRef = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = (e: MouseEvent) => {
		if (
			!dialogBgRef.current?.contains(e.target as Node) &&
			dialogBgRef.current !== e.target
		) {
			if (dialogRef.current) {
				dialogRef.current.close();
				setShowDialog(false);
			}
		}
	};
	useEffect(() => {
		if (dialogRef.current) {
			dialogRef.current.addEventListener("click", handleClickOutside);
		}
		return () => {
			if (dialogRef.current) {
				dialogRef.current.removeEventListener(
					"click",
					handleClickOutside
				);
			}
		};
	}, []);

	const t = useTranslations();

	const pageCtx = usePageContext();
	if (!pageCtx) return null;
	const { locale, fieldId } = pageCtx;
	const localeCtx = (docsContext as DocsContext).find((localeCtx) => {
		return localeCtx.locale === locale;
	});
	if (!localeCtx) return null;
	const field = localeCtx.localizedFields.find((field) => {
		return field.fieldId === fieldId;
	});
	if (!field) return null;

	return (
		<div ref={dialogBgRef}>
			<div
				className="flex justify-between items-center py-1 px-4
				border-b-[1px] border-solid border-neutral-200 dark:border-neutral-700"
			>
				<div>{t("docContent.selectVersion")}</div>
				<div
					onClick={() => {
						if (dialogRef.current) {
							dialogRef.current.close();
							setShowDialog(false);
						}
					}}
				>
					<CloseIcon size={24} />
				</div>
			</div>
			<div className="h-56 p-4 overflow-y-auto">
				<div
					className="flex flex-col items-center px-3
					bg-neutral-100 dark:bg-neutral-700
					rounded-md"
				>
					{field.versions.map((versionedContext, i: any) => {
						if (i < field.versions.length - 1) {
							return (
								<Link
									href={versionedContext.category[0].url}
									key={i}
									className="w-full py-2
										border-b-[1px] border-solid border-neutral-200"
									onClick={() => {
										if (dialogRef.current) {
											dialogRef.current.close();
											setShowDialog(false);
										}
									}}
								>
									{versionedContext.versionCode}
								</Link>
							);
						} else {
							return (
								<Link
									href={versionedContext.category[0].url}
									key={i}
									className="w-full py-2"
									onClick={() => {
										if (dialogRef.current) {
											dialogRef.current.close();
											setShowDialog(false);
										}
									}}
								>
									{versionedContext.versionCode}
								</Link>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
});

export const VersionDialog = forwardRef(function VersionDialog(
	props: {
		showDialog: boolean;
		setShowDialog: Dispatch<SetStateAction<boolean>>;
	},
	ref: ForwardedRef<HTMLDialogElement | null>
) {
	const { showDialog, setShowDialog } = props;
	const dialogRef = ref;

	return (
		<dialog
			ref={dialogRef}
			className="w-96
			text-neutral-900 dark:text-neutral-200
			bg-white dark:bg-neutral-800
			rounded-md backdrop:bg-black/80 backdrop:[backdrop-filter:blur(2px)]"
		>
			{showDialog && (
				<DialogContent ref={dialogRef} setShowDialog={setShowDialog} />
			)}
		</dialog>
	);
});
