// Global variable section

var StringConstants = {
    Space: " ",
    Plus: "+",
    Slash: "/",
    Empty: ""
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
    element.setAttribute("hidden", null);
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}