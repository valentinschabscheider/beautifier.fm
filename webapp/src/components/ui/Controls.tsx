import React, { useState } from "react";

import "./Controls.scss";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Colors from "../../models/Colors";

import { createStaticRanges, DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import useStore from "../../store";

export interface DateRange {
	from: Date | undefined;
	to: Date | undefined;
}

interface ControlsProps {
	startProcess: Function;
}

const Controls: React.FC<ControlsProps> = ({ startProcess }) => {
	//add datepicker with range

	const isFetching = useStore((state) => state.isFetching);

	const [text, setText] = useState<string>(
		localStorage.getItem("userName") !== null
			? String(localStorage.getItem("userName"))
			: ""
	);

	const [dateRange, setDateRange] = useState({
		startDate: new Date(),
		endDate: addDays(new Date(), -7),
		key: "selection",
	});

	const onSubmit = (e: any) => {
		e.preventDefault();

		localStorage.setItem("userName", text);
		startProcess(text, {
			from: dateRange.startDate !== null ? dateRange.startDate : undefined,
			to:
				dateRange.endDate !== null ? addDays(dateRange.endDate, 1) : undefined,
		} as DateRange);
	};

	const now: Date = new Date();

	const staticRanges = createStaticRanges([
		{
			label: "1 Year",
			range() {
				return {
					startDate: new Date(
						now.getFullYear() - 1,
						now.getMonth(),
						now.getDay()
					),
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
					<DateRangePicker
						onChange={(item: any) => setDateRange(item.selection)}
						showSelectionPreview={true}
						moveRangeOnFirstSelection={false}
						ranges={[dateRange]}
						rangeColors={[Colors.accent]}
						inputRanges={[]}
						weekStartsOn={1}
						staticRanges={staticRanges}
						disabledDay={(date) => date > now}
					/>
				</Form.Group>
			</Form>
		</div>
	);
};

export default Controls;
