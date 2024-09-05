import { useTranslations } from "next-intl";
import { Input } from "./Input";
import { Stage } from "./Stages";

const Add = () => <div className="flex justify-center">+</div>;
const Unit = ({ children }: any) => (
	<div className="flex justify-start pl-4">{children}</div>
);

const TsmcParams = (props: any) => {
	const {
		setActiveStage,
		bld1,
		setBld1,
		oBld1,
		setObld1,
		bld2,
		setBld2,
		oBld2,
		setObld2,
		ld1,
		setLd1,
		oLd1,
		setOld1,
		ld2,
		setLd2,
		oLd2,
		setOld2,
		brd1,
		setBrd1,
		oBrd1,
		setObrd1,
		brd2,
		setBrd2,
		oBrd2,
		setObrd2,
		rd1,
		setRd1,
		oRd1,
		setOrd1,
		rd2,
		setRd2,
		oRd2,
		setOrd2,
		bls1,
		setBls1,
		oBls1,
		setObls1,
		bls2,
		setBls2,
		oBls2,
		setObls2,
		ls1,
		setLs1,
		oLs1,
		setOls1,
		ls2,
		setLs2,
		oLs2,
		setOls2,
		brs1,
		setBrs1,
		oBrs1,
		setObrs1,
		brs2,
		setBrs2,
		oBrs2,
		setObrs2,
		rs1,
		setRs1,
		oRs1,
		setOrs1,
		rs2,
		setRs2,
		oRs2,
		setOrs2,
	} = props;

	const t = useTranslations();

	return (
		<div
			className="flex flex-col gap-4
            text-gray-400 font-semibold"
		>
			<table className="w-[700px] [&_>_tbody_>_tr_>_td:first-child]:h-8">
				<tbody>
					<tr>
						<td className="w-[300px]">
							{t("docComponents.tsmc.bld")}
						</td>
						<td className="w-[96px]">
							<Input
								value={bld1}
								setValue={setBld1}
								ov={oBld1}
								setOv={setObld1}
								stage={Stage.Bl1}
								setActiveStage={setActiveStage}
								onBlur={(e: any) => {
									if (parseFloat(e.target.value) >= 0) {
										if (
											/* Is decrease */
											parseFloat(oBld1) -
												parseFloat(e.target.value) >
											0
										) {
											if (
												/* brd1 is large enough to decrease */
												parseFloat(oBld1) -
													parseFloat(
														e.target.value
													) <=
												parseFloat(brd1)
											) {
												setObld1(
													parseFloat(
														e.target.value
													).toFixed(3)
												);
												setBld1(
													parseFloat(
														e.target.value
													).toFixed(3)
												);
												setBrd1(
													(
														parseFloat(brd1) -
														(parseFloat(oBld1) -
															parseFloat(
																e.target.value
															))
													).toFixed(3)
												);
												setObrd1(
													(
														parseFloat(brd1) -
														(parseFloat(oBld1) -
															parseFloat(
																e.target.value
															))
													).toFixed(3)
												);
											} else {
												setBld1(
													parseFloat(oBld1).toFixed(3)
												);
											}
										} else {
											/* Is increase or not changed */
											setObld1(
												parseFloat(bld1).toFixed(3)
											);
											setBld1(
												parseFloat(bld1).toFixed(3)
											);
											setBrd1(
												(
													parseFloat(brd1) +
													(parseFloat(
														e.target.value
													) -
														parseFloat(oBld1))
												).toFixed(3)
											);
											setObrd1(
												(
													parseFloat(brd1) +
													(parseFloat(
														e.target.value
													) -
														parseFloat(oBld1))
												).toFixed(3)
											);
										}
									} else {
										setBld1(parseFloat(oBld1).toFixed(3));
									}
								}}
								onStepUp={() => {
									setActiveStage(Stage.Bl1);
									setObld1((parseFloat(bld1) + 1).toFixed(3));
									setBld1((parseFloat(bld1) + 1).toFixed(3));
									setObrd1((parseFloat(brd1) + 1).toFixed(3));
									setBrd1((parseFloat(brd1) + 1).toFixed(3));
								}}
								onStepDown={() => {
									setActiveStage(Stage.Bl1);
									if (parseFloat(bld1) - 1 >= 0) {
										if (
											/* brd1 is large enough to decrease */
											parseFloat(brd1) - 1 >=
											0
										) {
											setObld1(
												(parseFloat(bld1) - 1).toFixed(
													3
												)
											);
											setBld1(
												(parseFloat(bld1) - 1).toFixed(
													3
												)
											);
											setObrd1(
												(parseFloat(brd1) - 1).toFixed(
													3
												)
											);
											setBrd1(
												(parseFloat(brd1) - 1).toFixed(
													3
												)
											);
										}
									}
								}}
							/>
						</td>
						<td className="w-[32px]">
							<Add />
						</td>
						<td className="w-[96px]">
							<Input
								value={bld2}
								setValue={setBld2}
								ov={oBld2}
								setOv={setObld2}
								isFast={true}
								stage={Stage.Bl2}
								setActiveStage={setActiveStage}
								onBlur={(e: any) => {
									if (parseFloat(e.target.value) >= 0) {
										if (
											/* Is decrease */
											parseFloat(oBld2) -
												parseFloat(e.target.value) >
											0
										) {
											if (
												/* brd1 is large enough to decrease */
												parseFloat(oBld2) -
													parseFloat(
														e.target.value
													) <=
												parseFloat(brd1)
											) {
												setObld2(
													parseFloat(
														e.target.value
													).toFixed(3)
												);
												setBld2(
													parseFloat(
														e.target.value
													).toFixed(3)
												);
												setBrd1(
													(
														parseFloat(brd1) -
														(parseFloat(oBld2) -
															parseFloat(
																e.target.value
															))
													).toFixed(3)
												);
												setObrd1(
													(
														parseFloat(brd1) -
														(parseFloat(oBld2) -
															parseFloat(
																e.target.value
															))
													).toFixed(3)
												);
											} else {
												setBld2(
													parseFloat(oBld2).toFixed(3)
												);
											}
										} else {
											/* Is increase or not changed */
											setObld2(
												parseFloat(bld2).toFixed(3)
											);
											setBld2(
												parseFloat(bld2).toFixed(3)
											);
											setBrd1(
												(
													parseFloat(brd1) +
													(parseFloat(
														e.target.value
													) -
														parseFloat(oBld2))
												).toFixed(3)
											);
											setObrd1(
												(
													parseFloat(brd1) +
													(parseFloat(
														e.target.value
													) -
														parseFloat(oBld2))
												).toFixed(3)
											);
										}
									} else {
										setBld2(parseFloat(oBld2).toFixed(3));
									}
								}}
								onStepUp={() => {
									setActiveStage(Stage.Bl2);
									setObld2((parseFloat(bld2) + 1).toFixed(3));
									setBld2((parseFloat(bld2) + 1).toFixed(3));
									setObrd1((parseFloat(brd1) + 1).toFixed(3));
									setBrd1((parseFloat(brd1) + 1).toFixed(3));
								}}
								onStepDown={() => {
									setActiveStage(Stage.Bl2);
									if (parseFloat(bld2) - 1 >= 0) {
										if (
											/* brd1 is large enough to decrease */
											parseFloat(brd1) - 1 >=
											0
										) {
											setObld2(
												(parseFloat(bld2) - 1).toFixed(
													3
												)
											);
											setBld2(
												(parseFloat(bld2) - 1).toFixed(
													3
												)
											);
											setObrd1(
												(parseFloat(brd1) - 1).toFixed(
													3
												)
											);
											setBrd1(
												(parseFloat(brd1) - 1).toFixed(
													3
												)
											);
										}
									}
								}}
							/>
						</td>
						<td>
							<Unit>mm</Unit>
						</td>
					</tr>
					<tr>
						<td>{t("docComponents.tsmc.ld")}</td>
						<td>
							<Input
								value={ld1}
								setValue={setLd1}
								ov={oLd1}
								setOv={setOld1}
								stage={Stage.L1}
								setActiveStage={setActiveStage}
								onBlur={(e: any) => {
									if (parseFloat(e.target.value) >= 0) {
										if (
											/* Is decrease */
											parseFloat(oLd1) -
												parseFloat(e.target.value) >
											0
										) {
											if (
												/* rd1 is large enough to decrease */
												parseFloat(oLd1) -
													parseFloat(
														e.target.value
													) <=
												parseFloat(rd1)
											) {
												setOld1(
													parseFloat(
														e.target.value
													).toFixed(3)
												);
												setLd1(
													parseFloat(
														e.target.value
													).toFixed(3)
												);
												setRd1(
													(
														parseFloat(rd1) -
														(parseFloat(oLd1) -
															parseFloat(
																e.target.value
															))
													).toFixed(3)
												);
												setOrd1(
													(
														parseFloat(rd1) -
														(parseFloat(oLd1) -
															parseFloat(
																e.target.value
															))
													).toFixed(3)
												);
											} else {
												setLd1(
													parseFloat(oLd1).toFixed(3)
												);
											}
										} else {
											/* Is increase or not changed */
											setOld1(parseFloat(ld1).toFixed(3));
											setLd1(parseFloat(ld1).toFixed(3));
											setRd1(
												(
													parseFloat(rd1) +
													(parseFloat(
														e.target.value
													) -
														parseFloat(oLd1))
												).toFixed(3)
											);
											setOrd1(
												(
													parseFloat(rd1) +
													(parseFloat(
														e.target.value
													) -
														parseFloat(oLd1))
												).toFixed(3)
											);
										}
									} else {
										setLd1(parseFloat(oLd1).toFixed(3));
									}
								}}
								onStepUp={() => {
									setActiveStage(Stage.L1);
									setOld1((parseFloat(ld1) + 1).toFixed(3));
									setLd1((parseFloat(ld1) + 1).toFixed(3));
									setOrd1((parseFloat(rd1) + 1).toFixed(3));
									setRd1((parseFloat(rd1) + 1).toFixed(3));
								}}
								onStepDown={() => {
									setActiveStage(Stage.L1);
									if (parseFloat(ld1) - 1 >= 0) {
										if (
											/* rd1 is large enough to decrease */
											parseFloat(rd1) - 1 >=
											0
										) {
											setOld1(
												(parseFloat(ld1) - 1).toFixed(3)
											);
											setLd1(
												(parseFloat(ld1) - 1).toFixed(3)
											);
											setOrd1(
												(parseFloat(rd1) - 1).toFixed(3)
											);
											setRd1(
												(parseFloat(rd1) - 1).toFixed(3)
											);
										}
									}
								}}
							/>
						</td>
						<td>
							<Add />
						</td>
						<td>
							<Input
								value={ld2}
								setValue={setLd2}
								ov={oLd2}
								setOv={setOld2}
								isFast={true}
								stage={Stage.L2}
								setActiveStage={setActiveStage}
								onBlur={(e: any) => {
									if (parseFloat(e.target.value) >= 0) {
										if (
											/* Is decrease */
											parseFloat(oLd2) -
												parseFloat(e.target.value) >
											0
										) {
											if (
												/* rd1 is large enough to decrease */
												parseFloat(oLd2) -
													parseFloat(
														e.target.value
													) <=
												parseFloat(rd1)
											) {
												setOld2(
													parseFloat(
														e.target.value
													).toFixed(3)
												);
												setLd2(
													parseFloat(
														e.target.value
													).toFixed(3)
												);
												setRd1(
													(
														parseFloat(rd1) -
														(parseFloat(oLd2) -
															parseFloat(
																e.target.value
															))
													).toFixed(3)
												);
												setOrd1(
													(
														parseFloat(rd1) -
														(parseFloat(oLd2) -
															parseFloat(
																e.target.value
															))
													).toFixed(3)
												);
											} else {
												setLd2(
													parseFloat(oLd2).toFixed(3)
												);
											}
										} else {
											/* Is increase or not changed */
											setOld2(parseFloat(ld2).toFixed(3));
											setLd2(parseFloat(ld2).toFixed(3));
											setRd1(
												(
													parseFloat(rd1) +
													(parseFloat(
														e.target.value
													) -
														parseFloat(oLd2))
												).toFixed(3)
											);
											setOrd1(
												(
													parseFloat(rd1) +
													(parseFloat(
														e.target.value
													) -
														parseFloat(oLd2))
												).toFixed(3)
											);
										}
									} else {
										setLd2(parseFloat(oLd2).toFixed(3));
									}
								}}
								onStepUp={() => {
									setActiveStage(Stage.L2);
									setOld2((parseFloat(ld2) + 1).toFixed(3));
									setLd2((parseFloat(ld2) + 1).toFixed(3));
									setOrd1((parseFloat(rd1) + 1).toFixed(3));
									setRd1((parseFloat(rd1) + 1).toFixed(3));
								}}
								onStepDown={() => {
									setActiveStage(Stage.L2);
									if (parseFloat(ld2) - 1 >= 0) {
										if (
											/* rd1 is large enough to decrease */
											parseFloat(rd1) - 1 >=
											0
										) {
											setOld2(
												(parseFloat(ld2) - 1).toFixed(3)
											);
											setLd2(
												(parseFloat(ld2) - 1).toFixed(3)
											);
											setOrd1(
												(parseFloat(rd1) - 1).toFixed(3)
											);
											setRd1(
												(parseFloat(rd1) - 1).toFixed(3)
											);
										}
									}
								}}
							/>
						</td>
						<td>
							<Unit>mm</Unit>
						</td>
					</tr>
					<tr>
						<td>{t("docComponents.tsmc.brd")}</td>
						<td>
							<Input
								value={brd1}
								isFast={true}
								ov={oBrd1}
								setOv={setObrd1}
								stage={Stage.Br1}
								setActiveStage={setActiveStage}
								readOnly={true}
								className="text-center w-[80px] bg-gray-50 dark:bg-gray-800 rounded-sm outline-none custom-input"
							/>
						</td>
						<td>
							<Add />
						</td>
						<td>
							<Input
								value={brd2}
								setValue={setBrd2}
								ov={oBrd2}
								setOv={setObrd2}
								stage={Stage.Br2}
								setActiveStage={setActiveStage}
								onBlur={(e: any) => {
									if (parseFloat(e.target.value) >= 0) {
										if (
											/* Is decrease */
											parseFloat(oBrd2) -
												parseFloat(e.target.value) >
											0
										) {
											setObrd2(
												parseFloat(brd2).toFixed(3)
											);
											setBrd2(
												parseFloat(brd2).toFixed(3)
											);
											setObrd1(
												(
													parseFloat(bld1) +
													parseFloat(bld2) -
													parseFloat(brd2)
												).toFixed(3)
											);
											setBrd1(
												(
													parseFloat(bld1) +
													parseFloat(bld2) -
													parseFloat(brd2)
												).toFixed(3)
											);
										} else {
											/* Is increase or not changed */
											if (
												/* Does not exceed the sum of bld1 and bld2 */
												parseFloat(brd2) <=
												parseFloat(bld1) +
													parseFloat(bld2)
											) {
												setObrd2(
													parseFloat(brd2).toFixed(3)
												);
												setBrd2(
													parseFloat(brd2).toFixed(3)
												);
												setObrd1(
													(
														parseFloat(bld1) +
														parseFloat(bld2) -
														parseFloat(brd2)
													).toFixed(3)
												);
												setBrd1(
													(
														parseFloat(bld1) +
														parseFloat(bld2) -
														parseFloat(brd2)
													).toFixed(3)
												);
											} else {
												setBrd2(
													parseFloat(oBrd2).toFixed(3)
												);
											}
										}
									} else {
										setBrd2(parseFloat(oBrd2).toFixed(3));
									}
								}}
								onStepUp={() => {
									setActiveStage(Stage.Br2);
									if (
										/* Does not exceed the sum of bld1 and bld2 */
										parseFloat(bld1) +
											parseFloat(bld2) -
											(parseFloat(brd2) + 1) >=
										0
									) {
										setObrd2(
											(parseFloat(brd2) + 1).toFixed(3)
										);
										setBrd2(
											(parseFloat(brd2) + 1).toFixed(3)
										);
										setObrd1(
											(
												parseFloat(bld1) +
												parseFloat(bld2) -
												(parseFloat(brd2) + 1)
											).toFixed(3)
										);
										setBrd1(
											(
												parseFloat(bld1) +
												parseFloat(bld2) -
												(parseFloat(brd2) + 1)
											).toFixed(3)
										);
									}
								}}
								onStepDown={() => {
									setActiveStage(Stage.Br2);
									setObrd2((parseFloat(brd2) - 1).toFixed(3));
									setBrd2((parseFloat(brd2) - 1).toFixed(3));
									setObrd1(
										(
											parseFloat(bld1) +
											parseFloat(bld2) -
											(parseFloat(brd2) - 1)
										).toFixed(3)
									);
									setBrd1(
										(
											parseFloat(bld1) +
											parseFloat(bld2) -
											(parseFloat(brd2) - 1)
										).toFixed(3)
									);
								}}
							/>
						</td>
						<td>
							<Unit>mm</Unit>
						</td>
					</tr>
					<tr>
						<td>{t("docComponents.tsmc.rd")}</td>
						<td>
							<Input
								value={rd1}
								ov={oRd1}
								setOv={setOrd1}
								isFast={true}
								stage={Stage.R1}
								setActiveStage={setActiveStage}
								readOnly={true}
								className="text-center w-[80px] bg-gray-50 dark:bg-gray-800 rounded-sm outline-none custom-input"
							/>
						</td>
						<td>
							<Add />
						</td>
						<td>
							<Input
								value={rd2}
								setValue={setRd2}
								ov={oRd2}
								setOv={setOrd2}
								stage={Stage.R2}
								setActiveStage={setActiveStage}
								onBlur={(e: any) => {
									if (parseFloat(e.target.value) >= 0) {
										if (
											/* Is decrease */
											parseFloat(oRd2) -
												parseFloat(e.target.value) >
											0
										) {
											setOrd2(parseFloat(rd2).toFixed(3));
											setRd2(parseFloat(rd2).toFixed(3));
											setOrd1(
												(
													parseFloat(ld1) +
													parseFloat(ld2) -
													parseFloat(rd2)
												).toFixed(3)
											);
											setRd1(
												(
													parseFloat(ld1) +
													parseFloat(ld2) -
													parseFloat(rd2)
												).toFixed(3)
											);
										} else {
											/* Is increase or not changed */
											if (
												/* Does not exceed the sum of ld1 and ld2 */
												parseFloat(rd2) <=
												parseFloat(ld1) +
													parseFloat(ld2)
											) {
												setOrd2(
													parseFloat(rd2).toFixed(3)
												);
												setRd2(
													parseFloat(rd2).toFixed(3)
												);
												setOrd1(
													(
														parseFloat(ld1) +
														parseFloat(ld2) -
														parseFloat(rd2)
													).toFixed(3)
												);
												setRd1(
													(
														parseFloat(ld1) +
														parseFloat(ld2) -
														parseFloat(rd2)
													).toFixed(3)
												);
											} else {
												setRd2(
													parseFloat(oRd2).toFixed(3)
												);
											}
										}
									} else {
										setRd2(parseFloat(oRd2).toFixed(3));
									}
								}}
								onStepUp={() => {
									setActiveStage(Stage.R2);
									if (
										/* Does not exceed the sum of ld1 and ld2 */
										parseFloat(ld1) +
											parseFloat(ld2) -
											(parseFloat(rd2) + 1) >=
										0
									) {
										setOrd2(
											(parseFloat(rd2) + 1).toFixed(3)
										);
										setRd2(
											(parseFloat(rd2) + 1).toFixed(3)
										);
										setOrd1(
											(
												parseFloat(ld1) +
												parseFloat(ld2) -
												(parseFloat(rd2) + 1)
											).toFixed(3)
										);
										setRd1(
											(
												parseFloat(ld1) +
												parseFloat(ld2) -
												(parseFloat(rd2) + 1)
											).toFixed(3)
										);
									}
								}}
								onStepDown={() => {
									setActiveStage(Stage.R2);
									setOrd2((parseFloat(rd2) - 1).toFixed(3));
									setRd2((parseFloat(rd2) - 1).toFixed(3));
									setOrd1(
										(
											parseFloat(ld1) +
											parseFloat(ld2) -
											(parseFloat(rd2) - 1)
										).toFixed(3)
									);
									setRd1(
										(
											parseFloat(ld1) +
											parseFloat(ld2) -
											(parseFloat(rd2) - 1)
										).toFixed(3)
									);
								}}
							/>
						</td>
						<td>
							<Unit>mm</Unit>
						</td>
					</tr>
				</tbody>
			</table>
			<table className="w-[700px] [&_>_tbody_>_tr_>_td:first-child]:h-8">
				<tbody>
					<tr>
						<td className="w-[300px]">
							{t("docComponents.tsmc.bls")}
						</td>
						<td className="w-[96px]">
							<Input
								value={bls1}
								setValue={setBls1}
								ov={oBls1}
								setOv={setObls1}
								stage={Stage.Bl1}
								setActiveStage={setActiveStage}
							/>
						</td>
						<td className="w-[32px]">
							<Add />
						</td>
						<td className="w-[96px]">
							<Input
								value={bls2}
								setValue={setBls2}
								ov={oBls2}
								setOv={setObls2}
								isFast={true}
								stage={Stage.Bl2}
								setActiveStage={setActiveStage}
							/>
						</td>

						<td>
							<Unit>mm/mim</Unit>
						</td>
					</tr>
					<tr>
						<td>{t("docComponents.tsmc.ls")}</td>
						<td>
							<Input
								value={ls1}
								setValue={setLs1}
								ov={oLs1}
								setOv={setOls1}
								stage={Stage.L1}
								setActiveStage={setActiveStage}
							/>
						</td>
						<td>
							<Add />
						</td>
						<td>
							<Input
								value={ls2}
								setValue={setLs2}
								ov={oLs2}
								setOv={setOls2}
								isFast={true}
								stage={Stage.L2}
								setActiveStage={setActiveStage}
							/>
						</td>
						<td>
							<Unit>mm/mim</Unit>
						</td>
					</tr>
					<tr>
						<td>{t("docComponents.tsmc.bls")}</td>
						<td>
							<Input
								value={brs1}
								setValue={setBrs1}
								ov={oBrs1}
								setOv={setObrs1}
								isFast={true}
								stage={Stage.Br1}
								setActiveStage={setActiveStage}
							/>
						</td>
						<td>
							<Add />
						</td>
						<td>
							<Input
								value={brs2}
								setValue={setBrs2}
								ov={oBrs2}
								setOv={setObrs2}
								stage={Stage.Br2}
								setActiveStage={setActiveStage}
							/>
						</td>
						<td>
							<Unit>mm/mim</Unit>
						</td>
					</tr>
					<tr>
						<td>{t("docComponents.tsmc.rs")}</td>
						<td>
							<Input
								value={rs1}
								setValue={setRs1}
								ov={oRs1}
								setOv={setOrs1}
								isFast={true}
								stage={Stage.R1}
								setActiveStage={setActiveStage}
							/>
						</td>
						<td>
							<Add />
						</td>
						<td>
							<Input
								value={rs2}
								setValue={setRs2}
								ov={oRs2}
								setOv={setOrs2}
								stage={Stage.R2}
								setActiveStage={setActiveStage}
							/>
						</td>
						<td>
							<Unit>mm/mim</Unit>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default TsmcParams;
