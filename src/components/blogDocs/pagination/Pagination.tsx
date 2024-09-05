import { CaretLeftFillIcon, CaretRightFillIcon } from "../../icons/Icons";

const Pagination = (props: {
	pagedSearchResult: unknown[][];
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const { pagedSearchResult, currentPage, setCurrentPage } = props;

	return (
		<div className="flex justify-center items-center gap-6">
			<button
				className={`flex justify-center items-center w-8 h-8
				${currentPage <= 1 ? "text-gray-300/20" : "text-gray-300"}
				${currentPage > 1 && "bg-white/5 hover:bg-white/10"}
				rounded ${currentPage <= 1 && "cursor-not-allowed"} duration-100`}
				disabled={currentPage <= 1}
				onClick={() => {
					if (currentPage > 1) {
						setCurrentPage(currentPage - 1);
					}
				}}
			>
				<CaretLeftFillIcon size={20} />
			</button>
			{pagedSearchResult.map((page, i) => {
				return (
					<button
						key={i}
						className={`flex justify-center items-center w-8 h-8
						${currentPage === i + 1 ? "text-blue-50" : "text-gray-300"}
						${
							currentPage === i + 1
								? "bg-[#0C88E0] hover:bg-[#0079D1]"
								: "bg-white/5 hover:bg-white/10"
						}
						rounded duration-100`}
						onClick={() => {
							setCurrentPage(i + 1);
						}}
					>
						{i + 1}
					</button>
				);
			})}
			<button
				className={`flex justify-center items-center w-8 h-8
				${currentPage < pagedSearchResult.length ? "text-gray-300" : "text-gray-300/20"}
				${currentPage < pagedSearchResult.length && "bg-white/5 hover:bg-white/10"}
				rounded ${
					!(currentPage < pagedSearchResult.length) &&
					"cursor-not-allowed"
				} duration-100`}
				onClick={() => {
					if (currentPage < pagedSearchResult.length) {
						setCurrentPage(currentPage + 1);
					}
				}}
			>
				<CaretRightFillIcon size={20} />
			</button>
		</div>
	);
};

export default Pagination;
