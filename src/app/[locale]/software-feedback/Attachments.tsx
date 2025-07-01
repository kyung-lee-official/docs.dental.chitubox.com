import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { XCircleSolid } from "./Icons";

const forbiddenExt = [".exe", ".bat", ".cmd", ".sh", ".msi"];
function isExecutable(file: File) {
	return forbiddenExt.some((ext) => file.name.toLowerCase().endsWith(ext));
}
function isImage(file: File) {
	return file.type.startsWith("image/");
}
function isVideo(file: File) {
	return file.type.startsWith("video/");
}

interface AttachmentsProps {
	value: File[];
	onChange: (files: File[]) => void;
	error?: any;
}

export const Attachments = ({ value, onChange, error }: AttachmentsProps) => {
	const t = useTranslations("pages.software-feedback");
	const inputRef = useRef<HTMLInputElement>(null);
	const [preview, setPreview] = useState<{
		url: string;
		type: string;
	} | null>(null);

	const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = Array.from(e.target.files || []);
		const filtered = selected.filter((f) => !isExecutable(f));
		const newFiles = [...(value ?? []), ...filtered].slice(0, 5);
		onChange(newFiles);
		e.target.value = "";
	};

	const handleRemove = (idx: number) => {
		const newFiles = value.slice();
		newFiles.splice(idx, 1);
		onChange(newFiles);
	};

	const files = value ?? [];

	return (
		<div className="space-y-1">
			<div>{t("form-attachment-title")}</div>
			<div
				className="grid grid-cols-5 gap-2"
				style={{ maxWidth: 5 * 88 + 8 * 4 }}
			>
				{files.map((file, idx) => (
					<div
						key={idx}
						className="relative flex flex-col items-center justify-center w-20 h-20 bg-neutral-100 rounded-md overflow-hidden"
					>
						{isImage(file) ? (
							<img
								src={URL.createObjectURL(file)}
								alt={file.name}
								className="object-cover w-full h-full cursor-pointer"
								onClick={() =>
									setPreview({
										url: URL.createObjectURL(file),
										type: "image",
									})
								}
							/>
						) : isVideo(file) ? (
							<video
								src={URL.createObjectURL(file)}
								className="object-cover w-full h-full cursor-pointer"
								onClick={() =>
									setPreview({
										url: URL.createObjectURL(file),
										type: "video",
									})
								}
							/>
						) : (
							<div
								className="flex flex-col items-center justify-center w-full h-full cursor-default"
								title={file.name}
							>
								<span className="text-3xl">📄</span>
								<span className="text-xs text-center px-1 truncate w-full">
									{file.name}
								</span>
							</div>
						)}
						<button
							type="button"
							className="absolute top-1 right-1 p-0.5
							text-[#EF5454]
							rounded-full cursor-pointer duration-150 transition"
							onClick={() => handleRemove(idx)}
						>
							<XCircleSolid size={15} />
						</button>
					</div>
				))}
				{files.length < 5 && (
					<button
						type="button"
						className="flex items-center justify-center w-20 h-20
						bg-neutral-100 hover:bg-neutral-200 
						rounded-md border-2 border-dashed border-neutral-300
						transition-colors cursor-pointer"
						onClick={() => inputRef.current?.click()}
						tabIndex={0}
					>
						<span className="text-3xl text-neutral-400">+</span>
						<input
							ref={inputRef}
							type="file"
							style={{ display: "none" }}
							multiple
							onChange={handleAddFiles}
						/>
					</button>
				)}
			</div>
			{error && (
				<div className="pl-1.5 text-red-500 text-sm">
					{t("form-attachment-error")}
				</div>
			)}
			{preview && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
					onClick={() => setPreview(null)}
				>
					<div
						className="bg-white rounded-lg shadow-lg p-4 max-w-full max-h-full flex items-center justify-center"
						onClick={(e) => e.stopPropagation()}
					>
						{preview.type === "image" ? (
							<img
								src={preview.url}
								alt="Preview"
								className="max-w-[80vw] max-h-[80vh]"
							/>
						) : (
							<video
								src={preview.url}
								controls
								className="max-w-[80vw] max-h-[80vh]"
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
