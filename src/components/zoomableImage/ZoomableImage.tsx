"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

const DynamicImage = dynamic(() => import("./DynamicImage"), { ssr: false });

type ImageProps = {
	src: string;
	alt: string;
	width?: number;
	className?: string;
	onAspectRatioChange?: (aspectRatio: number) => void;
	style?: React.CSSProperties;
};

export const ZoomableImage = (props: ImageProps) => {
	const { src, alt, width, className, onAspectRatioChange } = props;

	const imageRef = useRef<HTMLImageElement>(null);

	const [isZoomOut, setIsZoomOut] = useState(false);

	const handleImageLoad = () => {
		if (imageRef.current && onAspectRatioChange) {
			const aspectRatio =
				imageRef.current.naturalWidth / imageRef.current.naturalHeight;
			onAspectRatioChange(aspectRatio);
		}
	};

	return (
		<div>
			<button
				className="w-fit"
				onClick={() => {
					setIsZoomOut(true);
				}}
			>
				<DynamicImage
					ref={imageRef}
					src={src}
					width={width}
					alt={alt ?? ""}
					onLoad={handleImageLoad}
					style={props.style}
				/>
			</button>
			{isZoomOut &&
				createPortal(
					<div
						className="fixed top-0 right-0 bottom-0 left-0
						flex justify-center items-center
						bg-black/50
						z-10"
						onClick={() => {
							setIsZoomOut(false);
						}}
					>
						<div
							className="flex justify-center items-center w-fit max-w-[95%] h-[90svh]
							overflow-auto hide-scrollbar"
						>
							<img src={src} alt={alt} className={className} />
						</div>
					</div>,
					document.body
				)}
		</div>
	);
};
