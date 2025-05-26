app.version = function () {return API.runtime.getManifest().version};
app.homepage = function () {return "https://www.codehemu.com/p/purple-of-youtube.html"};


if (!navigator.webdriver) {
    app.on.installed(function(details) {
        app.tab.query.index(function(index) {
            switch (details.reason) {
                case API.runtime.OnInstalledReason.INSTALL:
                    console.log("install");
                case API.runtime.OnInstalledReason.UPDATE:
                    console.log("update");
            }
            app.tab.open(app.homepage(), index);
        });

    });

    app.on.uninstalled(app.homepage() + "#uninstall");

}

