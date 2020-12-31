import React, { useState } from "react";

import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";
import fetchScrobbles, { Scrobble } from "../lastfm";

interface Props {
	scrobbles: Array<Scrobble>;
}

const MaterialTableOwn: React.FC<Props> = ({ scrobbles }) => {
	return (
		<MaterialTable
			columns={[
				{
					title: "",
					field: "image",
					cellStyle: { width: "2%" },
					render: (rowData) => <img src={rowData.image} />,
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
		/>
	);
};

export default MaterialTableOwn;
