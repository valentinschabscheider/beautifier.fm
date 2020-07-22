/* Last.fm API Credentials */
var lastfm = new LastFM({
    apiKey: 'd2d3e918d196fbaffb1757975d812815',
    apiSecret: 'abf446b4dbc03411ce029ff8401fd158',
    cache: null
});

function getRecentTracks(userName) {

    document.getElementById('scrobbleTable').getElementsByTagName('tbody')[0].textContent = "";

    lastfm.user.getRecentTracks({ user: userName, limit: 200 }, {
        success: function(data) {

            for (var key in data) {

                var obj = data[key].track;
                for (i = 0; i < obj.length; i++) {
                    addRow(obj[i]);
                }
            }

        },
        error: function(code, message) {
            alert("hoitas do hods wos: " + message);
        }
    });
}


function Init() {
    var userNameField = document.getElementById('usernameField');

    userNameField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            getRecentTracks(userNameField.value);
        }
    });
}




function addRow(obj) {
    try {
        var tbody = document.getElementById('scrobbleTable').getElementsByTagName('tbody')[0];
        //var filter = document.getElementById("filter").value.toLowerCase();

        var track = obj.name;
        var artist = obj.artist["#text"]
        var album = obj.album["#text"];
        var timestamp = obj.date["#text"]

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

        //if (filter == "" || filter == null) {
        tbody.appendChild(row);
        return;
        //}

        /*if (filterScrobble(artist, album, track)) {
            tbody.appendChild(row);
        }*/
    } catch (e) {

    }
}

/*function filterScrobble(artist, album, track) {
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
}*/