import { Locale } from "@/utils/types";
import { Check, Dash, Upgrade } from "./Icons";

const data: {
	locale: Locale;
	sections: {
		title: string;
		comparisons: {
			item: string;
			basic: JSX.Element;
			dental: JSX.Element;
		}[];
	}[];
}[] = [
	{
		locale: "en-US",
		sections: [
			{
				title: "Supported Formats",
				comparisons: [
					{
						item: "Import the .STL, .OBJ and .3MF files",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Import/Save the .CHITUBOX project file",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Save .CTB, .CBDDLP, .PWX, .PWMO, .PWMS, .PWMX, .PHOTONS, .PW0, .SVGX, .SLC, .ZIP, .FHD, .WOW, .FDG, .PHOTON, .PHZ, .CWS, .LGS files",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Export the .STL, .OBJ and .3MF files",
						basic: <Check />,
						dental: <Check />,
					},
				],
			},
			{
				title: "One-Click Magic",
				comparisons: [
					{
						item: "Complete the whole pre-process with one click, and be able to customize the procedures needed in this automated process by oneself",
						basic: <Dash />,
						dental: <Check />,
					},
				],
			},
			{
				title: "Edit/Layout",
				comparisons: [
					{
						item: "Move",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Scale/Mirror",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "Rotate",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "Copy",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Multi-selection tool",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Auto-orientation",
						basic: <Dash />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "Auto Orientation（models, implant guides, crowns and bridges, jaw pads, night guards and so on）",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Cut",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Rapid cutting",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Hollow",
						basic: <Check />,
						dental: <Upgrade c={2} />,
					},
					{
						item: "Filling scaffold structure",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Filling hive structure",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Filling grid structure",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Filling solid structure",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Fixed height filling",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Drain hole",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "Auto-drain hole",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Add tags",
						basic: <Dash />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "Add bracing",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Auto-layout",
						basic: <Check />,
						dental: <Upgrade c={2} />,
					},
				],
			},
			{
				title: "Repair",
				comparisons: [
					{
						item: "One-click basic repair",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "One-click advanced repair",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Orientation repair",
						basic: <Check />,
						dental: <Dash />,
					},
				],
			},
			{
				title: "Support Editing",
				comparisons: [
					{
						item: "Configure support parameters",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "Auto-support",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "Tree-like support (manual)",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "Connection support (manual)",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Two points connected support (manual)",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Small pillar support (manual)",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Branch support (manual)",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "More custom support setting profiles (>3)",
						basic: <Check />,
						dental: <Check />,
					},
				],
			},
			{
				title: "Analyze/Measure",
				comparisons: [
					{
						item: "Model error detection",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Collision detection",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Cavity detection",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Overhang detection",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Islands detection",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "Remove islands",
						basic: <Check />,
						dental: <Dash />,
					},
				],
			},
			{
				title: "Slicing",
				comparisons: [
					{
						item: "Basic print settings",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Tolerance compensation/Bottom tolerance compensation",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Single parameter slice",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Rest time waiting mode",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Lift settings (distance, speed)",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "Image grayscale",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Anti-aliasing",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Anti-aliasing gray range",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Parity difference",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Mask",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Scaling compensation",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Consistency slicing pixel",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Slicing speed",
						basic: <Upgrade c={1} />,
						dental: <Upgrade c={3} />,
					},
				],
			},
			{
				title: "UI and Interaction",
				comparisons: [
					{
						item: "View cube",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Print layer preview slider",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "Customize the file list size",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Animated tooltip",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "Smart shortcut pop-ups",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "Show name information for the menu bar buttons",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Quickly change the slice profile and printer on the main screen",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Real-time display of the model volume and material cost",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Showing holes position on platform(for perforated printer platform)",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Edit file names",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Profiles classified with resin materials",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Auto process settings",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "Auto process",
						basic: <Dash />,
						dental: <Check />,
					},
				],
			},
			{
				title: "Personalize",
				comparisons: [
					{
						item: "Customize support hidden angle",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "Show/Hide support auxiliary lines",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "Show/Hide support preview",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "Customize grid spacing and width",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "Multiple theme options",
						basic: <Check />,
						dental: <Check />,
					},
				],
			},
			{
				title: "Others",
				comparisons: [
					{
						item: "Technical support",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Software update",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Multiple languages",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "Plugins",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "Network sending",
						basic: <Check />,
						dental: <Check />,
					},
				],
			},
		],
	},
	{
		locale: "zh-CN",
		sections: [
			{
				title: "支持格式",
				comparisons: [
					{
						item: "加载STL、OBJ、3MF网格文件",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "加载/保存CHITUBOX项目文件",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "保存CTB、CBDDLP、PWX、PWMO、PWMS、PWMX、PHOTONS、PW0、SVGX、SLC、ZIP、FHD、WOW、FDG、PHOTON、PHZ、CWS、LGS等切片文件",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "导出STL、OBJ、3MF网格文件",
						basic: <Check />,
						dental: <Check />,
					},
				],
			},
			{
				title: "一键处理",
				comparisons: [
					{
						item: "一键自动完成所有预处理步骤，也可根据打印物品自定义处理步骤",
						basic: <Dash />,
						dental: <Check />,
					},
				],
			},
			{
				title: "编辑/排版",
				comparisons: [
					{
						item: "移动",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "缩放/镜像",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "旋转",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "复制",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "批量选择工具",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "自动定向",
						basic: <Dash />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "自动定向（牙模、种植导板、牙冠、颌垫、夜磨牙垫等）",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "切割",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "快捷切割",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "镂空",
						basic: <Check />,
						dental: <Upgrade c={2} />,
					},
					{
						item: "填充框架结构",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "填充蜂窝结构",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "填充网格结构",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "填充实体",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "固定高度填充",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "手动打孔",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "自动打孔",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "添加标签",
						basic: <Dash />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "添加加强结构",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "自动排版",
						basic: <Check />,
						dental: <Upgrade c={2} />,
					},
				],
			},
			{
				title: "修复",
				comparisons: [
					{
						item: "一键基本修复",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "一键高级修复",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "方向修复",
						basic: <Check />,
						dental: <Dash />,
					},
				],
			},
			{
				title: "支撑",
				comparisons: [
					{
						item: "配置支撑参数",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "自动支撑",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "树状支撑（手动）",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "直连支撑（手动）",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "两点相连支撑（手动）",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "小柱子支撑（手动）",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "分叉支撑（手动）",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "更多自定义支撑配置文件（＞3）",
						basic: <Check />,
						dental: <Check />,
					},
				],
			},
			{
				title: "分析/检测",
				comparisons: [
					{
						item: "检测模型缺陷",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "碰撞检测",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "空腔检测",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "悬空检测",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "检测孤岛",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "删除孤岛",
						basic: <Check />,
						dental: <Dash />,
					},
				],
			},
			{
				title: "切片",
				comparisons: [
					{
						item: "基础打印参数",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "公差补偿/底部公差补偿",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "单参数切片",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "静止时间等待模式",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "抬升参数设置（距离、速度）",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "图片灰度",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "抗锯齿",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "抗锯齿灰度范围",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "奇偶层差值",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "打印蒙版",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "缩放补偿",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "切片一致性优化",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "切片速度",
						basic: <Upgrade c={1} />,
						dental: <Upgrade c={3} />,
					},
				],
			},
			{
				title: "界面与交互",
				comparisons: [
					{
						item: "视窗方格",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "滑杆式打印层预览",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "自定义调整文件列表栏尺寸",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "动态Tooltip",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "快捷键交互",
						basic: <Check />,
						dental: <Upgrade c={1} />,
					},
					{
						item: "底部状态栏使用导航信息",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "主界面快速切换切片配置参数和打印机",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "实时显示模型体积以及打印材料成本",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "平台透明显示（显示打孔平台孔位）",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "编辑文件名称",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "配置按材料分类",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "配置自动化流程",
						basic: <Dash />,
						dental: <Check />,
					},
					{
						item: "自动化流程处理",
						basic: <Dash />,
						dental: <Check />,
					},
				],
			},
			{
				title: "个性化设置",
				comparisons: [
					{
						item: "自定义支撑隐藏角度",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "显示/隐藏支撑点标注线",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "显示/隐藏支撑预览",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "自定义网格宽度和间距",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "多主题可选",
						basic: <Check />,
						dental: <Check />,
					},
				],
			},
			{
				title: "其它",
				comparisons: [
					{
						item: "技术支持",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "版本升级",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "多种语言",
						basic: <Check />,
						dental: <Check />,
					},
					{
						item: "插件",
						basic: <Check />,
						dental: <Dash />,
					},
					{
						item: "网络发送",
						basic: <Check />,
						dental: <Check />,
					},
				],
			},
		],
	},
];

function EditionComparison(props: { locale: Locale }) {
	const { locale } = props;
	const localeData = data.find((item) => item.locale === locale);

	return (
		<div className="flex flex-col gap-8">
			{localeData?.sections.map((section) => {
				return (
					<table
						key={section.title}
						className="w-full
						text-center
						[&_>_thead_>_tr_>_th]:p-1.5
						[&_>_tbody_>_tr_>_td]:p-1.5
						rounded overflow-hidden"
					>
						<colgroup>
							<col />
							<col className="w-1/6" />
							<col className="w-1/6" />
						</colgroup>
						<thead className="text-neutral-100">
							<tr className="bg-neutral-500">
								<th>{section.title}</th>
								<th>Basic</th>
								<th>Dental</th>
							</tr>
						</thead>
						<tbody>
							{section.comparisons.map(
								(comparison, index: number) => {
									if (index % 2 === 0) {
										return (
											<tr
												key={comparison.item}
												className="bg-neutral-200/30"
											>
												<td>{comparison.item}</td>
												<td>{comparison.basic}</td>
												<td>{comparison.dental}</td>
											</tr>
										);
									} else {
										return (
											<tr
												key={comparison.item}
												className="bg-neutral-400/30"
											>
												<td>{comparison.item}</td>
												<td>{comparison.basic}</td>
												<td>{comparison.dental}</td>
											</tr>
										);
									}
								}
							)}
						</tbody>
					</table>
				);
			})}
		</div>
	);
}

export default EditionComparison;
