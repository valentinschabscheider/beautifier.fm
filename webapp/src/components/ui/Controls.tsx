import React, { useState } from "react";

import "./Controls.scss";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Colors from "../../models/Colors";

import { createStaticRanges, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addYears, addMonths, addDays, addWeeks } from "date-fns";

import useStore from "../../store";

export interface DateRange {
	from: Date | undefined;
	to: Date | undefined;
}

interface CustomDateRangePickerProps {
	range: DateRange;
	setRange: Function;
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
	range,
	setRange,
}) => {
	const [dateRange, setDateRange] = useState({
		startDate: range.from,
		endDate: range.to,
		key: "selection",
	});

	const now: Date = new Date();

	const staticRanges = createStaticRanges([
		{
			label: "1 Week",
			range() {
				return {
					startDate: addWeeks(now, -1),
					endDate: now,
				};
			},
		} as any,
		{
			label: "1 Month",
			range() {
				return {
					startDate: addMonths(now, -1),
					endDate: now,
				};
			},
		} as any,
		{
			label: "1 Year",
			range() {
				return {
					startDate: addYears(now, -1),
					endDate: now,
				};
			},
		} as any,
		{
			label: "All",
			range() {
				return {
					startDate: null,
					endDate: null,
				};
			},
		} as any,
	]);

	return (
		<DateRangePicker
			onChange={(item: any) => {
				setDateRange(item.selection);
				setRange({
					from:
						item.selection.startDate !== null
							? item.selection.startDate
							: undefined,
					to:
						item.selection.endDate !== null
							? item.selection.endDate
							: undefined,
				});
			}}
			showSelectionPreview={true}
			moveRangeOnFirstSelection={false}
			ranges={[dateRange]}
			rangeColors={[Colors.accent]}
			inputRanges={[]}
			weekStartsOn={1}
			staticRanges={staticRanges}
			disabledDay={(date) => date > now}
		/>
	);
};
interface ControlsProps {
	startProcess: Function;
}

const Controls: React.FC<ControlsProps> = ({ startProcess }) => {
	const isFetching = useStore((state) => state.isFetching);

	const [text, setText] = useState<string>(
		localStorage.getItem("userName") !== null
			? String(localStorage.getItem("userName"))
			: ""
	);

	const [dateRange, setDateRange] = useState<DateRange>({
		from: addDays(new Date(), -7),
		to: new Date(),
	});

	const onSubmit = (e: any) => {
		e.preventDefault();

		localStorage.setItem("userName", text);
		startProcess(text, dateRange);
	};

	return (
		<div id="controls">
			<Form>
				<Form.Group>
					<InputGroup>
						<Form.Control
							type="text"
							id="username"
							placeholder="last.fm User"
							autoFocus
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
						<InputGroup.Append>
							<Button
								id="go"
								variant="dark"
								onClick={(e) => onSubmit(e)}
								disabled={isFetching}
							>
								<FontAwesomeIcon icon={["fas", "search"]} />
							</Button>
						</InputGroup.Append>
					</InputGroup>
				</Form.Group>
				<Form.Group className="datePickerContainer">
					<CustomDateRangePicker range={dateRange} setRange={setDateRange} />
				</Form.Group>
			</Form>
		</div>
	);
};

export default Controls;
