var core = {
  "start": function () {
    core.load();
  },
  "install": function () {
    core.load();
  },
  "load": function () {

  },
  "action": {
    "storage": function (changes, namespace) {
      if (namespace !== "local") return;
      if (changes.enable) {
        if (!changes.enable.newValue) {
          app.action.set.icon({
            64: "data/icons/64-off.png"
          });
        }else{
          app.action.set.icon({
            32: "data/icons/32.png",
            64: "data/icons/64.png",
            128: "data/icons/128.png"
          });
        }
      }
    }
  }
};

app.on.startup(core.start);
app.on.installed(core.install);


