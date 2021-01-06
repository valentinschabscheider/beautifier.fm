import React from "react";

import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";

import { useScrobbleStore } from "../../stores";
import shallow from "zustand/shallow";

const ScrobbleTable: React.FC = () => {
	const [isLoading, scrobbles] = useScrobbleStore(
		(state) => [state.isFetching, state.scrobbles],
		shallow
	);

	return (
		<MaterialTable
			columns={[
				{
					title: "",
					field: "image",
					cellStyle: { width: "2%" },
					render: (rowData) => <img src={rowData.image} alt="" />,
				},
				{ title: "Artist", field: "artist", cellStyle: { width: "20%" } },
				{ title: "Track", field: "song", cellStyle: { width: "50%" } },
				{ title: "Album", field: "album", cellStyle: { width: "28%" } },
				{ title: "Timestamp", field: "timestamp", type: "datetime" },
			]}
			data={scrobbles}
			title=""
			options={{
				pageSizeOptions: [10, 20, 50],
				pageSize: 10,
				headerStyle: { minHeight: "44px", zIndex: 0 },
				searchFieldAlignment: "left",
			}}
			components={{ Container: (props) => <Paper {...props} elevation={0} /> }}
			isLoading={isLoading && scrobbles.length === 0}
		/>
	);
};

export default ScrobbleTable;
