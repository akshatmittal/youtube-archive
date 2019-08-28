YT.live = {
    channelID: "",
    pastLimit: "",
    mos: [],
    loadRemaining: false,
    begin: function () {
        $("#calendar-container").html("");
        var limit = new Date(this.pastLimit);
        var limitYear = limit.getFullYear();
        var limitMonth = limit.getMonth();
        var current = new Date();
        this.mos = [];
        for (var i = current.getFullYear(); i >= limitYear; i--) {
            for (var j = (i === current.getFullYear() ? current.getMonth() : 11); j >= 0; j--) {
                this.mos.push([i, j]);
                if (i === limitYear && j === limitMonth) {
                    break;
                }
            }
        }
        this.getData();
    },
    parseItems: function (k) {
        let gsnip = k.snippet;
        let date = new Date(gsnip.publishedAt);

        let cont = document.createElement("div");
        cont.setAttribute("data-video", k.id.videoId);
        cont.onclick = YT.live.launchVideo;
        cont.classList.add("col-day-el");

        let image = document.createElement("img");
        image.src = "https://i.ytimg.com/vi/" + k.id.videoId + "/mqdefault.jpg";

        let dt = document.createElement("span");
        dt.innerText = date.getDate().toLocaleString("en", { minimumIntegerDigits: 2 });

        cont.appendChild(dt);
        cont.appendChild(image);

        let el = document.getElementById("viddate_" + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDate());
        if (el.innerHTML === el.innerText) el.innerHTML = "";
        el.appendChild(cont);
    },
    getData: function () {
        var curr = this.mos.shift();
        var fromDate = new Date(curr[0], curr[1]);
        var toDate = new Date(curr[0], curr[1], 32 - new Date(curr[0], curr[1], 32).getDate(), 23, 59, 59, 999);
        if (curr) {
            $.getJSON("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + YT.live.channelID + "&publishedAfter=" + fromDate.toISOString() + "&publishedBefore=" + toDate.toISOString() + "&maxResults=50&type=video&key=" + YT.keyManager.getKey(), function (e) {
                YT.live.generateMonth(curr[0], curr[1], function (le) {
                    if (e.items.length === 0) {
                        le.parentElement.removeChild(le);
                    }
                    e.items.forEach(YT.live.parseItems);
                    if (e.nextPageToken) {
                        $.getJSON("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + YT.live.channelID + "&publishedAfter=" + fromDate.toISOString() + "&publishedBefore=" + toDate.toISOString() + "&maxResults=50&type=video&key=" + YT.keyManager.getKey() + "&pageToken=" + e.nextPageToken, function (q) {
                            q.items.forEach(YT.live.parseItems);
                        });
                    }
                    if (YT.live.loadRemaining) YT.live.getData();
                });
            });
        }
    },
    launchVideo: function () {
        window.open("https://www.youtube.com/watch?v=" + this.getAttribute("data-video"));
    },
    generateMonth: function (yr, mo, ready) {
        let firstDay = (new Date(yr, mo)).getDay();
        let table = document.createElement("tbody");

        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement("tr");

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    cell = document.createElement("td");
                    cell.classList.add("col-week");
                    cellText = document.createTextNode("");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                else if (date > 32 - new Date(yr, mo, 32).getDate()) {
                    for (let k = j; k < 7; k++) {
                        cell = document.createElement("td");
                        cell.classList.add("col-week");
                        cellText = document.createTextNode("");
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    }
                    break;
                } else {
                    cell = document.createElement("td");
                    cell.id = "viddate_" + yr + "_" + mo + "_" + date;
                    cell.classList.add("col-week");
                    cellText = document.createTextNode(date.toLocaleString("en", { minimumIntegerDigits: 2 }));
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    date++;
                }
            }
            if (row.innerText.trim() !== "") table.appendChild(row);
        }
        var title = document.createElement("h3");
        title.innerText = months[mo] + " " + yr;
        title.classList.add("col-title");
        var conts = document.createElement("div");
        conts.appendChild(title);
        conts.appendChild(table);
        document.getElementById("calendar-container").appendChild(conts);
        ready(conts);
    },
    start: function () {
        YT.live.begin();
    },
    loadAll: function () {
        YT.live.loadRemaining = true;
        $("#yt_loadall").hide();
        YT.live.getData();
    },
    stop: function () {
        // clearInterval(this.timer);
    }
};