import React, { useState } from "react";

import "./Controls.scss";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useStore from "../../store";

interface Props {
	startProcess: Function;
}

const Controls: React.FC<Props> = ({ startProcess }) => {
	//add datepicker with range

	const isFetching = useStore((state) => state.isFetching);

	const [text, setText] = useState<string>(
		localStorage.getItem("userName") !== null
			? String(localStorage.getItem("userName"))
			: ""
	);

	const onSubmit = (e: any) => {
		e.preventDefault();

		localStorage.setItem("userName", text);
		startProcess(text);
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
			</Form>
		</div>
	);
};

export default Controls;
