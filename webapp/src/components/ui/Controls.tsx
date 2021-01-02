import React, { useState } from "react";

import "./Controls.scss";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Colors from "../../models/Colors";

import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import useStore from "../../store";

export interface DateRange {
	from: Date;
	to: Date;
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
			from: dateRange.startDate,
			to: dateRange.endDate,
		} as DateRange);
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
					<DateRangePicker
						onChange={(item: any) => setDateRange(item.selection)}
						showSelectionPreview={true}
						moveRangeOnFirstSelection={false}
						ranges={[dateRange]}
						rangeColors={[Colors.accent]}
						inputRanges={[]}
					/>
				</Form.Group>
			</Form>
		</div>
	);
};

export default Controls;
