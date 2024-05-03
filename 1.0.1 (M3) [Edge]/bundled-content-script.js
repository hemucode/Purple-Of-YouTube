domReady(() => {
  LogoColor()
  injectMainScript()
})

/**
 * @returns Promise
 */
function domReady (callback) {
  if (document.readyState === 'complete') {
    callback()
  } else {
    window.addEventListener('load', callback, false);
  }
}
   
/**
 * @returns Promise
 */     

function LogoColor(){
    logopath = document.querySelector("ytd-topbar-logo-renderer #logo-icon svg g g path");
    if (logopath) {
        logopath.style.fill="#08c73a";
    }
}  


/**
 * @returns Promise
 */

function runSkipping() {
  document.querySelector(".ytp-ad-skip-button")?.click();
  document.querySelector(".ytp-ad-skip-button-modern")?.click();
  document.querySelector(".ytp-ad-survey")?.click();
}

/**
 * @returns Promise
 */

function runRewind() {
  try {
    const videoPlayer = document.querySelector(".video-stream");
    videoPlayer.currentTime = videoPlayer.duration - 0.1;
    videoPlayer.paused && videoPlayer.play();
  } catch (e) {
    console.error(e);
  }
}

/**
 * @returns Promise
 */


async function injectMainScript() {
  const playerContainer = await waitForElement("#movie_player");
  const observer = new MutationObserver(() => {
    try {
      const isAd =
        playerContainer.classList.contains("ad-interrupting") ||
        playerContainer.classList.contains("ad-showing");
      const preText = document.querySelector(".video-ads");
      if (isAd && preText) {
        runSkipping();
        runRewind();
      }
    } catch (e) {
      console.error(e);
    }
  });

  observer.observe(playerContainer, {
    subtree: !0,
    childList: !0,
    attributes: !0,
  });

}

const waitForElement = async (selector) => {
  return new Promise((resolve) => {
    let observedElement = document.querySelector(selector);
    if (observedElement) return resolve(observedElement);

    let observer = new MutationObserver(() => {
      let observedElement = document.querySelector(selector);
      if (observedElement) {
        observer.disconnect();
        resolve(observedElement);
      }
    });

    observer.observe(document.documentElement, {
      childList: !0,
      subtree: !0,
    });
  });
};


