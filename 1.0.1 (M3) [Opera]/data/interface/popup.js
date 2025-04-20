const API = chrome || browser;
const PANNEL = ["set_color", "set_font","set_seting"];
const FONT_LIST = [
    "Default Font",
    "Arial",
    "Helvetica",
    "sans-serif",
    "Tahoma",
    "Trebuchet MS",
    "Verdana",
    "Lucida Sans Unicode",
    "Impact",
    "Arial Black",
    "Comic Sans MS",
    "cursive",
    "Courier",
    "Courier New",
    "monospace",
    "Lucida Console",
    "Book Antiqua",
    "Bookman Old Style",
    "Georgia",
    "Palatino Linotype",
    "serif",
    "Times",
    "Times New Roman"
];

const $ = (ele)=> { elemnts = document.querySelectorAll(ele); return elemnts? elemnts.length > 1 ? elemnts : elemnts[0] : null;};
const READY = (callback)=>{document.readyState === "complete" ? callback() : window.addEventListener("load", callback, {once: true})};
const STORAGE = (key)=>{return new Promise(resolve => { API.storage.local.get([key], (result) => { resolve(result[key]);});});};
const ACTIVE_TAB = ()=>{return new Promise(((resolve, reject) => {API.tabs.query({active: true}, (tabs => {API.runtime.lastError ||  resolve(tabs[0]);}))}))}

const ENABLE = (yes)=>{
	yes ? $("body").classList.contains('disabled') ? $("body").classList.remove('disabled') : null : !($("body").classList.contains('disabled')) ? 
	$("body").classList.add('disabled') : null;
}

const SET_COLOR = () => {
	for (x of $(".color-box")){
		if (x.dataset.hax) {
			try{
				x.style.background = JSON.parse((x.dataset.hax).replace(/'/g, '"'))[1];
			}catch(err) {
	    		console.log(err.message);
	  		}
		}
	}
}

const SET_FONT = async()=>{
	const save_font = await STORAGE("font");
	const selected_font = save_font !== undefined ? save_font : "Default Font";
	for(font of FONT_LIST){
		var option = document.createElement('option');
		if (selected_font == font) {
			option.selected = true;
			$("#family").style.setProperty("font-family", font, "important");
		};
		option.value = font;
		option.textContent = font;
    option.style.fontFamily = font;
    $("#family") ? $("#family").appendChild(option): null;
	}
}


const COLORS = async() =>{
  return new Promise((resolve, reject)=> {
    API.storage.local.get({"colors": ['#231333','#32174D','#f9d000','#13a4f0','#5dde49','#ed0074']}, 
      (options)=>{
        resolve(options.colors)
      });
  });
}


const TITLE_ACTIVE = (active_id)=>{
	for(id of PANNEL){
		const ele = $('#' + id);
		ele ? ele.id ? ele.id == active_id ? !ele.classList.contains('active') ? ele.classList.add("active") : null : 
		ele.classList.contains('active') ? ele.classList.remove("active") : null : null : null;
	}
}

const PANNEL_ACTIVE = (className)=>{
	for(ele of $(".tab_panel")){
		ele ? ele.classList.contains(className) ? !ele.classList.contains('show') ? ele.classList.add('show') 
		: null : ele.classList.contains('show') ? ele.classList.remove('show') : null :null;
	}

}

const BOX_ACTIVE = async()=>{
	const colors = await COLORS();
	const custom = await STORAGE("custom_bg");
	if (custom !== undefined && custom) {
		$("#custom_theme") ? $("#custom_theme").style.border = "2px solid rgb(90 51 243)" : null;
		$("#custom_theme") ? $("#custom_theme").style.boxShadow = "1px 1px 4px 0px rgb(90 51 243)" : null;
		for(ele of $(".color-box")){
			ele.style.border = "none";
			ele.style.boxShadow = "none";
		}
	}else{
		$("#custom_theme").style.border = "none";
		$("#custom_theme").style.boxShadow = "none";

		for(ele of $(".color-box")){
			if (ele.dataset.hax) {
				if (JSON.parse((ele.dataset.hax).replace(/'/g, '"'))[1] == colors[1]) {
					ele.style.border = `2px solid ${colors[3]}`;
					ele.style.boxShadow = `1px 1px 4px 0px ${colors[3]}`;
				}else{
					ele.style.border = "none";
					ele.style.boxShadow = "none";
				}
			}
		}
	}

}



const HEX2HSL = (hex) =>{
	try{
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	  var r = parseInt(result[1], 16);
	  var g = parseInt(result[2], 16);
	  var b = parseInt(result[3], 16);

	  r /= 255, g /= 255, b /= 255;
	  var max = Math.max(r, g, b), min = Math.min(r, g, b);
	  var h, s, l = (max + min) / 2;

	  if(max == min){
	      h = s = 0; // achromatic
	  } else {
	      var d = max - min;
	      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	      switch(max) {
	          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	          case g: h = (b - r) / d + 2; break;
	          case b: h = (r - g) / d + 4; break;
	      }
	      h /= 6;
	  }

  	s = s*100;
		s = Math.round(s);
		l = l*100;
		l = Math.round(l);
		h = Math.round(360*h);

		return [h,s,l];
	}catch(err) {
    console.log(err.message);
    return [null,null,null];
  }


}

const CUSTOME_SET = async(ele, hex) =>{
	if (!ele || !hex) return null;
	const hsl = await HEX2HSL(hex);

	if (!hsl) return null;
	const element = $(ele);
	element ? element.style.backgroundColor = `hsl(${hsl[0]} ${hsl[1]}%, ${hsl[2]}%)` : null;

	const text_color = hsl[2] > 80 ? "#000000" : "#ffffff";

	$(ele + " path") ? $(ele + " path").style.fill = text_color : null;
	$(ele + " circle") ? $(ele + " circle").style.stroke = text_color : null;

	const head_color = `hsl(${hsl[0]} ${hsl[1]}%, ${hsl[2] < 10 ? 0 : hsl[2] - 10}%)`

	return [text_color, head_color];
}

const DETAILS = {
  "REVIEW":`https://addons.opera.com/en/extensions/details/purple-for-youtubetm/`,
  "SUPPORT": "https://www.codehemu.com/p/purple-of-youtube.html",
  "YT": "https://www.youtube.com/@CodeHemu",
  "FB": "https://www.facebook.com/CodeHemu",
  "SITE":"https://www.codehemu.com/"
}

const LINK_DETAILS = {
	".rate": DETAILS["REVIEW"], 
	".support": DETAILS["SUPPORT"], 
	".footer-fb": DETAILS["FB"], 
	".footer-yt": DETAILS["YT"], 
	".footer-web" : DETAILS["SITE"]
}

class POPUP{
	constructor() {
		SET_COLOR();
		SET_FONT();
		BOX_ACTIVE();
		ACTIVE_TAB().then(tab => {this.active_tab = tab});

	}

	start(){
		this.event();
		this.panel();
		this.background();

	}

	panel(){
		$(".set_panel").forEach((item)=>{
			item.addEventListener("click",() => {
				TITLE_ACTIVE(item.id);
				PANNEL_ACTIVE(item.id);
			}, false);
		})
	}

	badge(val){
		if (this.active_tab.id && val) {
			API.action.setBadgeText({
	          text: (val).toString()+"X",
	          tabId: this.active_tab.id
	    	})
		}
	}

	store(){
		return new Promise((resolve, reject)=> {
      API.storage.local.get({
        "enabled": true,
        "ads": false,
        "radius": false,
        "border": false,
        "transparent": false,
        "animation": true,
     }, (options)=>{
	        resolve(options);
	      })
	  });
	}

	async event(){
		const key_store = await this.store();

		for (var key in key_store) {
		    if (key_store.hasOwnProperty(key)) {
		    	const id = $("#"+key);
		    	key == "enabled" ? ENABLE(key_store["enabled"]) : null;
		    	if (id) {
		    		id.checked = key_store[key];
		    		id.addEventListener("change", async (target)=>{
		    			var keys = {};
		    			const t_id = target.currentTarget.id;
		    			const value = target.currentTarget.checked;
		    			t_id == "enabled" ? ENABLE(value) : null;
							keys[t_id] = value;
							console.log(keys)
							await API.storage.local.set(keys);
		    		});

		    	}
		    }
		}

		$(".color-box").forEach((item)=>{
			item.addEventListener("click", async(target)=>{
				const colors = JSON.parse((target.currentTarget.dataset.hax).replace(/'/g, '"'));
				await API.storage.local.set({ colors, "custom_bg": false });
				this.background();
				BOX_ACTIVE();
			},false);
		},false);

		$("#family").addEventListener("change", async(target)=>{
			const font = target.currentTarget.value;
			$("#family").style.setProperty("font-family", font, "important");
			await API.storage.local.set({font});
		},false);

		$("#color").addEventListener("input", async(target) => {
			const bg_color = target.currentTarget.value;
			if (!bg_color) return;
			const edit_color = await CUSTOME_SET("#custom_theme", bg_color);
			var colors = await COLORS();
			if (edit_color) {
				colors[0] = edit_color[1];
				colors[2] = edit_color[0];
				colors[3] = edit_color[0];
				colors[4] = edit_color[0];
				colors[5] = edit_color[0];
			}
			colors[1] = bg_color;
			await API.storage.local.set({ colors, "custom_bg": true });
			BOX_ACTIVE();
		},false);

		$("#color1").addEventListener("input", (target) => {
			this.save(2, target.currentTarget.value);
		},false);

		$("#color2").addEventListener("input", (target) => {
			this.save(3, target.currentTarget.value);
		},false);


		$("#color3").addEventListener("input", (target) => {
			this.save(4, target.currentTarget.value);
		},false);

		$("#color4").addEventListener("input", (target) => {
			this.save(5, target.currentTarget.value);
		},false);

		$("#up").addEventListener("click", async()=>{
			var size = await STORAGE("size");
			size = Math.round(((size !== undefined ? size : 1)  + 0.1) * 10) / 10;
			size = size > 2 ? 2 : size;
			this.badge(size);
			await API.storage.local.set({size});
		});

		$("#down").addEventListener("click", async()=>{
			var size = await STORAGE("size");
			size = Math.round(((size !== undefined ? size : 1)  - 0.1) * 10) / 10;
			size = size < 0.5 ? 0.5 : size;
			this.badge(size);
			await API.storage.local.set({size});
		});

		$("#default").addEventListener("click", async()=>{
			await API.storage.local.set({"size":1});
			this.badge(1);
		});

		for (this.key in LINK_DETAILS) {
			LINK_DETAILS.hasOwnProperty(this.key) ? $(this.key) ? $(this.key).href =  LINK_DETAILS[this.key] : null: null;
		}

		$(".footer-text") ? $(".footer-text").textContent = "Purple Of YouTube v." + API.runtime.getManifest().version : null;
		
	}

	async background(){
		const colors = await COLORS();
		colors !== undefined ? 
		((colors[1] ? CUSTOME_SET("#custom_theme", colors[1]) : null),
		(colors[2] ? CUSTOME_SET("#custom_theme2", colors[2]) : null),
		(colors[3] ? CUSTOME_SET("#custom_theme3", colors[3]) : null),
		(colors[4] ? CUSTOME_SET("#custom_theme4", colors[4]) : null),
		(colors[5] ? CUSTOME_SET("#custom_theme5", colors[5]) : null)) : null;
	}

	async save(number, color){
		var colors = await COLORS();
		colors[number] = color;
		CUSTOME_SET("#custom_theme" + number, color);
		await API.storage.local.set({ colors });
	}


}



READY(() => {
	try{
		const popup = new POPUP;
		popup.start();
	}catch(err) {
    	console.log(err.message);
  	}
});

