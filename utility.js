// Global variable section

var StringConstants = {
    Space: " ",
    Plus: "+",
    Slash: "/",
};

const baseUrl = "https://www.last.fm/music/";
const baseUrlUser = "https://www.last.fm/user/";


function GetLastFmTrackURL(artist, album, track) {
    return baseUrl +
        artist.replace(StringConstants.Space, StringConstants.Plus) + StringConstants.Slash +
        album.replace(StringConstants.Space, StringConstants.Plus) + StringConstants.Slash +
        track.replace(StringConstants.Space, StringConstants.Plus);
}


function GetLastFmTrackURLForUser(username, artist, album, track) {
    return baseUrlUser + username + "/library/music/" +
        artist.replace(StringConstants.Space, StringConstants.Plus) + StringConstants.Slash +
        album.replace(StringConstants.Space, StringConstants.Plus) + StringConstants.Slash +
        track.replace(StringConstants.Space, StringConstants.Plus);
}


function ShowElement(elementId) {
    var element = document.getElementById(elementId);
    element.removeAttribute("hidden");
}


function HideElement(elementId) {
    var element = document.getElementById(elementId);
    element.setAttribute("hidden", "");
}