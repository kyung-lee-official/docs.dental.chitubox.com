"use client";

import {
	useState,
	useEffect,
	useRef,
	Dispatch,
	SetStateAction,
	ReactNode,
} from "react";

export type DropdownOption = { id: string | number };

type DropdownProps = {
	mode?: "regular" | "search";
	placeholder?: string;
	options: DropdownOption[];
	selected: DropdownOption | DropdownOption[] | null;
	setSelected: Dispatch<
		SetStateAction<DropdownOption | DropdownOption[] | null>
	>;
	setHover?: Dispatch<
		SetStateAction<DropdownOption | DropdownOption[] | null>
	>;
	multiple?: boolean;
	getLabel: (option: DropdownOption) => string;
	getSearchString?: (option: DropdownOption) => string;
	renderOption: (
		option: DropdownOption,
		state: { selected: boolean | null; hovered: boolean }
	) => ReactNode;
	renderValue?: (option: DropdownOption) => ReactNode;
	/* other styles */
	controlClassName: string;
	selectedItemClassName?: (option: DropdownOption) => string;
	removeButtonClassName?: (option: DropdownOption) => string;
	placeholderClassName?: string;
	menuClassName?: string;
	searchInputClassName?: string;
	optionClassName?: (
		option: DropdownOption,
		state: { selected: boolean | null; hovered: boolean }
	) => string;
};

export const Dropdown = (props: DropdownProps) => {
	const {
		mode = "regular",
		placeholder = "Select an option",
		options,
		selected,
		setSelected,
		setHover,
		multiple = false,
		getLabel,
		getSearchString,
		renderOption,
		renderValue,
		controlClassName = "",
		selectedItemClassName = () => "",
		removeButtonClassName = () => "",
		placeholderClassName = "",
		menuClassName = "",
		searchInputClassName = "",
		optionClassName = () => "",
	} = props;

	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [hoveredId, setHoveredId] = useState<string | number | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSelect = (option: DropdownOption) => {
		if (multiple) {
			const currentSelected = Array.isArray(selected) ? selected : [];
			const index = currentSelected.findIndex(
				(item) => item.id === option.id
			);

			if (index > -1) {
				setSelected([
					...currentSelected.slice(0, index),
					...currentSelected.slice(index + 1),
				]);
			} else {
				setSelected([...currentSelected, option]);
			}
		} else {
			setSelected(option);
			setIsOpen(false);
		}
	};

	const handleRemove = (option: DropdownOption) => {
		if (multiple && Array.isArray(selected)) {
			setSelected(selected.filter((item) => item.id !== option.id));
		}
	};

	const filteredOptions = options.filter((option) => {
		if (mode !== "search" || !searchTerm) return true;
		const searchString = getSearchString
			? getSearchString(option)
			: getLabel(option);
		return searchString.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const isSelected = (option: DropdownOption) =>
		multiple && Array.isArray(selected)
			? selected.some((item) => item.id === option.id)
			: selected && (selected as DropdownOption).id === option.id;

	return (
		<div ref={dropdownRef} className="relative w-full">
			<div
				className={controlClassName}
				onClick={() => setIsOpen(!isOpen)}
			>
				{multiple && Array.isArray(selected) && selected.length > 0 ? (
					selected.map((item, i) => (
						<div key={i} className={selectedItemClassName(item)}>
							<span>
								{renderValue
									? renderValue(item)
									: getLabel(item)}
							</span>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleRemove(item);
								}}
								className={removeButtonClassName(item)}
							>
								×
							</button>
						</div>
					))
				) : !multiple && selected ? (
					<span
						className={selectedItemClassName(
							selected as DropdownOption
						)}
					>
						{renderValue
							? renderValue(selected as DropdownOption)
							: getLabel(selected as DropdownOption)}
					</span>
				) : (
					<span className={placeholderClassName}>{placeholder}</span>
				)}
			</div>

			{isOpen && (
				<div className={menuClassName}>
					{mode === "search" && (
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onClick={(e) => e.stopPropagation()}
							placeholder="Search..."
							className={searchInputClassName}
						/>
					)}
					<div className="max-h-60 overflow-y-auto">
						{filteredOptions.map((option) => {
							const selected = isSelected(option);
							const hovered = hoveredId === option.id;
							return (
								<div
									key={option.id}
									className={optionClassName(option, {
										selected,
										hovered,
									})}
									onClick={() => handleSelect(option)}
									onMouseEnter={() => {
										setHoveredId(option.id);
										setHover && setHover(option);
									}}
									onMouseLeave={() => {
										setHoveredId(null);
										setHover && setHover(null);
									}}
								>
									{renderOption(option, {
										selected,
										hovered,
									})}
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};
