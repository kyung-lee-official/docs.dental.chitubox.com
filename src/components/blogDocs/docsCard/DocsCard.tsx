"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { ImageIcon } from "../../icons/Icons";

const Thumbnail = (props: any) => {
	const { ogImage } = props;

	const targetAspectRatio = useMemo(() => 16 / 9, []);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const imgRef = useRef<HTMLImageElement | null>(null);

	const [imageSrc, setImageSrc] = useState<string | null>(null);

	function resize() {
		/* Set container size */
		if (containerRef.current) {
			containerRef.current.style.height = `${
				containerRef.current.clientWidth / targetAspectRatio
			}px`;
		}
	}

	const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		/* Set img size */
		if (containerRef.current && imgRef.current) {
			const imgAspectRatio =
				imgRef.current.naturalWidth / imgRef.current.naturalHeight;

			if (imgAspectRatio > targetAspectRatio) {
				const scale =
					containerRef.current.clientHeight /
					imgRef.current.clientHeight;
				imgRef.current.style.scale = scale.toFixed(6);
				imgRef.current.style.transform = `translateY(${
					(containerRef.current.clientHeight -
						imgRef.current.clientHeight) /
					2 /
					scale
				}px)`;
			} else {
				imgRef.current.style.transform = `translateY(${
					-(
						imgRef.current.clientHeight -
						containerRef.current.clientHeight
					) / 2
				}px)`;
			}
		}
	};

	const fetchImage = useCallback(async () => {
		if (ogImage) {
			try {
				const res = await axios.get(ogImage, {
					responseType: "arraybuffer",
				});
				const imageUrl =
					`data:${res.headers["content-type"]};base64,` +
					Buffer.from(res.data, "binary").toString("base64");
				setImageSrc(imageUrl);
			} catch (error) {}
		}
	}, []);

	useEffect(() => {
		resize();
		window.addEventListener("resize", resize);
		return () => {
			window.removeEventListener("resize", resize);
		};
	}, []);

	useEffect(() => {
		fetchImage();
	}, []);

	return (
		<div ref={containerRef} className="overflow-hidden rounded">
			{imageSrc ? (
				<img ref={imgRef} src={imageSrc} alt="" onLoad={onImageLoad} />
			) : (
				<div
					className="flex justify-center items-center w-full h-full
					bg-gray-200/60"
				>
					<div
						className="flex justify-center items-center w-full h-full
						text-gray-300 animate-pulse"
					>
						<ImageIcon size={100} />
					</div>
				</div>
			)}
		</div>
	);
};

const DocsCard = (props: any) => {
	const { url, title, description, ogImage } = props;
	return (
		<a
			className="flex flex-col w-full min-w-[340px] h-64 p-2 gap-4
			bg-neutral-100 dark:bg-white/20
			overflow-hidden rounded-xl hover:shadow transition-all duration-200 cursor-pointer"
			href={url}
			title={title}
		>
			<Thumbnail ogImage={ogImage} />
			<div
				className="px-1
				font-semibold text-neutral-500 dark:text-neutral-50
				overflow-hidden whitespace-nowrap text-ellipsis"
			>
				{title}
			</div>
			{/* <div
				className="[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] 
				px-1
				text-sm text-gray-300
				overflow-hidden"
			>
				{description}
			</div> */}
		</a>
	);
};

export default DocsCard;
