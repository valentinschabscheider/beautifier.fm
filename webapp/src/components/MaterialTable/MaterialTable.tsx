import React, { useState } from "react";

import "./MaterialTable.scss";

import MaterialTable from 'material-table'
import { Paper } from '@material-ui/core';
import fetchScrobbles, { Scrobble } from "../lastfm";

interface Props {
  scrobbles: Array<Scrobble>;
  isLoading: boolean;
}

const MaterialTableOwn: React.FC<Props> = ({ scrobbles, isLoading }) => {
  return (
        <MaterialTable
          columns={[
            { title: '', field: 'image', cellStyle: { width: "2%" }, render: rowData => <img src={rowData.image}/>},
            { title: 'Artist', field: 'artist', cellStyle: { width: "20%" } },
            { title: 'Track', field: 'song', cellStyle: { width: "50%" } },
            { title: 'Album', field: 'album', cellStyle: { width: "28%" } },
            { title: 'Timestamp', field: 'timestamp', type: "datetime" }
          ]}
          data={scrobbles} title=""  isLoading={ isLoading } options={{pageSizeOptions: [5,10,20], pageSize: 10 }}
          components={{Container: props => <Paper {...props} elevation={0}/>}}
        />
  );
};

export default MaterialTableOwn;
