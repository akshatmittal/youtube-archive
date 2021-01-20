YT.urls = {
    onchange: function () {
        var q = location.hash.split("!/")[1];
        if (q) {
            YT.query.newSearch(location.hash.split("!/")[1]);
        } else {
            var coolGuys = ['UCtinbF-Q-fVthA0qrFQTgXQ'];
            YT.query.newSearch(coolGuys[Math.floor(Math.random() * coolGuys.length)]);
        }
    },
    pushState: function (e) {
        history.pushState(null, null, "#!/" + e);
        YT.query.newSearch(e);
    },
    getCurrent: function () {
        return baseURL + "#!/" + YT.live.channelID;
    }
};