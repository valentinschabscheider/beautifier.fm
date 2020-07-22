function Init() {
    var filter = document.getElementById('filter');

    filter.addEventListener("blur", function() {
        parseDataAndCreateRows();
    });

    filter.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            parseDataAndCreateRows();
        }
    });

    var csvFile = document.getElementById('csvFile');

    csvFile.addEventListener("change", function() {
        parseDataAndCreateRows();
    });
}

function parseDataAndCreateRows() {

    // clear table
    document.getElementById('scrobbleTable').getElementsByTagName('tbody')[0].textContent = "";

    var data = null;
    var file = csvFile.files[0];

    Papa.parse(file, {
        header: false,
        dynamicTyping: true,
        complete: function(results) {
            data = results;
            //console.log(data);

            for (var key in data) {

                var obj = data[key];
                for (i = 0; i < obj.length; i++) {
                    addRow(obj[i]);
                }
            }
        }
    });
}


function addRow(obj) {
    try {
        var tbody = document.getElementById('scrobbleTable').getElementsByTagName('tbody')[0];
        var filter = document.getElementById("filter").value.toLowerCase();

        var artist = obj[0] || "";
        var album = obj[1] || "";
        var track = obj[2] || "";
        var timestamp = obj[3] || "";

        var row = document.createElement("tr");
        row.setAttribute("onclick", "window.location='" + GetLastFmTrackURL(artist, album, track) + "'");

        var artistNode = document.createElement("td");
        artistNode.appendChild(document.createTextNode(artist));

        var albumNode = document.createElement("td");
        albumNode.appendChild(document.createTextNode(album));

        var trackNode = document.createElement("td");
        trackNode.appendChild(document.createTextNode(track));

        var timestampNode = document.createElement("td");
        timestampNode.appendChild(document.createTextNode(timestamp));

        row.appendChild(artistNode);
        row.appendChild(trackNode);
        row.appendChild(albumNode);
        row.appendChild(timestampNode);

        if (filter == "" || filter == null) {
            tbody.appendChild(row);
            return;
        }

        if (filterScrobble(artist, album, track)) {
            tbody.appendChild(row);
        }
    } catch (e) {

    }
}


function filterScrobble(artist, album, track) {
    try {
        var filter = document.getElementById("filter").value.toLowerCase();

        artist = artist.toLowerCase();
        album = album.toLowerCase();
        track = track.toLowerCase();

        if (artist.includes(filter) || album.includes(filter) || track.includes(filter)) {
            return true;
        }

        return false;

    } catch (e) {}
}