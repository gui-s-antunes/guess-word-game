/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/13_exercicio_video/exercicio.ts":
/*!*********************************************!*\
  !*** ./src/13_exercicio_video/exercicio.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VideoPlayer = void 0;
class VideoPlayer {
    constructor(videoPlayerElements) {
        this.videoPlayer = videoPlayerElements.videoPlayer;
        this.playButton = videoPlayerElements.playButton;
        this.stopButton = videoPlayerElements.stopButton;
    }
    playVideo() {
        console.log('play');
        if (this.videoPlayer.paused) {
            this.playButton.textContent = 'Pause';
            this.videoPlayer.play();
            return;
        }
        this.playButton.textContent = 'Play';
        this.videoPlayer.pause();
    }
    stopVideo() {
        if (!this.videoPlayer.paused)
            this.videoPlayer.pause();
        this.videoPlayer.currentTime = 0;
    }
    startEvents() {
        this.playButton.addEventListener('click', () => {
            this.playVideo();
        });
        this.stopButton.addEventListener('click', () => {
            this.stopVideo();
        });
    }
}
exports.VideoPlayer = VideoPlayer;
const videoPlayer = document.querySelector('.video');
const playButton = document.querySelector('.play');
const stopButton = document.querySelector('.stop');
const player = new VideoPlayer({ videoPlayer, playButton, stopButton });
player.startEvents();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*****************************************!*\
  !*** ./src/13_exercicio_video/index.ts ***!
  \*****************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
console.log('exercício de vídeo');
__webpack_require__(/*! ./exercicio */ "./src/13_exercicio_video/exercicio.ts");

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map