import { ZoomableImage } from "../zoomableImage/ZoomableImage";

export const BlogImageContainer = (props: any) => {
	const { src, alt, figcaption, style } = props;
	return (
		<div
			className={`flex flex-col items-center w-full my-4 gap-2
            drop-shadow`}
		>
			<ZoomableImage src={src} alt={alt ?? ""} width={style.width} />
			{figcaption && (
				<figcaption className="text-center text-sm text-gray-500">
					{figcaption}
				</figcaption>
			)}
		</div>
	);
};
