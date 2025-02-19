import { ZoomableImage } from "../zoomableImage/ZoomableImage";

export const ImageComparison = ({
	img1Src,
	figcaption1,
	img2Src,
	figcaption2,
}: any) => {
	return (
		<div className="w-full max-w-[1000px]">
			<div className="flex gap-4">
				<div className="flex-1 flex justify-center">
					<ZoomableImage
						src={img1Src}
						alt={figcaption1}
						className="m-auto rounded-lg"
					/>
				</div>
				<div className="flex-1 flex justify-center">
					<ZoomableImage
						src={img2Src}
						alt={figcaption2}
						className="m-auto rounded-lg"
					/>
				</div>
			</div>
			<div className="flex gap-4 text-gray-500 dark:text-gray-400">
				<div className="flex-1 p-2 text-center border-t-[1px] border-t-gray-500/30">
					{figcaption1}
				</div>
				<div className="flex-1 p-2 text-center border-t-[1px] border-t-gray-500/30">
					{figcaption2}
				</div>
			</div>
		</div>
	);
};
