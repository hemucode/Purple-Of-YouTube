var ELEMS_ARRAY = [];

const API = chrome || browser;
// app install then main theme color code in hax
const THEME = ['#231333','#32174D','#f9d000','#13a4f0','#5dde49','#ed0074'];

// all banner advatisement and other ads element id and class 
const BLOCKER = ['#player-ads', 'ytd-engagement-panel-section-list-renderer', '#masthead-ad', '.ytd-video-masthead-ad-v3-renderer', '.ytd-in-feed-ad-layout-renderer', 'ytd-compact-promoted-item-renderer'];

// all search box element id and class
const SEARCH_BOX = ['.ytSearchboxComponentSuggestionsContainer', '.ytSearchboxComponentInputBox', '.ytSearchboxComponentInputBoxDark', '.ytSearchboxComponentInputBoxDark', '.ytSearchboxComponentSearchButton'];

// all broder element id and class
const BRODER = [...SEARCH_BOX, "#container.ytd-searchbox","#search-icon-legacy.ytd-searchbox"];

// this is all main elemet change broder and color
const MAIN_SECTORS = ["a.thumbnail > .ytcd-basic-item-large-image","ytcp-thumbnail-with-title","ytd-playlist-thumbnail","ytd-thumbnail","#thumbnail",".thumbnail-container.ytd-notification-renderer",'[role="listbox"]',".ytp-ce-video",".ytp-ce-playlist",'[aria-live="polite"]',".ytp-tooltip-bg",".ytp-tooltip-text.ytp-tooltip-text-no-title",".branding-img.iv-click-target",".branding-context-container-inner","ytd-thumbnail-overlay-bottom-panel-renderer",".ytp-progress-list",".ytp-play-progress.ytp-swatch-background-color",".ytp-load-progress",".ytp-hover-progress.ytp-hover-progress-light",".style-scope.ytd-subscribe-button-renderer","#container.ytd-playlist-panel-renderer",".header.ytd-playlist-panel-renderer","ytd-button-renderer.style-suggestive[is-paper-button] tp-yt-paper-button.ytd-button-renderer","ytd-live-chat-frame",".ytp-ce-playlist-count",".ytp-ce-expanding-overlay-background",".ytp-popup.ytp-settings-menu",".ytp-sb-subscribe",".ytp-sb-unsubscribe",".iv-drawer",".iv-card",".iv-card a.iv-click-target",".ytp-cards-teaser-box",".miniplayer.ytd-miniplayer",".ytp-popup",".badge.ytd-badge-supported-renderer",".ytp-ce-website .ytp-ce-expanding-image",".ytp-ce-merchandise .ytp-ce-expanding-image",".ytp-flyout-cta .ytp-flyout-cta-body","#ytp-ad-image",".ytp-ad-preview-container",".ytp-ad-message-container","#guide-content",".sbsb_d","#endpoint.yt-simple-endpoint.ytd-guide-entry-renderer",'[role="search"]',".ytp-ad-skip-button.ytp-button",".ytp-flyout-cta .ytp-flyout-cta-icon","#banner > img","#icon > img","#action",".ytp-cards-teaser",".ytp-ce-video-duration",".ytp-show-tiles .ytp-videowall-still",".ytp-videowall-still-info-content",".ytp-videowall-still-listlabel-mix.ytp-videowall-still-listlabel",".style-scope.ytd-popup-container","#action-companion-ad-info-button.ytd-action-companion-ad-renderer",".ytp-flyout-cta .ytp-flyout-cta-action-button",".ytp-autonav-endscreen-upnext-thumbnail",".ytp-autonav-endscreen-upnext-button","ytd-playlist-panel-video-renderer","ytd-guide-entry-renderer","tp-yt-paper-listbox > *",".ytp-ad-overlay-image",".ytp-ad-button-icon",".ytp-ad-overlay-close-button",".ytp-ad-text-overlay",".ytp-ad-button-icon",".ytp-ad-button-icon","#media-container.ytd-display-ad-renderer","ytd-display-ad-renderer[layout=display-ad-layout-top-landscape-image] #media-badge.ytd-display-ad-renderer","#chips-wrapper.ytd-feed-filter-chip-bar-renderer","ytd-mini-guide-entry-renderer","ytd-video-preview","ytd-toggle-button-renderer","ytd-post-renderer[uses-compact-lockup]","ytd-backstage-image-renderer","#tabs-container","ytd-playlist-video-renderer","ytd-miniplayer","ytd-button-renderer",".ytd-thumbnail-overlay-loading-preview-renderer","ytd-thumbnail-overlay-inline-unplayable-renderer","ytd-thumbnail.ytd-rich-grid-media:before",".skeleton-bg-color.ytd-ghost-grid-renderer",".captions-text","#container","[round]","ytd-engagemepanel-section-list-renderer","#tooltip","yt-multi-page-menu-section-renderer #items > *","ytd-notification-renderer","#time.ytd-macro-markers-list-item-renderer","ytd-macro-markers-list-item-renderer",".ytp-menuitem","tp-yt-paper-button.ytd-expander","#text-container.yt-notification-action-renderer","tp-yt-paper-button.ytd-text-inline-expander","tp-yt-paper-listbox > * tp-yt-paper-item",".ytp-menuitem","yt-live-chat-text-message-renderer","yt-img-shadow img","ytmusic-player-queue-item","yt-dynamic-text-view-model",".ytp-inline-preview-controls",".playlist-items.ytd-playlist-panel-renderer",'[role="listbox"] > div'];

// main background transprent item class and id
const TRANSPARENT = ["ytd-app", "ytd-button-renderer", "#voice-search-button.ytd-masthead", "#chips-wrapper.ytd-feed-filter-chip-bar-renderer", "ytd-mini-guide-entry-renderer", "ytd-mini-guide-renderer","#container.style-scope.ytd-masthead","#background.ytd-masthead","#container.ytd-searchbox","#guide-content.ytd-app",".yt-ui-ellipsis",".ytp-tooltip.ytp-preview:not(.ytp-text-detail)","#contentContainer",".ytp-videowall-still-info-duration","ytmusic-app-layout:has(ytmusic-nav-bar[is-search-page])",".background-gradient"];

const DIP_TRANSPARENT = [...SEARCH_BOX, ".playlist-items.ytd-playlist-panel-renderer", "[role='listbox'] > div,.header.ytd-playlist-panel-renderer"];

// all tremsfrom element
const TRANSITIONS = ["ytd-live-chat-frame", ".yt-simple-endpoint.ytd-playlist-panel-video-renderer", "ytd-guide-entry-renderer", "ytd-playlist-thumbnail", "ytd-thumbnail", "ytd-compact-playlist-renderer", "ytd-compact-video-renderer", "ytd-compact-radio-renderer", "ytd-compact-playlist-renderer>div>div>div>a", "ytd-compact-video-renderer>div>div>div>a", "ytd-compact-radio-renderer>div>div>div>a", "ytd-thumbnail.ytd-rich-grid-media", "ytd-thumbnail.ytd-rich-grid-media>a", "#button.ytd-menu-renderer.yt-icon.ytd-menu-renderer", "ytd-playlist-video-renderer", "ytd-video-renderer", "yt-lockup-view-model", "yt-multi-page-menu-section-renderer #items > *", "ytd-notification-renderer", "ytd-macro-markers-list-item-renderer"];

const $ = (ele)=> { elemnts = document.querySelectorAll(ele); return elemnts? elemnts.length > 1 ? elemnts : elemnts[0] : null;};
const READY = (callback)=>{document.readyState === "complete" ? callback() : window.addEventListener("load", callback, {once: true})};
const GET = (el, css)=>{return document.defaultView.getComputedStyle(el, null).getPropertyValue(css);}

const CSS_REDIUS = (css)=>{return `${css}{border-radius: 36px !important;}`};
const CSS_HIDE = (css)=>{return `${css}{display: none !important; visibility: hidden !important;}`};
const CSS_BRODER = (colors)=>{return `${BRODER.join(",")}{border: 1px solid ${colors} !important; box-shadow: none !important; }`;}


const CSS_TRANSPRENT = (css)=>{
  return `${css}{background-color: transparent !important; border-color: transparent !important;}
  ${DIP_TRANSPARENT.join(",")}{background-color: #00000063 !important;} ytd-app{transition: background 1s;} 
  html, html[dark], [dark] {--yt-spec-base-background: transparent !important;}`
};

const CSS_ANIMATION = (css)=>{
  return `
    #dismissible.ytd-rich-grid-media:hover > ytd-thumbnail{   
        margin-block-start: -15px !important;
        margin-block-end: 15px !important;;
    }
    
    ytd-compact-playlist-renderer:hover,
    ytd-compact-video-renderer:hover,
    ytd-compact-radio-renderer:hover,
    ytd-video-renderer:hover,
    ytd-playlist-renderer:hover{    
        margin-inline-start: -15px !important;
    }

    ytd-compact-link-renderer:hover{    
        margin-inline-start: 15px !important;
    }
    
    ytd-compact-playlist-renderer:hover>div>div>div>a,
    ytd-compact-video-renderer:hover>div>div>div>a,
    ytd-compact-radio-renderer:hover>div>div>div>a{
        margin-inline-end: 15px !important;
    }
    
    ytd-playlist-panel-video-renderer:hover > .yt-simple-endpoint.ytd-playlist-panel-video-renderer,
    ytd-guide-entry-renderer:hover{
        margin-inline-start: -10px !important;
        margin-inline-end: 10px !important;
    }

    ytd-thumbnail:hover,
    ytd-playlist-thumbnail:hover{   
        transform: scale(var(--Zoom)) !important;
        z-index: 400;
    }
    #dismissible.ytd-rich-grid-media:hover > ytd-thumbnail{   
        margin-block-start: -15px !important;
        margin-block-end: 15px !important;;
    }
    
    ytd-compact-playlist-renderer:hover,
    ytd-compact-video-renderer:hover,
    ytd-compact-radio-renderer:hover{    
        margin-inline-start: -15px !important;
    }
    
    ytd-compact-playlist-renderer:hover>div>div>div>a,
    ytd-compact-video-renderer:hover>div>div>div>a,
    ytd-compact-radio-renderer:hover>div>div>div>a,
    ytd-video-renderer:hover,
    ytd-playlist-renderer:hover{
        margin-inline-end: 15px !important;
    }

    ytd-compact-link-renderer:hover{
        margin-inline-end: -15px !important;
    }
    
    ytd-thumbnail:hover,
    ytd-playlist-thumbnail:hover{   
        transform: scale(var(--Zoom)) !important;
        z-index: 400;
    }
    
    ytd-playlist-panel-video-renderer:hover > .yt-simple-endpoint.ytd-playlist-panel-video-renderer,
    ytd-guide-entry-renderer:hover{
        margin-inline-start: -10px !important;
    }
    
    ${css}{transition: all .2s;}`;
}

const CSS_THEME = (colors)=>{
  return `span, .ytd-guide-entry-renderer, 
    .ytCarouselTitleViewModelTitle,
    .yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal {
        color: ${colors[3]};
    }

    body,html{
      overflow-x: hidden;
    }

    #yt-purple-image{    
      width: 100%;
      height: 100%;
      background-size: 100%;
      background-repeat: no-repeat;
      background-attachment: fixed;
      top: 0px;
      filter: blur(5px);
      position: fixed;
      z-index: -10000;
      transition: opacity 1s;
    }

    #yt-purple-tint {
      position: fixed;
      z-index: -9999;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      background: #0000007a;
      transition: background 1s;
    }

    ${SEARCH_BOX.join(",")}{
      background: ${colors[1]} !important; 
      color: ${colors[3]} !important;  
    }
    #container.style-scope.ytd-masthead,
    #background.ytd-masthead{
      background: ${colors[0]};
    }
    #text{
        color: ${colors[4]} !important;
    }

    svg [fill="#FF0033"]{
      fill: ${colors[5]} !important;
    }

    yt-icon,
    yt-formatted-string,
    .title .ytd-guide-entry-renderer{
       color: ${colors[2]} !important; 
    }

    a,
    ytd-text-header-renderer{
        color: ${colors[5]} !important;
    }

    ytd-app[is-shorts-page],
    ytd-brand-video-shelf-renderer {
        background: ${colors[1]} !important;
    }

    #container.ytd-searchbox{ 
        border-radius: 4px 0 4px 0 !important;
    }

    #search-icon-legacy.ytd-searchbox{
        border-radius: 0 4px 4px 0 !important;
    }

  
    html[system-icons]{
      --yt-spec-icon-active-other: ${colors[1]} !important;
      --yt-spec-icon-inactive: ${colors[1]} !important;
      --yt-spec-brand-icon-active: ${colors[1]} !important;
      --yt-spec-brand-icon-inactive: ${colors[1]} !important;
    }

    html[darker-dark-theme-deprecate], [darker-dark-theme-deprecate] {
      --yt-spec-10-percent-layer: ${colors[1]} !important;
    }

    ytd-playlist-panel-renderer[use-color-palette]{
      --yt-active-playlist-panel-background-color: ${colors[0]} !important;
    }

    html, html[dark], [dark], [light], html[light] {
      --yt-spec-base-background: ${colors[1]} !important;
      --yt-spec-raised-background:  ${colors[1]} !important;
      --yt-spec-menu-background:  ${colors[1]} !important;
      --yt-spec-raised-background: ${colors[0]} !important;
      --yt-spec-menu-background: ${colors[0]} !important;
      --yt-spec-inverted-background: #f1f1f1 !important;
      --yt-spec-additive-background: ${colors[1]} !important;
      --yt-spec-outline: ${colors[2]} !important;
      --yt-spec-shadow: ${colors[0]} !important;
      --yt-spec-text-disabled: #717171 !important;
      --yt-spec-text-primary: ${colors[3]} !important;
      --yt-spec-text-primary-inverse: ${colors[1]} !important;
      --yt-spec-call-to-action: ${colors[4]} !important;
      --yt-spec-call-to-action-inverse: ${colors[4]} !important;
      --yt-spec-suggested-action: ${colors[1]} !important;
      --yt-spec-suggested-action-inverse: #def1ff !important;
      --yt-spec-icon-active-other: ${colors[1]} !important;
      --yt-spec-icon-inactive: ${colors[0]} !important;
      --yt-spec-icon-disabled: #606060 !important;
      --yt-spec-button-chip-background-hover: ${colors[0]} !important;
      --yt-spec-touch-response: ${colors[1]} !important;
      --yt-spec-touch-response-inverse: ${colors[1]} !important;
      --yt-spec-brand-icon-active: ${colors[1]} !important;
      --yt-frosted-glass-mobile: ${colors[1]} !important;
      --yt-frosted-glass-desktop: ${colors[1]} !important;

      --ytd-searchbox-legacy-border-color: ${colors[1]} !important;
      --ytd-searchbox-legacy-border-shadow-color:${colors[0]} !important;
      --ytd-searchbox-legacy-button-border-color:${colors[0]} !important;
      --ytd-searchbox-background: ${colors[0]} !important;
      --ytd-searchbox-legacy-button-color:${colors[0]} !important;

      --ytd-searchbox-legacy-button-focus-color: ${colors[1]} !important;
      --ytd-searchbox-legacy-button-hover-color: ${colors[1]} !important;
      --ytd-searchbox-legacy-button-hover-border-color: ${colors[1]} !important;

      --ytd-searchbox-legacy-button-focus-color: #e9e9e9;
      --ytd-searchbox-legacy-button-hover-color: #f0f0f0;
      --ytd-searchbox-legacy-button-hover-border-color: #c6c6c6;
      --ytd-searchbox-legacy-button-icon-color: #333;
      --yt-spec-base-background: ${colors[1]} !important;

      --yt-spec-general-background-a:  ${colors[0]} !important;
      --yt-spec-general-background-b: ${colors[0]} !important;
      --yt-spec-general-background-c:  ${colors[0]} !important;
      --yt-lightsource-section4-color: ${colors[0]} !important;

      --yt-spec-brand-button-background: #c00 !important;
      --yt-spec-brand-link-text: ${colors[2]} !important;
      --yt-spec-wordmark-text: #fff !important;
      --yt-spec-error-indicator: #ff8983 !important;
      --yt-spec-themed-blue: #3ea6ff !important;
      --yt-spec-themed-green: #2ba640 !important;
      --yt-spec-ad-indicator: #00aaa7;
      --yt-spec-themed-overlay-background: ${colors[0]} !important;
      --yt-spec-commerce-badge-background: ${colors[1]} !important;
      --yt-spec-static-brand-red: #f00 !important;
      --yt-spec-static-brand-white: #fff !important;
      --yt-spec-static-brand-black: ${colors[1]} !important;
      --yt-spec-static-clear-color: ${colors[1]} !important;
      --yt-spec-static-clear-black: ${colors[1]} !important;
      --yt-spec-static-ad-yellow: #fbc02d !important;
      --yt-spec-static-grey: #606060 !important;
      --yt-spec-static-overlay-background-solid: #000 !important;
      --yt-spec-static-overlay-background-heavy: ${colors[1]} !important;
      --yt-spec-static-overlay-background-medium: ${colors[1]} !important;
      --yt-spec-static-overlay-background-medium-light: ${colors[1]} !important;
      --yt-spec-static-overlay-background-light: ${colors[1]} !important;
      --yt-spec-static-overlay-text-primary: #fff !important;
      --yt-spec-static-overlay-text-primary-inverse: ${colors[1]} !important;
      --yt-spec-static-overlay-text-secondary: rgba(255, 255, 255, 0.7) !important;
      --yt-spec-static-overlay-text-disabled: rgba(255, 255, 255, 0.3) !important;
      --yt-spec-static-overlay-call-to-action: #3ea6ff !important;
      --yt-spec-static-overlay-icon-active-other: #fff !important;
      --yt-spec-static-overlay-icon-inactive: rgba(255, 255, 255, 0.7) !important;
      --yt-spec-static-overlay-icon-disabled: rgba(255, 255, 255, 0.3) !important;
      --yt-spec-static-overlay-button-primary: rgba(255, 255, 255, 0.3) !important;
      --yt-spec-static-overlay-button-secondary: rgba(255, 255, 255, 0.1) !important;
      --yt-spec-static-overlay-touch-response: #fff !important;
      --yt-spec-static-overlay-touch-response-inverse: #000 !important;
      --yt-spec-static-overlay-background-brand: ${colors[2]} !important;
      --yt-spec-assistive-feed-themed-gradient-1: ${colors[3]} !important;
      --yt-spec-assistive-feed-themed-gradient-2: ${colors[4]} !important;
      --yt-spec-assistive-feed-themed-gradient-3: ${colors[5]} !important;
      --yt-spec-discover-red: ${colors[2]} !important;
      --yt-spec-discover-green:${colors[3]} !important;
      --yt-spec-discover-blue:${colors[4]} !important;
      --yt-spec-brand-background-solid:${colors[0]} !important;
      --yt-spec-brand-background-primary: ${colors[0]} !important;
      --yt-spec-brand-background-secondary:${colors[0]} !important;

      --yt-spec-error-background: #f9f9f9 !important;
      --yt-spec-10-percent-layer: ${colors[3]} !important;
      --yt-spec-snackbar-background: ${colors[1]} !important;
      --yt-spec-snackbar-background-updated: #f9f9f9 !important;
      --yt-spec-badge-chip-background: rgba(255, 255, 255, 0.1) !important;
      --yt-spec-verified-badge-background: rgba(255, 255, 255, 0.25) !important;
      --yt-spec-call-to-action-faded: rgba(62, 166, 255, 0.3) !important;
      --yt-spec-call-to-action-hover: #6ebcff !important;
      --yt-spec-brand-button-background-hover: #990412 !important;
      --yt-spec-brand-link-text-faded: rgba(255, 78, 69, 0.3) !important;
      --yt-spec-filled-button-focus-outline: rgba(255, 255, 255, 0.7) !important;
      --yt-spec-static-overlay-button-hover: rgba(255, 255, 255, 0.5) !important;
      --yt-spec-mono-filled-hover: #d9d9d9 !important;
      --yt-spec-commerce-filled-hover: #65b8ff !important;
      --yt-spec-mono-tonal-hover: rgba(255, 255, 255, 0.2) !important;
      --yt-spec-commerce-tonal-hover: #515561 !important;
      --yt-spec-static-overlay-filled-hover: #e6e6e6 !important;
      --yt-spec-static-overlay-tonal-hover: rgba(255, 255, 255, 0.2) !important;
      --yt-spec-paper-tab-ink: rgba(255, 255, 255, 0.3) !important;
      --yt-spec-filled-button-text:${colors[1]} !important;
      --yt-spec-selected-nav-text: #fff !important;

      scrollbar-color: ${colors[5]} ${colors[1]} !important;

    }
  
    @supports (scrollbar-width: auto) {
        * {
            scrollbar-width: thin;
            scrollbar-color: ${colors[5]} ${colors[1]};
        }
    }

    #cinematics-container{
      display: none !important;
      visibility: hidden !important;
    }`;
}



const CREATE_ELEMENT =(el, id, val)=>{
  let ele = el == "div" ? (document.body || document.getElementsByTagName("body")[0]) : el == "style" ? 
  (document.head || document.getElementsByTagName("head")[0]) : null;
  if (!ele) return void setTimeout((() => {CREATE_ELEMENT(el, id, val)}), 100);
  let elemnt = document.createElement(el);
  elemnt.id = id;
  val ? el == "style" ? (elemnt.textContent = val) : el == "div" ? 
  elemnt.style.setProperty("background-image", `url(${val})`) : null : null;
  ele.appendChild(elemnt);
}

const BACKGROUND = (toogle, src)=>{
  const ele = $('#yt-purple-image');
  const tint = $('#yt-purple-tint');
  toogle ? ele ? (src ? GET(ele, "background-image") == `url(${src})` ? null : ele.style.setProperty("background-image", `url(${src})`) : null) : 
  CREATE_ELEMENT("div", "yt-purple-image", src) : (ele ? ele.parentNode.removeChild(ele) : null);
  toogle ? tint ? null : CREATE_ELEMENT("div", "yt-purple-tint") : (tint ? tint.parentNode.removeChild(tint) : null);
}


const STYLE = (toogle, css)=>{ 
  const ele = $('#yt-purple-style'); 
  toogle ? ele ? (css ? ele.textContent = css : null) : CREATE_ELEMENT("style", "yt-purple-style", css) : (ele ? ele.parentNode.removeChild(ele) : null);
}

const GET_YT_ID = (url)=>{
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : null;
}



class CONTENT{
  constructor() {
    this.enabled = true;
    this.current_times;
    this.current_fontfamily;
    this.loop_timer = null;
    this.transparent = null;
  }

  default(el){
    const id = el.dataset.purple;
    if (id) {return ELEMS_ARRAY[id]}else{
      el.dataset.purple = ELEMS_ARRAY.length;
      const get_family =  GET(el, "font-family");
      const obj = {"font-size": parseFloat(GET(el, "font-size")), "font-family": (get_family == this.current_fontfamily ? '' : get_family)};
      ELEMS_ARRAY.push(obj);
      return obj;
    }
  }

  set_defult(){
    return new Promise(resolve => {
      var elems = document.querySelectorAll('body, body *');
      if (elems.length != 0 || document.readyState != "complete"){
        for (var i = 0; i < elems.length; i++){
          this.default(elems[i]);
        }
      }
    },()=>{resolve(true);});
  }

  change_family(el,fa){
    const defaultObj = this.default(el);
    const defaultFamily = defaultObj["font-family"];
    const fontFamily = (fa == null || fa.indexOf("Default") != -1) ?  (defaultFamily ? defaultFamily : 'sans-serif') : fa;
    el.style.setProperty("font-family", fontFamily, "important");
  }

  change_size(el){
    const defaultObj = this.default(el);
    const defaultSize = defaultObj["font-size"];
    const newSize = Math.round(defaultSize * this.current_times);
    const oldSize = Math.round(parseFloat(GET(el, "font-size")));
    if (newSize == oldSize) return;
    if (!el.isContentEditable || (el.parentNode && !el.parentNode.isContentEditable)){
      el.style.setProperty("font-size", newSize + "px", "important");
      var current_fontsize = parseInt(GET(el, "font-size"));
      var current_lineheight = parseInt(GET(el, "line-height"));
      current_lineheight != "normal" && current_lineheight <= (current_fontsize + 1) ? 
      el.style.setProperty("line-height", "normal", "important") : null;
    }

  }

  change_image(){
    const id = GET_YT_ID(window.location.href), img = id ? null : $("ytd-thumbnail img");
    id ? BACKGROUND(this.transparent, `https://img.youtube.com/vi/${id}/maxresdefault.jpg`) : 
    img ? img[0].src ? BACKGROUND(this.transparent, img[0].src) : null: null;
  }


  traverse(){
    if (this.loop_timer) return;
    var elems = document.querySelectorAll('body, body *');
    if (elems.length != 0 || document.readyState != "complete"){
      this.loop_timer = true;
      for (var i = 0; i < elems.length; i++){
        var el = elems[i];
        if (this.current_fontfamily) this.change_family(el, this.current_fontfamily);
        if (this.current_times) this.change_size(el);
        if (i==(elems.length-1)) setTimeout(()=>{this.loop_timer = false; this.traverse();}, ((window.self === window.top) ? 1000 : 5000));
      }
    }
  }

  observe(){
    var observer = new MutationObserver((mutations)=> {
      mutations.forEach((mutation)=> {
        for (var i = 0; i < mutation.addedNodes.length; i++){
          if (mutation.addedNodes[i].nodeType == 1) { 
            try {
              var el = mutation.addedNodes[i];
              if (this.current_fontfamily) this.change_family(el, this.current_fontfamily);
              if (this.current_times) this.change_size(el);
              if (this.transparent) this.change_image();
            } catch (error) {
                console.log(error);
            }
          }
        }
      });
    });

    var config = {childList: true, subtree: true};
    observer.observe(document.body, config);
  }

  storage(){
    return new Promise((resolve, reject)=> {
      API.storage.local.get({
        "enabled": true,
        "ads": false,
        "radius": false,
        "border": false,
        "transparent": false,
        "animation": true,
        "colors": THEME,
        "size": null,
        "font": null
     }, (options)=>{
          resolve(options);
        })
    });
  }

  start(){
    READY(() => {
      this.set_defult().then(this.observe(), this.traverse());
    });
    this.update();
    this.changed();
  }

  async update(){
    this.key = await this.storage();
    this.enabled = this.key.enabled;
    this.current_times = this.enabled ? this.key.size : 1;
    this.current_fontfamily = this.enabled ? this.key.font : "Default";
    STYLE(this.enabled);
    BACKGROUND(this.enabled);
    if (!(this.enabled)) return;
    this.transparent = this.key.transparent;

    const css_text = ((CSS_THEME(this.key.colors)) + 
      (this.key.transparent ? CSS_TRANSPRENT(TRANSPARENT.join(",")) : "") +  
      (this.key.ads ? CSS_HIDE(BLOCKER.join(","))  : "") + 
      (this.key.radius ? CSS_REDIUS(MAIN_SECTORS.join(",")) : "") + 
      (CSS_BRODER(this.key.border ? this.key.colors[3] : "transparent")) +
      (this.key.animation ? CSS_ANIMATION(TRANSITIONS.join(",")) : ""));
    STYLE(this.enabled, css_text);
    
  }


  changed(){
    API.storage.onChanged.addListener(async (changes, namespace) => {
        if (namespace !== "local") return;
        await this.update();
    });
  }
}


if (/youtube\.com/.test(window.location.origin)) {
  try{
    const content = new CONTENT();
    content.start();
  }catch(err) {
    console.log(err.message);
  }
}



