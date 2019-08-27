YT.updateManager = {
    updateName: function (e) {
        $(".yt_name").text(e);
    },
    updateProfile: function (e) {
        $("#yt_profile").attr("src", e);
    },
    updateCover: function (e) {
        $("#yt_cover").attr("src", e);
    },
    updateSubscribers: function (e) {
        $("#yt_subs").text(e);
    },
    updateViews: function (e) {
        $("#yt_views").text(e);
    },
    updateVideos: function (e) {
        $("#yt_videos").text(e);
    },
    updateDate: function (e) {
        $("#yt_date").text(e);
    },
    updateChannel: function (e, f) {
        YT.live.channelID = e;
        YT.live.pastLimit = f;
        $("#yt_shareurl").val(YT.urls.getCurrent());
    }
};