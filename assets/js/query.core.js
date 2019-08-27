YT.query = {
    newSearch: function (e) {
        if (e.trim() == YT.live.channelID || e.trim() == "") {
            return;
        }
        YT.live.stop();
        $.getJSON("https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=" + encodeURIComponent(e) + "&key=" + YT.keyManager.getKey(), function (e) {
            if (e.pageInfo.totalResults < 1) {
                alert("No results found!");
                return;
            }
            var gsnippet = e.items[0];
            YT.updateManager.updateChannel(gsnippet.id, gsnippet.snippet.publishedAt);
            YT.live.start();

            YT.query.getCover(gsnippet.id);

            YT.updateManager.updateName(gsnippet.snippet.title);
            YT.updateManager.updateProfile(gsnippet.snippet.thumbnails.high.url ? gsnippet.snippet.thumbnails.high.url : gsnippet.snippet.thumbnails.default.url);
            var dt = new Date(gsnippet.snippet.publishedAt);
            YT.updateManager.updateDate(months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear());

            YT.updateManager.updateViews(parseInt(gsnippet.statistics.viewCount).toLocaleString("en"));
            YT.updateManager.updateSubscribers(parseInt(gsnippet.statistics.subscriberCount).toLocaleString("en"));
            YT.updateManager.updateVideos(parseInt(gsnippet.statistics.videoCount).toLocaleString("en"));

            YT.urls.pushState(gsnippet.id);
        });
    },
    getCover: function (e) {
        $.getJSON("https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=" + encodeURIComponent(e) + "&key=" + YT.keyManager.getKey(), function (e) {
            YT.updateManager.updateCover(e.items[0].brandingSettings.image.bannerImageUrl);
        });
    },
    search: function (e) {
        e.preventDefault();
        YT.query.newSearch($("#yt_searchvalue").val());
        $("#yt_searchvalue").val("");
    },
    bind: function () {
        $("#yt_search").on("submit", this.search);
        $("#yt_searchbutton").on("click", this.search);
    }
};