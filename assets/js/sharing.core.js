YT.sharing = {
    youtube: function () {
        window.open("https://www.youtube.com/channel/" + YT.live.channelID);
    },
    twitter: function () {
        window.open("https://twitter.com/intent/tweet?original_referer=" + YT.sharing.getEncodedURL() + "&ref_src=twsrc%5Etfw&text=" + YT.sharing.getText() + "&tw_p=tweetbutton&via=iakshatmittal&url=" + YT.sharing.getEncodedURL());
    },
    search: function () {
        $(".super-search,.dark-bg").fadeIn();
        $("#yt_searchvalue_m").focus();
    },
    getText: function () {
        return encodeURIComponent("Check out " + $("#yt_name").text() + "'s YouTube Calendar on @YouTube! #YouTubeArchive");
    },
    getEncodedURL: function () {
        return encodeURIComponent(YT.urls.getCurrent());
    },
    bind: function () {
        $("#yt_shareyt").on("click", this.youtube);
        $("#yt_sharetw").on("click", this.twitter);
        $("#yt_sear").on("click", this.search);
        $("#yt_name").on("click", this.search);
        $("#yt_loadall").on("click", YT.live.loadAll);
        $("#openRealtime").on("click", function () {
            window.open("https://akshatmittal.com/youtube-realtime/#!/" + YT.live.channelID);
        });
    }
};