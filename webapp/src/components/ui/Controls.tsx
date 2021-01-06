import React, { useEffect, useState } from "react";

import "./Controls.scss";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Colors from "../../models/Colors";

import { createStaticRanges, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addYears, addMonths, addWeeks } from "date-fns";

import {
	usePersistantStore,
	useRuntimeStore,
	useScrobbleStore,
	resetScrobbleStore,
} from "../../stores";
import shallow from "zustand/shallow";

export class DateRange {
	from: Date | undefined;
	to: Date | undefined;

	constructor(from: Date | undefined, to: Date | undefined) {
		this.from = from;
		this.to = to;
	}

	isEqual(value: DateRange): Boolean {
		return this.from === value.from && this.to === value.to;
	}
}

interface CustomDateRangePickerProps {
	range: DateRange;
	setRange: Function;
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
	range,
	setRange,
}) => {
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
			onChange={(item: any) =>
				setRange(
					new DateRange(
						item.selection.startDate || undefined,
						item.selection.endDate || undefined
					)
				)
			}
			showSelectionPreview={true}
			moveRangeOnFirstSelection={false}
			ranges={[
				{
					startDate: range.from,
					endDate: range.to,
					key: "selection",
				},
			]}
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
	const [userNameInput, setUserNameInput] = useState<string>("");

	const [userName, setUserName] = usePersistantStore(
		(state) => [state.userName, state.setUserName],
		shallow
	);

	const [
		initialized,
		initialize,
		selectedDateRange,
		setSelectedDateRange,
	] = useRuntimeStore(
		(state) => [
			state.initialized,
			state.initialize,
			state.selectedDateRange,
			state.setSelectedDateRange,
		],
		shallow
	);

	const [isFetching, addFetchedDateRange] = useScrobbleStore(
		(state) => [state.isFetching, state.addFetchedDateRange],
		shallow
	);

	const onSubmit = () => {
		if (userNameInput !== userName) {
			//check if text is valid user
			if (true) {
				setUserName(userNameInput);

				if (initialized) resetScrobbleStore();
			} else {
				//show error message
				return;
			}
		}

		if (!initialized) initialize();

		addFetchedDateRange(selectedDateRange);

		startProcess(userNameInput, selectedDateRange);
	};

	useEffect(() => {
		if (userName !== undefined) setUserNameInput(userName);
	}, [userName]);

	return (
		<div id="controls">
			<Form>
				<Form.Group>
					<InputGroup>
						<Form.Control
							type="text"
							id="username"
							placeholder="last.fm User"
							autoFocus={!userName}
							value={userNameInput}
							onChange={(e) => setUserNameInput(e.target.value)}
						/>
						<InputGroup.Append>
							<Button
								id="go"
								variant="dark"
								onClick={() => onSubmit()}
								disabled={isFetching}
							>
								<FontAwesomeIcon icon={["fas", "search"]} />
							</Button>
						</InputGroup.Append>
					</InputGroup>
				</Form.Group>
				<Form.Group className="datePickerContainer">
					<CustomDateRangePicker
						range={selectedDateRange}
						setRange={setSelectedDateRange}
					/>
				</Form.Group>
			</Form>
		</div>
	);
};

export default Controls;
