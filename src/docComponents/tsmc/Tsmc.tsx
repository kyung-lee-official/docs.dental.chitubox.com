"use client";

import { useState } from "react";
import { Graph } from "./Graph";
import { Stage } from "./Stages";
import dynamic from "next/dynamic";

const DynamicTsmcParams = dynamic(() => import("./TsmcParams"), {
	ssr: false,
});

export const Tsmc = () => {
	const [activeStage, setActiveStage] = useState<Stage>();

	/**
	 * b: bottom
	 * l: lift
	 * d: distance
	 * s: speed
	 * o: original
	 * 1: 1st column
	 * 2: 2nd column
	 */
	const [bld1, setBld1] = useState("3.000");
	const [oBld1, setObld1] = useState("3.000");
	const [bld2, setBld2] = useState("4.000");
	const [oBld2, setObld2] = useState("4.000");
	const [ld1, setLd1] = useState("3.000");
	const [oLd1, setOld1] = useState("3.000");
	const [ld2, setLd2] = useState("4.000");
	const [oLd2, setOld2] = useState("4.000");
	const [brd1, setBrd1] = useState("5.500");
	const [oBrd1, setObrd1] = useState("5.500");
	const [brd2, setBrd2] = useState("1.500");
	const [oBrd2, setObrd2] = useState("1.500");
	const [rd1, setRd1] = useState("5.500");
	const [oRd1, setOrd1] = useState("5.500");
	const [rd2, setRd2] = useState("1.500");
	const [oRd2, setOrd2] = useState("1.500");
	const [bls1, setBls1] = useState("65.000");
	const [oBls1, setObls1] = useState("65.000");
	const [bls2, setBls2] = useState("180.000");
	const [oBls2, setObls2] = useState("180.000");
	const [ls1, setLs1] = useState("65.000");
	const [oLs1, setOls1] = useState("65.000");
	const [ls2, setLs2] = useState("180.000");
	const [oLs2, setOls2] = useState("180.000");
	const [brs1, setBrs1] = useState("180.000");
	const [oBrs1, setObrs1] = useState("180.000");
	const [brs2, setBrs2] = useState("65.000");
	const [oBrs2, setObrs2] = useState("65.000");
	const [rs1, setRs1] = useState("180.000");
	const [oRs1, setOrs1] = useState("180.000");
	const [rs2, setRs2] = useState("65.000");
	const [oRs2, setOrs2] = useState("65.000");

	return (
		<div
			className="flex flex-col gap-6 my-8 p-8
            bg-white dark:bg-gray-900 rounded-xl overflow-x-auto"
		>
			<DynamicTsmcParams
				setActiveStage={setActiveStage}
				bld1={bld1}
				setBld1={setBld1}
				oBld1={oBld1}
				setObld1={setObld1}
				bld2={bld2}
				setBld2={setBld2}
				oBld2={oBld2}
				setObld2={setObld2}
				ld1={ld1}
				setLd1={setLd1}
				oLd1={oLd1}
				setOld1={setOld1}
				ld2={ld2}
				setLd2={setLd2}
				oLd2={oLd2}
				setOld2={setOld2}
				brd1={brd1}
				setBrd1={setBrd1}
				oBrd1={oBrd1}
				setObrd1={setObrd1}
				brd2={brd2}
				setBrd2={setBrd2}
				oBrd2={oBrd2}
				setObrd2={setObrd2}
				rd1={rd1}
				setRd1={setRd1}
				oRd1={oRd1}
				setOrd1={setOrd1}
				rd2={rd2}
				setRd2={setRd2}
				oRd2={oRd2}
				setOrd2={setOrd2}
				bls1={bls1}
				setBls1={setBls1}
				oBls1={oBls1}
				setObls1={setObls1}
				bls2={bls2}
				setBls2={setBls2}
				oBls2={oBls2}
				setObls2={setObls2}
				ls1={ls1}
				setLs1={setLs1}
				oLs1={oLs1}
				setOls1={setOls1}
				ls2={ls2}
				setLs2={setLs2}
				oLs2={oLs2}
				setOls2={setOls2}
				brs1={brs1}
				setBrs1={setBrs1}
				oBrs1={oBrs1}
				setObrs1={setObrs1}
				brs2={brs2}
				setBrs2={setBrs2}
				oBrs2={oBrs2}
				setObrs2={setObrs2}
				rs1={rs1}
				setRs1={setRs1}
				oRs1={oRs1}
				setOrs1={setOrs1}
				rs2={rs2}
				setRs2={setRs2}
				oRs2={oRs2}
				setOrs2={setOrs2}
			/>
			<Graph
				stage={activeStage}
				oBld1={oBld1}
				oBld2={oBld2}
				oLd1={oLd1}
				oLd2={oLd2}
				oBrd1={oBrd1}
				oBrd2={oBrd2}
				oRd1={oRd1}
				oRd2={oRd2}
			/>
		</div>
	);
};
