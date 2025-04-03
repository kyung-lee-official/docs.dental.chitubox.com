"use client";

import { useState } from "react";
import { ZoomableImage } from "../zoomableImage/ZoomableImage";

export const ImageComparison = ({
	img1Src,
	figcaption1,
	img2Src,
	figcaption2,
}: any) => {
	const [img1AspectRatio, setImg1AspectRatio] = useState<number | null>(null);

	return (
		<div className="w-full max-w-[1000px]">
			<div className="flex gap-4">
				{/* First Image */}
				<div className="flex-1 flex justify-center">
					<ZoomableImage
						src={img1Src}
						alt={figcaption1}
						className="m-auto rounded-lg"
						onAspectRatioChange={(ratio) => {
							setImg1AspectRatio(ratio);
						}}
					/>
				</div>

				{/* Second Image */}
				<div className="flex-1 flex justify-center">
					<ZoomableImage
						src={img2Src}
						alt={figcaption2}
						className="m-auto rounded-lg"
						style={
							img1AspectRatio
								? {
										aspectRatio: `${img1AspectRatio} / 1`, // Match the aspect ratio of the first image
								  }
								: undefined
						}
					/>
				</div>
			</div>

			{/* Captions */}
			<div className="flex gap-4 text-neutral-500 dark:text-neutral-400">
				<div className="flex-1 p-2 text-sm text-center">
					{figcaption1}
				</div>
				<div className="flex-1 p-2 text-sm text-center">
					{figcaption2}
				</div>
			</div>
		</div>
	);
};
