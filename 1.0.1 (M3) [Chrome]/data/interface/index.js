domReady(() => {
  linkButton()
  hoverButton()
  translateHTML()
})

function domReady (callback) {
  if (document.readyState === 'complete') {
    callback()
  } else {
    window.addEventListener('load', callback, false);
  }
}

function translateHTML (dataKey = 'message') {
  for (const $element of document.getElementsByTagName('*')) {
    if ($element.dataset && $element.dataset[dataKey]) {
      $element.innerText = chrome.i18n.getMessage($element.dataset[dataKey])
    }
  }
}

function linkButton() {
  document.querySelector('.teaser').href = `https://www.codehemu.com/2022/09/youtubetheme.html#CSS3`;
  document.querySelector('.youtube').href = `https://youtube.com/c/HemantaGayen`;
  document.querySelector('.facebook').href = `https://www.facebook.com/codehemu/`;
  document.querySelector('.website').href = `https://www.codehemu.com/2022/09/youtubetheme.html`;
}

function hoverButton(){
  document.querySelector(".div_myadblock").addEventListener("mouseover" , mouseOver);
  document.querySelector(".div_myadblock").addEventListener("mouseout" , mouseOut);
  document.querySelector(".cta-description").addEventListener("click", linkopen);
  document.querySelector(".cta-close").addEventListener("click", messageclose);
  document.querySelector(".devoloperid").addEventListener("click", devoloperid);
  document.querySelector("#header-icons").addEventListener("click", headericons);
  if (localStorage.block=="block") {
    document.querySelector(".div_myadblock").style.display="none";
  }

}  
function mouseOver() {
  if (localStorage.message=="nyancat") {
    document.querySelector(".cta-message").innerText="Install YouTube Nyan Cat";
    document.querySelector(".div_myadblock").style.background="#a900ff";
  }else{
    document.querySelector(".cta-message").innerText="Install YouTube Glow";
    document.querySelector(".div_myadblock").style.background="#0047ff";
  }
    
    document.querySelector(".cta-close").style.display="block";
} 

function mouseOut() {
    document.querySelector(".cta-message").innerText="Upgrade your YouTube";
    document.querySelector(".cta-close").style.display="none";
    document.querySelector(".div_myadblock").style.background="#fff";
}

function linkopen(){
  if (localStorage.message=="nyancat") {
    window.open("https://www.codehemu.com/2022/04/nyancat.html",'_blank');
  }else{
    window.open("https://www.codehemu.com/2022/09/youtubetheme.html#CSS2",'_blank');
  }

}
function devoloperid(){
    window.open("https://www.codehemu.com/p/donate.html",'_blank');
}
function messageclose(){
  if (localStorage.message=="nyancat") {
    localStorage.setItem("block", "block");
  }
  document.querySelector(".div_myadblock").style.display="none";
  localStorage.setItem("message", "nyancat");
}
function headericons(){
    window.open("https://www.codehemu.com/p/mytubeforyoutube.html",'_blank');
}

var background = (function () {
  var tmp = {};
  if (chrome && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener(function (request) {
      for (var id in tmp) {
        if (tmp[id] && (typeof tmp[id] === "function")) {
          if (request.path === "background-to-popup") {
            if (request.method === id) tmp[id](request.data);
          }
        }
      }
    });
    /*  */
    return {
      "receive": function (id, callback) {tmp[id] = callback},
      "send": function (id, data) {
        chrome.runtime.sendMessage({"path": "popup-to-background", "method": id, "data": data});
      }
    }
  } else {
    return {
      "send": function () {},
      "receive": function () {}
    }
  }
})();
