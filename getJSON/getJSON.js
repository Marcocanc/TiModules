//getJSON for Titanium mobile by Marco Cancellieri
//Works like the jQuery getJSON (https://api.jquery.com/jquery.getjson/)
module.exports = (function () {
    return {
        getJSON: function (url, data, callback, errcallback) {
            return getJSON(url, data, callback, errcallback);
        },
    };

    function getJSON(url, data, callback, errcallback) {
        if (typeof (data) == "function") {
            if (callback) errcallback = callback;
            callback = data;

        } else if (data) {
            var datastring = "?";
            var i = 0;
            for (var name in data) {
                if (i > 0) datastring += "&";
                datastring += name;
                if (data[name]) datastring += "=" + data[name];
                i++;
            }
            url = url + Ti.Network.encodeURIComponent(datastring);

        }

        var client = Ti.Network.createHTTPClient({
            onload: function (e) {
                if (callback) {
                    try {
                        var res = this.responseText;
                        var obj = JSON.parse(res);
                        callback(obj);
                    } catch (err) {
                        throw err;
                    }
                }
            },
            onerror: function (err) {
                Ti.API.error(err);
                if (errcallback) errcallback(err);
            }
        });
        client.open("GET", url);
        client.send();
    }

}());