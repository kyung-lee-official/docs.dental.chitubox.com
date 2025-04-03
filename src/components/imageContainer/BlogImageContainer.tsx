import { ZoomableImage } from "../zoomableImage/ZoomableImage";

export const BlogImageContainer = (props: any) => {
	const { src, alt, figcaption, style } = props;
	return (
		<div className={`flex flex-col items-center w-full my-4 gap-2`}>
			<ZoomableImage src={src} alt={alt ?? ""} width={style.width} />
			{figcaption && (
				<figcaption className="text-center text-sm text-neutral-500 dark:text-neutral-400">
					{figcaption}
				</figcaption>
			)}
		</div>
	);
};
