import {
	animate,
	motion,
	useMotionTemplate,
	useMotionValue,
} from "framer-motion";
import { MouseEventHandler } from "react";

const CaretUpFill = ({ size, fill }: any) => {
	return (
		<svg
			viewBox="0 0 16 16"
			height="12"
			width="12"
			focusable="false"
			role="img"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"></path>
		</svg>
	);
};

const CaretDownFill = ({ size, fill }: any) => {
	return (
		<svg
			viewBox="0 0 16 16"
			height="12"
			width="12"
			focusable="false"
			role="img"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"></path>
		</svg>
	);
};

export const Input = (props: any) => {
	const {
		className,
		value,
		setValue,
		isFast,
		stage,
		setActiveStage,
		readOnly,
		onBlur,
		onStepUp,
		onStepDown,
		ov /* Original value */,
		setOv,
		...rest
	} = props;
	const x = useMotionValue(0);
	const boxShadow = useMotionTemplate`0px 0px 10px rgba(${
		isFast ? "0" : "200"
	},200,0,${x})`;

	const originalOnBlur = (e: any) => {
		if (parseFloat(e.target.value) >= 0) {
			setOv(parseFloat(e.target.value).toFixed(3));
			setValue(parseFloat(e.target.value).toFixed(3));
		} else {
			setValue(ov);
		}
	};
	let conditionalOnBlur: Function = () => {};
	if (!readOnly) {
		if (onBlur) {
			conditionalOnBlur = onBlur;
		} else {
			conditionalOnBlur = originalOnBlur;
		}
	}

	const originalOnStepUp = () => {
		setActiveStage(stage);
		setOv((parseFloat(value) + 1).toFixed(3));
		setValue((parseFloat(value) + 1).toFixed(3));
	};
	let conditionalOnStepUp: MouseEventHandler<HTMLDivElement> = () => {};
	if (!readOnly) {
		if (onStepUp) {
			conditionalOnStepUp = onStepUp;
		} else {
			conditionalOnStepUp = originalOnStepUp;
		}
	}

	const originalOnStepDown = () => {
		setActiveStage(stage);
		if (parseFloat(value) - 1 >= 0) {
			setOv((parseFloat(value) - 1).toFixed(3));
			setValue((parseFloat(value) - 1).toFixed(3));
		}
	};
	let conditionalOnStepDown: MouseEventHandler<HTMLDivElement> = () => {};
	if (!readOnly) {
		if (onStepDown) {
			conditionalOnStepDown = onStepDown;
		} else {
			conditionalOnStepDown = originalOnStepDown;
		}
	}

	return (
		<motion.div
			className={`flex gap-[1px]`}
			style={{
				boxShadow: boxShadow,
			}}
		>
			<input
				type="number"
				step={"1"}
				value={value}
				{...rest}
				className={
					className
						? className
						: "text-center w-[80px] bg-gray-100 dark:bg-gray-700 rounded-sm outline-none custom-input"
				}
				readOnly={readOnly}
				onChange={
					readOnly ? () => null : (e) => setValue(e.target.value)
				}
				onFocus={() => {
					setActiveStage(stage);
					x.set(1);
					animate(x, 0, { duration: 1.2 });
				}}
				onBlur={conditionalOnBlur}
			/>
			<div
				className="flex flex-col justify-center items-end gap-[2px]
                pointer-events-none"
			>
				<div
					className={`hover:text-gray-300 ${
						readOnly
							? "bg-gray-50 dark:bg-gray-800"
							: "bg-gray-100 dark:bg-gray-700"
					}
                    rounded-sm ${
						readOnly ? "cursor-not-allowed" : "cursor-pointer"
					} pointer-events-auto`}
					onClick={conditionalOnStepUp}
				>
					<CaretUpFill />
				</div>
				<div
					className={`hover:text-gray-300 ${
						readOnly
							? "bg-gray-50 dark:bg-gray-800"
							: "bg-gray-100 dark:bg-gray-700"
					}
                    rounded-sm ${
						readOnly ? "cursor-not-allowed" : "cursor-pointer"
					} pointer-events-auto`}
					onClick={conditionalOnStepDown}
				>
					<CaretDownFill />
				</div>
			</div>
		</motion.div>
	);
};
