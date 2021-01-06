import React from "react";
import { useScrobbleStore } from "../../stores";
import { CSSTransition } from "react-transition-group";
import { duration as animationDuration } from "../../models/Animation";

import "./ProgressBar.scss";
import shallow from "zustand/shallow";

interface Props {
	value: number | null;
	text?: string | null;
	css?: object;
}

const ProgressBar: React.FC<Props> = ({ value, text, css }) => {
	return (
		<div className="progress-container" {...(css && { style: css })}>
			<div
				id="progress-bar"
				className="progress-bar"
				style={{ width: `${value}%` }}
			>
				<span style={{ visibility: text === null ? "hidden" : "visible" }}>
					{text || `${value}%`}
				</span>
			</div>
		</div>
	);
};

const FetchingProgressBar: React.FC = () => {
	const [isFetching, progress] = useScrobbleStore(
		(state) => [state.isFetching, state.progress],
		shallow
	);

	return (
		<CSSTransition
			in={isFetching}
			unmountOnExit
			timeout={animationDuration}
			classNames="progress-container"
		>
			<ProgressBar value={progress} />
		</CSSTransition>
	);
};

export default FetchingProgressBar;
