var app = {},
    API = chrome || browser;

app.error = function() {
    return API.runtime.lastError;
};


app.action = {
    "set": {
        "icon": function(callback) {
            API.action.setIcon({
                path: callback
            });
        }
    }
};

app.storage = {
    "local": {},
    "read": function(id) {
        return app.storage.local[id];
    },
    "update": function(callback) {
        if (app.session) app.session.load();
        /*  */
        API.storage.local.get(null, function(e) {
            app.storage.local = e;
            if (callback) {
                callback("update");
            }
        });
    },
    "write": function(id, data, callback) {
        let tmp = {};
        tmp[id] = data;
        app.storage.local[id] = data;
        /*  */
        API.storage.local.set(tmp, function(e) {
            if (callback) {
                callback(e);
            }
        });
    },
    "load": function(callback) {
        const keys = Object.keys(app.storage.local);
        if (keys && keys.length) {
            if (callback) {
                callback("cache");
            }
        } else {
            app.storage.update(function() {
                if (callback) callback("disk");
            });
        }
    }
};


app.on = {
    "uninstalled": function(url) {
        API.runtime.setUninstallURL(url, function() {});
    },
    "installed": function(callback) {
        API.runtime.onInstalled.addListener(function(e) {
            app.storage.load(function() {
                callback(e);
            });
        });
    },
    "startup": function(callback) {
        API.runtime.onStartup.addListener(function(e) {
            app.storage.load(function() {
                callback(e);
            });
        });
    },
    "connect": function(callback) {
        API.runtime.onConnect.addListener(function(e) {
            app.storage.load(function() {
                if (callback) callback(e);
            });
        });
    },
    "storage": function(callback) {
        API.storage.onChanged.addListener(function(changes, namespace) {
            app.storage.update(function() {
                if (callback) {
                    callback(changes, namespace);
                }
            });
        });
    },
    "message": function(callback) {
        API.runtime.onMessage.addListener(function({
            action,
            href,
            message
        }, {
            tab
        }, sendResponse) {
            app.storage.load(function() {
                callback({
                    action,
                    href,
                    message
                }, {
                    tab
                }, sendResponse);
            });
            /*  */
            return true;
        });
    }
};

app.tab = {
    "get": function(tabId, callback) {
        API.tabs.get(tabId, function(e) {
            if (callback) callback(e);
        });
    },
    "remove": function(tabId, callback) {
        API.tabs.remove(tabId, function(e) {
            if (callback) callback(e);
        });
    },
    "query": {
        "index": function(callback) {
            API.tabs.query({
                "active": true,
                "currentWindow": true
            }, function(tabs) {
                let tmp = API.runtime.lastError;
                if (tabs && tabs.length) {
                    callback(tabs[0].index);
                } else callback(undefined);
            });
        }
    },
    "update": function(tabId, options, callback) {
        if (tabId) {
            API.tabs.update(tabId, options, function(e) {
                if (callback) callback(e);
            });
        } else {
            API.tabs.update(options, function(e) {
                if (callback) callback(e);
            });
        }
    },
    "open": function(url, index, active, callback) {
        let properties = {
            "url": url,
            "active": active !== undefined ? active : true
        };
        /*  */
        if (index !== undefined) {
            if (typeof index === "number") {
                properties.index = index + 1;
            }
        }
        /*  */
        API.tabs.create(properties, function(tab) {
            if (callback) callback(tab);
        });
    },
    "reload": function() {
        API.tabs.reload();
    }
};