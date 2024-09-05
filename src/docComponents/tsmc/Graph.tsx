import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Theme, useThemeStore } from "@/stores/theme";
import { Stage } from "./Stages";

export const Graph = (props: any) => {
	const { stage, oBld1, oBld2, oLd1, oLd2, oBrd1, oBrd2, oRd1, oRd2 } = props;

	const { theme } = useThemeStore();
	const [isBottomLayers, setIsBottomLayers] = useState<boolean>(
		stage === Stage.Bl1 ||
			stage === Stage.Bl2 ||
			stage === Stage.Br1 ||
			stage === Stage.Br2
	);

	const arrowHeight = 28.9;

	const arrow12RangeTopY = 238.82 + arrowHeight;
	const arrow12RangeBottomY = 398.15 - arrowHeight;
	const arrow12Range = arrow12RangeBottomY - arrow12RangeTopY;

	const [arrow1TipY, setArrow1TipY] = useState<number>(
		arrow12RangeTopY +
			(1 -
				parseFloat(isBottomLayers ? oBld1 : oLd1) /
					(parseFloat(isBottomLayers ? oBld1 : oLd1) +
						parseFloat(isBottomLayers ? oBld2 : oLd2))) *
				arrow12Range
	);
	const [arrow1BottomY, setArrow1BottomY] = useState<number>(
		arrow12RangeTopY +
			(1 -
				parseFloat(isBottomLayers ? oBld1 : oLd1) /
					(parseFloat(isBottomLayers ? oBld1 : oLd1) +
						parseFloat(isBottomLayers ? oBld2 : oLd2))) *
				arrow12Range +
			arrowHeight
	);

	const arrow34RangeTopY = 238.82 + arrowHeight;
	const arrow34RangeBottomY = 398.15 - arrowHeight;
	const arrow34Range = arrow34RangeBottomY - arrow34RangeTopY;

	const [arrow3TipY, setArrow3TipY] = useState<number>(
		arrow34RangeTopY +
			(parseFloat(oBrd1) / (parseFloat(oBrd1) + parseFloat(oBrd2))) *
				arrow34Range
	);
	const [arrow3BottomY, setArrow3BottomY] = useState<number>(
		arrow34RangeTopY +
			(parseFloat(oBrd1) / (parseFloat(oBrd1) + parseFloat(oBrd2))) *
				arrow34Range -
			arrowHeight
	);

	useEffect(() => {
		if (
			stage === Stage.Bl1 ||
			stage === Stage.Bl2 ||
			stage === Stage.Br1 ||
			stage === Stage.Br2
		) {
			setIsBottomLayers(true);
		} else {
			setIsBottomLayers(false);
		}
	}, [stage]);

	useEffect(() => {
		setArrow1TipY(
			arrow12RangeTopY +
				(1 -
					parseFloat(isBottomLayers ? oBld1 : oLd1) /
						(parseFloat(isBottomLayers ? oBld1 : oLd1) +
							parseFloat(isBottomLayers ? oBld2 : oLd2))) *
					arrow12Range
		);
		setArrow1BottomY(
			arrow12RangeTopY +
				(1 -
					parseFloat(isBottomLayers ? oBld1 : oLd1) /
						(parseFloat(isBottomLayers ? oBld1 : oLd1) +
							parseFloat(isBottomLayers ? oBld2 : oLd2))) *
					arrow12Range +
				arrowHeight
		);
	}, [isBottomLayers, oBld1, oBld2, oLd1, oLd2]);

	useEffect(() => {
		setArrow3TipY(
			arrow34RangeTopY +
				(parseFloat(isBottomLayers ? oBrd1 : oRd1) /
					(parseFloat(isBottomLayers ? oBrd1 : oRd1) +
						parseFloat(isBottomLayers ? oBrd2 : oRd2))) *
					arrow34Range
		);
		setArrow3BottomY(
			arrow34RangeTopY +
				(parseFloat(isBottomLayers ? oBrd1 : oRd1) /
					(parseFloat(isBottomLayers ? oBrd1 : oRd1) +
						parseFloat(isBottomLayers ? oBrd2 : oRd2))) *
					arrow34Range -
				arrowHeight
		);
	}, [isBottomLayers, oBrd1, oBrd2, oRd1, oRd2]);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="281"
			height="403.12"
			viewBox="0 0 281 403.12"
		>
			{/* vat */}
			<polygon
				points="270.5 364.62 270.5 398.62 10.5 398.62 10.5 364.62 0.5 364.62 0.5 398.62 0.5 402.62 10.5 402.62 270.5 402.62 280.5 402.62 280.5 398.62 280.5 364.62 270.5 364.62"
				className="fill-gray-300 dark:fill-gray-700"
			/>
			{/* plate */}
			<rect
				x="0.5"
				y="94.5"
				width="280"
				height="36"
				className="fill-gray-300 dark:fill-gray-700"
			/>
			{/* holder */}
			<rect
				x="101.42"
				y="56.5"
				width="78.15"
				height="10"
				className="fill-gray-300 dark:fill-gray-700"
			/>
			<rect
				x="101.42"
				y="56.5"
				width="10"
				height="38"
				className="fill-gray-300 dark:fill-gray-700"
			/>
			<rect
				x="169.58"
				y="56.5"
				width="10"
				height="38"
				className="fill-gray-300 dark:fill-gray-700"
			/>
			<rect
				x="71.42"
				y="84.5"
				width="40"
				height="10"
				className="fill-gray-300 dark:fill-gray-700"
			/>
			<rect
				x="169.58"
				y="84.5"
				width="40"
				height="10"
				className="fill-gray-300 dark:fill-gray-700"
			/>
			<rect
				x="122.5"
				y="20.5"
				width="36"
				height="36"
				className="fill-gray-300 dark:fill-gray-700"
			/>
			<rect
				x="101.42"
				y="0.5"
				width="78.15"
				height="20"
				className="fill-gray-300 dark:fill-gray-700"
			/>
			{/* Bottom layers */}
			<motion.g
				initial={{
					fill: "rgba(107,114,128,0.2)",
				}}
				animate={{
					fill:
						stage === Stage.Bl1 ||
						stage === Stage.Bl2 ||
						stage === Stage.Br1 ||
						stage === Stage.Br2
							? "#0ea5e9"
							: "rgba(107,114,128,0.2)",
				}}
			>
				<rect x="60.5" y="132.31" width="160" height="4" />
				<rect x="60.5" y="138.11" width="160" height="4" />
				<rect x="60.5" y="143.92" width="160" height="4" />
			</motion.g>
			{/* Regular layers */}
			<motion.g
				initial={{
					fill: "rgba(107,114,128,0.2)",
				}}
				animate={{
					fill:
						stage === Stage.L1 ||
						stage === Stage.L2 ||
						stage === Stage.R1 ||
						stage === Stage.R2
							? "#0ea5e9"
							: "rgba(107,114,128,0.2)",
				}}
			>
				<rect x="65.5" y="149.72" width="150" height="4" />
				<rect x="70.5" y="155.53" width="140" height="4" />
				<rect x="75.5" y="161.34" width="130" height="4" />
				<rect x="80.5" y="167.14" width="120" height="4" />
				<rect x="80.5" y="172.95" width="120" height="4" />
				<rect x="80.5" y="178.75" width="120" height="4" />
				<rect x="80.5" y="184.56" width="120" height="4" />
				<rect x="80.5" y="190.37" width="120" height="4" />
				<rect x="80.5" y="196.17" width="120" height="4" />
				<rect x="80.5" y="201.98" width="120" height="4" />
				<rect x="80.5" y="207.79" width="120" height="4" />
				<rect x="80.5" y="213.59" width="120" height="4" />
				<rect x="80.5" y="219.4" width="120" height="4" />
				<rect x="80.5" y="225.2" width="120" height="4" />
				<rect x="80.5" y="231.01" width="120" height="4" />
				<rect x="80.5" y="236.82" width="120" height="4" />
				<rect x="80.5" y="242.62" width="120" height="4" />
			</motion.g>
			{/* Arrows */}
			{/* Arrow 1 */}
			<motion.polygon
				initial={{
					fill: theme === Theme.DARK ? "#374151" : "#d1d5db",
				}}
				animate={{
					fill:
						stage === Stage.Bl1 || stage === Stage.L1
							? "#f59e0b"
							: theme === Theme.DARK
							? "#374151"
							: "#d1d5db",
					points: `42.53 ${arrow1TipY} 20.5 ${arrow1BottomY} 32.53 ${arrow1BottomY} 32.53 398.15 52.53 398.15 52.53 ${arrow1BottomY} 64.56 ${arrow1BottomY} 42.53 ${arrow1TipY}`,
				}}
			/>
			{/* Arrow 2 */}
			<motion.polygon
				initial={{
					fill: theme === Theme.DARK ? "#374151" : "#d1d5db",
				}}
				animate={{
					fill:
						stage === Stage.Bl2 || stage === Stage.L2
							? "#10b981"
							: theme === Theme.DARK
							? "#374151"
							: "#d1d5db",
					points: `42.53 238.82 20.5 267.72 32.53 267.72 32.53 ${arrow1TipY} 52.53 ${arrow1TipY} 52.53 267.72 64.56 267.72 42.53 238.82`,
				}}
			/>
			{/* Arrow 3 */}
			<motion.polygon
				initial={{
					fill: theme === Theme.DARK ? "#374151" : "#d1d5db",
				}}
				animate={{
					fill:
						stage === Stage.Br1 || stage === Stage.R1
							? "#10b981"
							: theme === Theme.DARK
							? "#374151"
							: "#d1d5db",
					points: `238.47 ${arrow3TipY} 260.5 ${arrow3BottomY} 248.47 ${arrow3BottomY} 248.47 238.82 228.47 238.82 228.47 ${arrow3BottomY} 216.44 ${arrow3BottomY} 238.47 ${arrow3TipY}`,
				}}
			/>
			{/* Arrow 4 */}
			<motion.polygon
				initial={{
					fill: theme === Theme.DARK ? "#374151" : "#d1d5db",
				}}
				animate={{
					fill:
						stage === Stage.Br2 || stage === Stage.R2
							? "#f59e0b"
							: theme === Theme.DARK
							? "#374151"
							: "#d1d5db",
					points: `238.47 398.15 260.5 369.25 248.47 369.25 248.47 ${arrow3TipY} 228.47 ${arrow3TipY} 228.47 369.25 216.44 369.25 238.47 398.15`,
				}}
			/>
		</svg>
	);
};
