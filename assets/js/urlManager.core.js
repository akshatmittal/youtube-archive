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
        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = "ya-" + e;
                this.page.url = baseURL + "#!/" + e;
            }
        });
        YT.query.newSearch(e);
    },
    getCurrent: function () {
        return baseURL + "#!/" + YT.live.channelID;
    }
};