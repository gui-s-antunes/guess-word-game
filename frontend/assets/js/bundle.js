/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/papaparse/papaparse.min.js":
/*!*************************************************!*\
  !*** ./node_modules/papaparse/papaparse.min.js ***!
  \*************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* @license
Papa Parse
v5.4.1
https://github.com/mholt/PapaParse
License: MIT
*/
!function(e,t){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):0}(this,function s(){"use strict";var f="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==f?f:{};var n=!f.document&&!!f.postMessage,o=f.IS_PAPA_WORKER||!1,a={},u=0,b={parse:function(e,t){var r=(t=t||{}).dynamicTyping||!1;J(r)&&(t.dynamicTypingFunction=r,r={});if(t.dynamicTyping=r,t.transform=!!J(t.transform)&&t.transform,t.worker&&b.WORKERS_SUPPORTED){var i=function(){if(!b.WORKERS_SUPPORTED)return!1;var e=(r=f.URL||f.webkitURL||null,i=s.toString(),b.BLOB_URL||(b.BLOB_URL=r.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",i,")();"],{type:"text/javascript"})))),t=new f.Worker(e);var r,i;return t.onmessage=_,t.id=u++,a[t.id]=t}();return i.userStep=t.step,i.userChunk=t.chunk,i.userComplete=t.complete,i.userError=t.error,t.step=J(t.step),t.chunk=J(t.chunk),t.complete=J(t.complete),t.error=J(t.error),delete t.worker,void i.postMessage({input:e,config:t,workerId:i.id})}var n=null;b.NODE_STREAM_INPUT,"string"==typeof e?(e=function(e){if(65279===e.charCodeAt(0))return e.slice(1);return e}(e),n=t.download?new l(t):new p(t)):!0===e.readable&&J(e.read)&&J(e.on)?n=new g(t):(f.File&&e instanceof File||e instanceof Object)&&(n=new c(t));return n.stream(e)},unparse:function(e,t){var n=!1,_=!0,m=",",y="\r\n",s='"',a=s+s,r=!1,i=null,o=!1;!function(){if("object"!=typeof t)return;"string"!=typeof t.delimiter||b.BAD_DELIMITERS.filter(function(e){return-1!==t.delimiter.indexOf(e)}).length||(m=t.delimiter);("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(n=t.quotes);"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(r=t.skipEmptyLines);"string"==typeof t.newline&&(y=t.newline);"string"==typeof t.quoteChar&&(s=t.quoteChar);"boolean"==typeof t.header&&(_=t.header);if(Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");i=t.columns}void 0!==t.escapeChar&&(a=t.escapeChar+s);("boolean"==typeof t.escapeFormulae||t.escapeFormulae instanceof RegExp)&&(o=t.escapeFormulae instanceof RegExp?t.escapeFormulae:/^[=+\-@\t\r].*$/)}();var u=new RegExp(Q(s),"g");"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return h(null,e,r);if("object"==typeof e[0])return h(i||Object.keys(e[0]),e,r)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||i),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),h(e.fields||[],e.data||[],r);throw new Error("Unable to serialize unrecognized input");function h(e,t,r){var i="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=Array.isArray(e)&&0<e.length,s=!Array.isArray(t[0]);if(n&&_){for(var a=0;a<e.length;a++)0<a&&(i+=m),i+=v(e[a],a);0<t.length&&(i+=y)}for(var o=0;o<t.length;o++){var u=n?e.length:t[o].length,h=!1,f=n?0===Object.keys(t[o]).length:0===t[o].length;if(r&&!n&&(h="greedy"===r?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===r&&n){for(var d=[],l=0;l<u;l++){var c=s?e[l]:l;d.push(t[o][c])}h=""===d.join("").trim()}if(!h){for(var p=0;p<u;p++){0<p&&!f&&(i+=m);var g=n&&s?e[p]:p;i+=v(t[o][g],p)}o<t.length-1&&(!r||0<u&&!f)&&(i+=y)}}return i}function v(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);var r=!1;o&&"string"==typeof e&&o.test(e)&&(e="'"+e,r=!0);var i=e.toString().replace(u,a);return(r=r||!0===n||"function"==typeof n&&n(e,t)||Array.isArray(n)&&n[t]||function(e,t){for(var r=0;r<t.length;r++)if(-1<e.indexOf(t[r]))return!0;return!1}(i,b.BAD_DELIMITERS)||-1<i.indexOf(m)||" "===i.charAt(0)||" "===i.charAt(i.length-1))?s+i+s:i}}};if(b.RECORD_SEP=String.fromCharCode(30),b.UNIT_SEP=String.fromCharCode(31),b.BYTE_ORDER_MARK="\ufeff",b.BAD_DELIMITERS=["\r","\n",'"',b.BYTE_ORDER_MARK],b.WORKERS_SUPPORTED=!n&&!!f.Worker,b.NODE_STREAM_INPUT=1,b.LocalChunkSize=10485760,b.RemoteChunkSize=5242880,b.DefaultDelimiter=",",b.Parser=E,b.ParserHandle=r,b.NetworkStreamer=l,b.FileStreamer=c,b.StringStreamer=p,b.ReadableStreamStreamer=g,f.jQuery){var d=f.jQuery;d.fn.parse=function(o){var r=o.config||{},u=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&f.FileReader)||!this.files||0===this.files.length)return!0;for(var t=0;t<this.files.length;t++)u.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},r)})}),e(),this;function e(){if(0!==u.length){var e,t,r,i,n=u[0];if(J(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,r=n.inputElem,i=s.reason,void(J(o.error)&&o.error({name:e},t,r,i));if("skip"===s.action)return void h();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config))}else if("skip"===s)return void h()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){J(a)&&a(e,n.file,n.inputElem),h()},b.parse(n.file,n.instanceConfig)}else J(o.complete)&&o.complete()}function h(){u.splice(0,1),e()}}}function h(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=w(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new r(t),(this._handle.streamer=this)._config=t}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&J(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(e);void 0!==r&&(e=r)}this.isFirstChunk=!1,this._halted=!1;var i=this._partialLine+e;this._partialLine="";var n=this._handle.parse(i,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=n.meta.cursor;this._finished||(this._partialLine=i.substring(s-this._baseIndex),this._baseIndex=s),n&&n.data&&(this._rowCount+=n.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(o)f.postMessage({results:n,workerId:b.WORKER_ID,finished:a});else if(J(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);n=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!J(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}this._halted=!0},this._sendError=function(e){J(this._config.error)?this._config.error(e):o&&this._config.error&&f.postMessage({workerId:b.WORKER_ID,error:e,finished:!1})}}function l(e){var i;(e=e||{}).chunkSize||(e.chunkSize=b.RemoteChunkSize),h.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(i=new XMLHttpRequest,this._config.withCredentials&&(i.withCredentials=this._config.withCredentials),n||(i.onload=v(this._chunkLoaded,this),i.onerror=v(this._chunkError,this)),i.open(this._config.downloadRequestBody?"POST":"GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var t in e)i.setRequestHeader(t,e[t])}if(this._config.chunkSize){var r=this._start+this._config.chunkSize-1;i.setRequestHeader("Range","bytes="+this._start+"-"+r)}try{i.send(this._config.downloadRequestBody)}catch(e){this._chunkError(e.message)}n&&0===i.status&&this._chunkError()}},this._chunkLoaded=function(){4===i.readyState&&(i.status<200||400<=i.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:i.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range");if(null===t)return-1;return parseInt(t.substring(t.lastIndexOf("/")+1))}(i),this.parseChunk(i.responseText)))},this._chunkError=function(e){var t=i.statusText||e;this._sendError(new Error(t))}}function c(e){var i,n;(e=e||{}).chunkSize||(e.chunkSize=b.LocalChunkSize),h.call(this,e);var s="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,s?((i=new FileReader).onload=v(this._chunkLoaded,this),i.onerror=v(this._chunkError,this)):i=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var t=Math.min(this._start+this._config.chunkSize,this._input.size);e=n.call(e,this._start,t)}var r=i.readAsText(e,this._config.encoding);s||this._chunkLoaded({target:{result:r}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(i.error)}}function p(e){var r;h.call(this,e=e||{}),this.stream=function(e){return r=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,t=this._config.chunkSize;return t?(e=r.substring(0,t),r=r.substring(t)):(e=r,r=""),this._finished=!r,this.parseChunk(e)}}}function g(e){h.call(this,e=e||{});var t=[],r=!0,i=!1;this.pause=function(){h.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){h.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){i&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):r=!0},this._streamData=v(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=v(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=v(function(){this._streamCleanUp(),i=!0,this._streamData("")},this),this._streamCleanUp=v(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function r(m){var a,o,u,i=Math.pow(2,53),n=-i,s=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,h=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,t=this,r=0,f=0,d=!1,e=!1,l=[],c={data:[],errors:[],meta:{}};if(J(m.step)){var p=m.step;m.step=function(e){if(c=e,_())g();else{if(g(),0===c.data.length)return;r+=e.data.length,m.preview&&r>m.preview?o.abort():(c.data=c.data[0],p(c,t))}}}function y(e){return"greedy"===m.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function g(){return c&&u&&(k("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+b.DefaultDelimiter+"'"),u=!1),m.skipEmptyLines&&(c.data=c.data.filter(function(e){return!y(e)})),_()&&function(){if(!c)return;function e(e,t){J(m.transformHeader)&&(e=m.transformHeader(e,t)),l.push(e)}if(Array.isArray(c.data[0])){for(var t=0;_()&&t<c.data.length;t++)c.data[t].forEach(e);c.data.splice(0,1)}else c.data.forEach(e)}(),function(){if(!c||!m.header&&!m.dynamicTyping&&!m.transform)return c;function e(e,t){var r,i=m.header?{}:[];for(r=0;r<e.length;r++){var n=r,s=e[r];m.header&&(n=r>=l.length?"__parsed_extra":l[r]),m.transform&&(s=m.transform(s,n)),s=v(n,s),"__parsed_extra"===n?(i[n]=i[n]||[],i[n].push(s)):i[n]=s}return m.header&&(r>l.length?k("FieldMismatch","TooManyFields","Too many fields: expected "+l.length+" fields but parsed "+r,f+t):r<l.length&&k("FieldMismatch","TooFewFields","Too few fields: expected "+l.length+" fields but parsed "+r,f+t)),i}var t=1;!c.data.length||Array.isArray(c.data[0])?(c.data=c.data.map(e),t=c.data.length):c.data=e(c.data,0);m.header&&c.meta&&(c.meta.fields=l);return f+=t,c}()}function _(){return m.header&&0===l.length}function v(e,t){return r=e,m.dynamicTypingFunction&&void 0===m.dynamicTyping[r]&&(m.dynamicTyping[r]=m.dynamicTypingFunction(r)),!0===(m.dynamicTyping[r]||m.dynamicTyping)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&(function(e){if(s.test(e)){var t=parseFloat(e);if(n<t&&t<i)return!0}return!1}(t)?parseFloat(t):h.test(t)?new Date(t):""===t?null:t):t;var r}function k(e,t,r,i){var n={type:e,code:t,message:r};void 0!==i&&(n.row=i),c.errors.push(n)}this.parse=function(e,t,r){var i=m.quoteChar||'"';if(m.newline||(m.newline=function(e,t){e=e.substring(0,1048576);var r=new RegExp(Q(t)+"([^]*?)"+Q(t),"gm"),i=(e=e.replace(r,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<i[0].length;if(1===i.length||s)return"\n";for(var a=0,o=0;o<i.length;o++)"\n"===i[o][0]&&a++;return a>=i.length/2?"\r\n":"\r"}(e,i)),u=!1,m.delimiter)J(m.delimiter)&&(m.delimiter=m.delimiter(e),c.meta.delimiter=m.delimiter);else{var n=function(e,t,r,i,n){var s,a,o,u;n=n||[",","\t","|",";",b.RECORD_SEP,b.UNIT_SEP];for(var h=0;h<n.length;h++){var f=n[h],d=0,l=0,c=0;o=void 0;for(var p=new E({comments:i,delimiter:f,newline:t,preview:10}).parse(e),g=0;g<p.data.length;g++)if(r&&y(p.data[g]))c++;else{var _=p.data[g].length;l+=_,void 0!==o?0<_&&(d+=Math.abs(_-o),o=_):o=_}0<p.data.length&&(l/=p.data.length-c),(void 0===a||d<=a)&&(void 0===u||u<l)&&1.99<l&&(a=d,s=f,u=l)}return{successful:!!(m.delimiter=s),bestDelimiter:s}}(e,m.newline,m.skipEmptyLines,m.comments,m.delimitersToGuess);n.successful?m.delimiter=n.bestDelimiter:(u=!0,m.delimiter=b.DefaultDelimiter),c.meta.delimiter=m.delimiter}var s=w(m);return m.preview&&m.header&&s.preview++,a=e,o=new E(s),c=o.parse(a,t,r),g(),d?{meta:{paused:!0}}:c||{meta:{paused:!1}}},this.paused=function(){return d},this.pause=function(){d=!0,o.abort(),a=J(m.chunk)?"":a.substring(o.getCharIndex())},this.resume=function(){t.streamer._halted?(d=!1,t.streamer.parseChunk(a,!0)):setTimeout(t.resume,3)},this.aborted=function(){return e},this.abort=function(){e=!0,o.abort(),c.meta.aborted=!0,J(m.complete)&&m.complete(c),a=""}}function Q(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function E(j){var z,M=(j=j||{}).delimiter,P=j.newline,U=j.comments,q=j.step,N=j.preview,B=j.fastMode,K=z=void 0===j.quoteChar||null===j.quoteChar?'"':j.quoteChar;if(void 0!==j.escapeChar&&(K=j.escapeChar),("string"!=typeof M||-1<b.BAD_DELIMITERS.indexOf(M))&&(M=","),U===M)throw new Error("Comment character same as delimiter");!0===U?U="#":("string"!=typeof U||-1<b.BAD_DELIMITERS.indexOf(U))&&(U=!1),"\n"!==P&&"\r"!==P&&"\r\n"!==P&&(P="\n");var W=0,H=!1;this.parse=function(i,t,r){if("string"!=typeof i)throw new Error("Input must be a string");var n=i.length,e=M.length,s=P.length,a=U.length,o=J(q),u=[],h=[],f=[],d=W=0;if(!i)return L();if(j.header&&!t){var l=i.split(P)[0].split(M),c=[],p={},g=!1;for(var _ in l){var m=l[_];J(j.transformHeader)&&(m=j.transformHeader(m,_));var y=m,v=p[m]||0;for(0<v&&(g=!0,y=m+"_"+v),p[m]=v+1;c.includes(y);)y=y+"_"+v;c.push(y)}if(g){var k=i.split(P);k[0]=c.join(M),i=k.join(P)}}if(B||!1!==B&&-1===i.indexOf(z)){for(var b=i.split(P),E=0;E<b.length;E++){if(f=b[E],W+=f.length,E!==b.length-1)W+=P.length;else if(r)return L();if(!U||f.substring(0,a)!==U){if(o){if(u=[],I(f.split(M)),F(),H)return L()}else I(f.split(M));if(N&&N<=E)return u=u.slice(0,N),L(!0)}}return L()}for(var w=i.indexOf(M,W),R=i.indexOf(P,W),C=new RegExp(Q(K)+Q(z),"g"),S=i.indexOf(z,W);;)if(i[W]!==z)if(U&&0===f.length&&i.substring(W,W+a)===U){if(-1===R)return L();W=R+s,R=i.indexOf(P,W),w=i.indexOf(M,W)}else if(-1!==w&&(w<R||-1===R))f.push(i.substring(W,w)),W=w+e,w=i.indexOf(M,W);else{if(-1===R)break;if(f.push(i.substring(W,R)),D(R+s),o&&(F(),H))return L();if(N&&u.length>=N)return L(!0)}else for(S=W,W++;;){if(-1===(S=i.indexOf(z,S+1)))return r||h.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:u.length,index:W}),T();if(S===n-1)return T(i.substring(W,S).replace(C,z));if(z!==K||i[S+1]!==K){if(z===K||0===S||i[S-1]!==K){-1!==w&&w<S+1&&(w=i.indexOf(M,S+1)),-1!==R&&R<S+1&&(R=i.indexOf(P,S+1));var O=A(-1===R?w:Math.min(w,R));if(i.substr(S+1+O,e)===M){f.push(i.substring(W,S).replace(C,z)),i[W=S+1+O+e]!==z&&(S=i.indexOf(z,W)),w=i.indexOf(M,W),R=i.indexOf(P,W);break}var x=A(R);if(i.substring(S+1+x,S+1+x+s)===P){if(f.push(i.substring(W,S).replace(C,z)),D(S+1+x+s),w=i.indexOf(M,W),S=i.indexOf(z,W),o&&(F(),H))return L();if(N&&u.length>=N)return L(!0);break}h.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:u.length,index:W}),S++}}else S++}return T();function I(e){u.push(e),d=W}function A(e){var t=0;if(-1!==e){var r=i.substring(S+1,e);r&&""===r.trim()&&(t=r.length)}return t}function T(e){return r||(void 0===e&&(e=i.substring(W)),f.push(e),W=n,I(f),o&&F()),L()}function D(e){W=e,I(f),f=[],R=i.indexOf(P,W)}function L(e){return{data:u,errors:h,meta:{delimiter:M,linebreak:P,aborted:H,truncated:!!e,cursor:d+(t||0)}}}function F(){q(L()),u=[],h=[]}},this.abort=function(){H=!0},this.getCharIndex=function(){return W}}function _(e){var t=e.data,r=a[t.workerId],i=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){i=!0,m(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:y,resume:y};if(J(r.userStep)){for(var s=0;s<t.results.data.length&&(r.userStep({data:t.results.data[s],errors:t.results.errors,meta:t.results.meta},n),!i);s++);delete t.results}else J(r.userChunk)&&(r.userChunk(t.results,n,t.file),delete t.results)}t.finished&&!i&&m(t.workerId,t.results)}function m(e,t){var r=a[e];J(r.userComplete)&&r.userComplete(t),r.terminate(),delete a[e]}function y(){throw new Error("Not implemented.")}function w(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var r in e)t[r]=w(e[r]);return t}function v(e,t){return function(){e.apply(t,arguments)}}function J(e){return"function"==typeof e}return o&&(f.onmessage=function(e){var t=e.data;void 0===b.WORKER_ID&&t&&(b.WORKER_ID=t.workerId);if("string"==typeof t.input)f.postMessage({workerId:b.WORKER_ID,results:b.parse(t.input,t.config),finished:!0});else if(f.File&&t.input instanceof File||t.input instanceof Object){var r=b.parse(t.input,t.config);r&&f.postMessage({workerId:b.WORKER_ID,results:r,finished:!0})}}),(l.prototype=Object.create(h.prototype)).constructor=l,(c.prototype=Object.create(h.prototype)).constructor=c,(p.prototype=Object.create(p.prototype)).constructor=p,(g.prototype=Object.create(h.prototype)).constructor=g,b});

/***/ }),

/***/ "./src/classes/game.ts":
/*!*****************************!*\
  !*** ./src/classes/game.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _utils_getCells__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getCells */ "./src/utils/getCells.ts");
/* harmony import */ var _utils_callClassMethod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/callClassMethod */ "./src/utils/callClassMethod.ts");


class Game {
    _tables;
    dbWords;
    dbWordsWithoutAccent;
    selectedWords;
    selectedWordsWithoutAccent;
    numOfGames;
    _isRunning = false;
    _guessedLetters = [];
    _rowPosition = 0;
    constructor(_tables, dbWords, dbWordsWithoutAccent, selectedWords, selectedWordsWithoutAccent, numOfGames) {
        this._tables = _tables;
        this.dbWords = dbWords;
        this.dbWordsWithoutAccent = dbWordsWithoutAccent;
        this.selectedWords = selectedWords;
        this.selectedWordsWithoutAccent = selectedWordsWithoutAccent;
        this.numOfGames = numOfGames;
    }
    get isRunning() {
        return this._isRunning;
    }
    set isRunning(flag) {
        this._isRunning = flag;
    }
    setGuessedLetters(letter, pos) {
        const actualLetters = [...this.guessedLetters];
        actualLetters[pos] = letter;
        this._guessedLetters = actualLetters;
    }
    get guessedLetters() {
        return this._guessedLetters;
    }
    setRowPos() {
        this._rowPosition++;
    }
    get rowPosition() {
        return this._rowPosition;
    }
    get tables() {
        return this._tables;
    }
    // restart page with a new number of games set
    newGame(newNumOfGames) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        urlParams.set('games', newNumOfGames);
        let thisURL = window.location.href;
        const paramsIndex = thisURL.indexOf('?');
        if (paramsIndex !== -1) {
            thisURL = thisURL.split('').slice(0, paramsIndex).join('');
        }
        return window.location.replace(thisURL + '?' + urlParams);
    }
    addLetterToBlock(letter) {
        // adicionar letra
    }
    gameAction(key) {
        if (key === 'ArrowLeft')
            return this.processTablesAction('blockToLeft');
        if (key === 'ArrowRight')
            return this.processTablesAction('blockToRight');
        if (key === 'Backspace')
            return this.processTablesAction('clearBlock');
        if (key === 'Enter')
            return this.enterAction();
    }
    enterAction() {
        if (!this.isBlocksFulfilled() || !this.isGuessedWordValid())
            return;
        this.processTablesAction('submitGuess');
    }
    processTablesAction(methodToCall) {
        for (let i = 0; i < this.tables.length; i++) {
            if (this.tables[i].isCleared)
                continue;
            const cells = (0,_utils_getCells__WEBPACK_IMPORTED_MODULE_0__.getCells)(this, this.tables[i].tableHTML);
            (0,_utils_callClassMethod__WEBPACK_IMPORTED_MODULE_1__.callClassMethod)(this.tables[i], methodToCall, cells);
        }
    }
    isBlocksFulfilled() {
        for (let i = 0; i < this.tables[0].numCells; i++) {
            if (!this.guessedLetters[i])
                return false;
        }
    }
    isGuessedWordValid() {
        const guessedWord = this.guessedLetters.join('');
        if (!this.dbWordsWithoutAccent.words.includes(guessedWord))
            return false;
    }
}


/***/ }),

/***/ "./src/classes/keyboard.ts":
/*!*********************************!*\
  !*** ./src/classes/keyboard.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Keyboard": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var _utils_isKeyALetter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/isKeyALetter */ "./src/utils/isKeyALetter.ts");

class Keyboard {
    $keyboardContainer;
    game;
    constructor($keyboardContainer, game) {
        this.$keyboardContainer = $keyboardContainer;
        this.game = game;
        this.$keyboardContainer.addEventListener('click', this.isButton.bind(this));
        document.addEventListener('keydown', this.keyPressed.bind(this));
    }
    isButton(e) {
        if (!e.target)
            return;
        const { target } = e;
        if (target.nodeName !== 'BUTTON')
            return;
        const btnValue = target.textContent?.toLowerCase();
        if (!btnValue)
            return;
        this.isLetterOrSpecialKey(btnValue);
    }
    keyPressed(e) {
        this.isLetterOrSpecialKey(e.key);
    }
    // keyboard letter ou a special key like enter or backspace
    isLetterOrSpecialKey(key) {
        if (!this.game.isRunning)
            return;
        if (key.length === 1) {
            if ((0,_utils_isKeyALetter__WEBPACK_IMPORTED_MODULE_0__.isKeyALetter)(key)) {
                this.game.addLetterToBlock(key);
                return;
            }
        }
        this.game.gameAction(key);
    }
}


/***/ }),

/***/ "./src/classes/menu.ts":
/*!*****************************!*\
  !*** ./src/classes/menu.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Menu": () => (/* binding */ Menu)
/* harmony export */ });
// VAI TER:
// o container menu
// o h1
// o p
// os botões do menu
// o p das palavras
class Menu {
    game;
    _menuContainer;
    constructor(game, _menuContainer) {
        this.game = game;
        this._menuContainer = _menuContainer;
        this._menuContainer.addEventListener('click', this.isButton.bind(this));
    }
    isButton(e) {
        console.log('isButton');
        if (!e.target)
            return;
        const { target } = e;
        if (target.nodeName !== 'BUTTON')
            return;
        const numOfGames = target.getAttribute('value');
        if (numOfGames === null)
            return;
        if (Number(numOfGames) > 1) {
            this.game.newGame(numOfGames);
        }
        else {
            this.hiddenMenu();
        }
    }
    hiddenMenu() {
        console.log('hiddenMenu');
        this._menuContainer.style.display = 'none';
    }
    showMenu() {
        console.log('showMenu');
        this._menuContainer.style.display = 'flex';
    }
}


/***/ }),

/***/ "./src/classes/table.ts":
/*!******************************!*\
  !*** ./src/classes/table.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Table": () => (/* binding */ Table)
/* harmony export */ });
class Table {
    _tableHTML;
    _numRows;
    _numCells;
    _cellPosition = 0;
    _rowPosition = 0;
    _isCleared = false;
    game = null;
    constructor(_tableHTML, // private readonly _selectedWord: string,
    _numRows, _numCells) {
        this._tableHTML = _tableHTML;
        this._numRows = _numRows;
        this._numCells = _numCells;
    }
    get tableHTML() {
        return this._tableHTML;
    }
    get numRows() {
        return this._numRows;
    }
    get numCells() {
        return this._numCells;
    }
    // get selectedWord() {
    //   return this._selectedWord;
    // }
    get isCleared() {
        return this._isCleared;
    }
    set isCleared(isCleared) {
        this._isCleared = isCleared;
    }
    set cellPosition(cellPosition) {
        this._cellPosition = cellPosition;
    }
    get cellPosition() {
        return this._cellPosition;
    }
    set rowPosition(rowPosition) {
        this._rowPosition = rowPosition;
    }
    get rowPosition() {
        return this._rowPosition;
    }
    submitGuess(cells) {
        console.log('submitGuess');
    }
    blockToLeft(cells) {
        if (this.cellPosition > 0) {
            cells[this.cellPosition].removeAttribute('class');
            cells[this.cellPosition - 1].setAttribute('class', 'selectedPosition');
            this.cellPosition--;
        }
    }
    blockToRight(cells) {
        console.log(cells);
        if (this.cellPosition < cells.length - 1) {
            cells[this.cellPosition].removeAttribute('class');
            cells[this.cellPosition + 1].setAttribute('class', 'selectedPosition');
            this.cellPosition++;
        }
    }
    clearBlock(cells) {
        if (cells[this.cellPosition].textContent === '')
            return this.blockToLeft(cells);
        cells[this.cellPosition].textContent = '';
        if (this.game)
            this.game.guessedLetters[this.cellPosition] = '';
    }
}


/***/ }),

/***/ "./src/classes/words.ts":
/*!******************************!*\
  !*** ./src/classes/words.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Words": () => (/* binding */ Words)
/* harmony export */ });
class Words {
    _words;
    constructor(_words) {
        this._words = _words;
    }
    get words() {
        return this._words;
    }
}


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_getWords__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getWords */ "./src/utils/getWords.ts");
/* harmony import */ var _utils_getNumOfGames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getNumOfGames */ "./src/utils/getNumOfGames.ts");
/* harmony import */ var _utils_generateTables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/generateTables */ "./src/utils/generateTables.ts");
/* harmony import */ var _services_htmlGameDiv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/htmlGameDiv */ "./src/services/htmlGameDiv.ts");
/* harmony import */ var _utils_getTables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/getTables */ "./src/utils/getTables.ts");
/* harmony import */ var _utils_selectWords__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/selectWords */ "./src/utils/selectWords.ts");
/* harmony import */ var _utils_removeAccents__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/removeAccents */ "./src/utils/removeAccents.ts");
/* harmony import */ var _services_htmlMenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/htmlMenu */ "./src/services/htmlMenu.ts");
/* harmony import */ var _services_htmlVirtualKeyboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/htmlVirtualKeyboard */ "./src/services/htmlVirtualKeyboard.ts");
/* harmony import */ var _classes_game__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./classes/game */ "./src/classes/game.ts");
/* harmony import */ var _classes_menu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./classes/menu */ "./src/classes/menu.ts");
/* harmony import */ var _classes_words__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./classes/words */ "./src/classes/words.ts");
/* harmony import */ var _classes_keyboard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./classes/keyboard */ "./src/classes/keyboard.ts");













const wordsFilePath = './assets/files/profiles2.csv';
const listOfWordsFromFile = await (0,_utils_getWords__WEBPACK_IMPORTED_MODULE_0__.getWords)(wordsFilePath);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const numOfGames = (0,_utils_getNumOfGames__WEBPACK_IMPORTED_MODULE_1__.getNumOfGames)(urlParams);
const numRows = numOfGames + 5;
const numCells = 5;
(0,_utils_generateTables__WEBPACK_IMPORTED_MODULE_2__.generateTables)(_services_htmlGameDiv__WEBPACK_IMPORTED_MODULE_3__.$game, numOfGames, numOfGames + 5, numCells);
const tables = (0,_utils_getTables__WEBPACK_IMPORTED_MODULE_4__.getTables)(numRows, numCells);
const dbWords = new _classes_words__WEBPACK_IMPORTED_MODULE_11__.Words(listOfWordsFromFile);
const dbWordsWithoutAccent = new _classes_words__WEBPACK_IMPORTED_MODULE_11__.Words([...(0,_utils_removeAccents__WEBPACK_IMPORTED_MODULE_6__.removeAccents)(dbWords.words)]);
const selectedWords = new _classes_words__WEBPACK_IMPORTED_MODULE_11__.Words((0,_utils_selectWords__WEBPACK_IMPORTED_MODULE_5__.selectWords)(listOfWordsFromFile, numOfGames));
const selectedWordsWithoutAccent = new _classes_words__WEBPACK_IMPORTED_MODULE_11__.Words([
    ...(0,_utils_removeAccents__WEBPACK_IMPORTED_MODULE_6__.removeAccents)(selectedWords.words),
]);
const game = new _classes_game__WEBPACK_IMPORTED_MODULE_9__.Game(tables, dbWords, dbWordsWithoutAccent, selectedWords, selectedWordsWithoutAccent, numOfGames);
const menu = new _classes_menu__WEBPACK_IMPORTED_MODULE_10__.Menu(game, _services_htmlMenu__WEBPACK_IMPORTED_MODULE_7__.$menu);
const keyboard = new _classes_keyboard__WEBPACK_IMPORTED_MODULE_12__.Keyboard(_services_htmlVirtualKeyboard__WEBPACK_IMPORTED_MODULE_8__.$keyboardContainer, game);
game.isRunning = true;

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./src/services/htmlGameDiv.ts":
/*!*************************************!*\
  !*** ./src/services/htmlGameDiv.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$game": () => (/* binding */ $game)
/* harmony export */ });
const $game = document.querySelector('.game');


/***/ }),

/***/ "./src/services/htmlMenu.ts":
/*!**********************************!*\
  !*** ./src/services/htmlMenu.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$menu": () => (/* binding */ $menu),
/* harmony export */   "$menuButtons": () => (/* binding */ $menuButtons),
/* harmony export */   "$menuDescription": () => (/* binding */ $menuDescription),
/* harmony export */   "$menuGameWords": () => (/* binding */ $menuGameWords),
/* harmony export */   "$menuTitle": () => (/* binding */ $menuTitle)
/* harmony export */ });
const $menu = document.querySelector('.menu');
const $menuButtons = $menu.getElementsByTagName('button');
const $menuTitle = $menu.querySelector('#title-menu');
const $menuDescription = $menu.querySelector('#description-menu');
const $menuGameWords = $menu.querySelector('#menu-game-words');


/***/ }),

/***/ "./src/services/htmlVirtualKeyboard.ts":
/*!*********************************************!*\
  !*** ./src/services/htmlVirtualKeyboard.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$keyboardButtons": () => (/* binding */ $keyboardButtons),
/* harmony export */   "$keyboardContainer": () => (/* binding */ $keyboardContainer)
/* harmony export */ });
const $keyboardContainer = document.querySelector('#keyboard');
const $keyboardButtons = document.getElementsByClassName('keyboard-btn');


/***/ }),

/***/ "./src/utils/callClassMethod.ts":
/*!**************************************!*\
  !*** ./src/utils/callClassMethod.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "callClassMethod": () => (/* binding */ callClassMethod)
/* harmony export */ });
function callClassMethod(obj, objMethod, ...params) {
    obj[objMethod](...params);
}


/***/ }),

/***/ "./src/utils/generateTables.ts":
/*!*************************************!*\
  !*** ./src/utils/generateTables.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateTables": () => (/* binding */ generateTables)
/* harmony export */ });
/* harmony import */ var _generateWordBlocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generateWordBlocks */ "./src/utils/generateWordBlocks.ts");

function generateTables($game, numOfTables, rows, cells) {
    for (let i = 0; i < numOfTables; i++) {
        const tbl = document.createElement('table');
        tbl.setAttribute('class', 'word');
        (0,_generateWordBlocks__WEBPACK_IMPORTED_MODULE_0__.generateWordBlocks)(tbl, true, rows, cells);
        $game.appendChild(tbl);
    }
}


/***/ }),

/***/ "./src/utils/generateWordBlocks.ts":
/*!*****************************************!*\
  !*** ./src/utils/generateWordBlocks.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateWordBlocks": () => (/* binding */ generateWordBlocks)
/* harmony export */ });
function generateWordBlocks(table, newTable, rows, cells) {
    for (let i = 0; i < (rows || 6); i++) {
        const tr = table.insertRow();
        if (i === 0 && newTable)
            tr.setAttribute('class', 'usedRow');
        for (let j = 0; j < (cells || 5); j++) {
            const td = tr.insertCell();
            // const text = document.createTextNode(`Cell I${i}/J${j}`); // texto a ser inserido na célula
            // td.appendChild(text); // texto na célula inserido
            // td.style.border = '1px solid black';
            if (j === 0 && i === 0 && newTable) {
                td.setAttribute('class', 'selectedPosition');
            }
        }
    }
}


/***/ }),

/***/ "./src/utils/getCells.ts":
/*!*******************************!*\
  !*** ./src/utils/getCells.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCells": () => (/* binding */ getCells)
/* harmony export */ });
function getCells(game, $word) {
    const rows = $word.getElementsByTagName('tr');
    const cells = rows[game.rowPosition].getElementsByTagName('td');
    return cells;
}


/***/ }),

/***/ "./src/utils/getNumOfGames.ts":
/*!************************************!*\
  !*** ./src/utils/getNumOfGames.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getNumOfGames": () => (/* binding */ getNumOfGames)
/* harmony export */ });
function getNumOfGames(urlParams) {
    if (urlParams.get('games') === '2')
        return 2;
    if (urlParams.get('games') === '4')
        return 4;
    return 1;
}


/***/ }),

/***/ "./src/utils/getTables.ts":
/*!********************************!*\
  !*** ./src/utils/getTables.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTables": () => (/* binding */ getTables)
/* harmony export */ });
/* harmony import */ var _classes_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/table */ "./src/classes/table.ts");

function getTables(numRows, numCells) {
    // return document.getElementsByClassName(
    //   'word',
    // ) as HTMLCollectionOf<HTMLTableElement>;
    const tables = document.getElementsByClassName('word');
    const tablesInstanceList = [];
    for (let i = 0; i < tables.length; i++) {
        const tableInstance = new _classes_table__WEBPACK_IMPORTED_MODULE_0__.Table(tables[i], numRows, numCells);
        tablesInstanceList.push(tableInstance);
    }
    return tablesInstanceList;
}


/***/ }),

/***/ "./src/utils/getWords.ts":
/*!*******************************!*\
  !*** ./src/utils/getWords.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWords": () => (/* binding */ getWords)
/* harmony export */ });
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! papaparse */ "./node_modules/papaparse/papaparse.min.js");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_0__);

// export interface ParsedData {
//   palavra: string;
//   tf: number;
//   dicts: number;
//   corpus: number;
//   title: number;
//   dmap: string;
// }
async function getData(filePath) {
    return new Promise((resolve) => {
        papaparse__WEBPACK_IMPORTED_MODULE_0___default().parse(filePath, {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function (results) {
                // console.log(results);
                resolve(results.data);
            },
        });
    });
}
// const result = await getData(csvFilePath);
const getWords = async (csvFilePath) => {
    const parsedData = await getData(csvFilePath);
    console.log('passou');
    console.log('parsedData: ', parsedData);
    // console.log(parsedData[0].tf);
    let contador = 0;
    const dbWords = [];
    // let palavraTamanho = '1';
    for (let i = 0; i < parsedData.length; i++) {
        if (parsedData[i].tf >= 20000 && parsedData[i].palavra.length == 5) {
            // console.log('tamanho da palavra fora: ', parsedData[i].palavra.length);
            // if (parsedData[i].palavra.length <= 6) {
            //   palavraTamanho = parsedData[i].palavra.length.toString();
            //   // console.log('tamanho da palavra: ', palavraTamanho);
            //   palavras[palavraTamanho]++;
            // }
            dbWords.push(parsedData[i].palavra);
            contador++;
        }
    }
    // console.log('tipo: ', typeof parsedData[0].palavra.length);
    console.log('Número de palavras com tf a partir de 500k: ', contador);
    // console.log(palavras);
    return dbWords;
};


/***/ }),

/***/ "./src/utils/isKeyALetter.ts":
/*!***********************************!*\
  !*** ./src/utils/isKeyALetter.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isKeyALetter": () => (/* binding */ isKeyALetter)
/* harmony export */ });
function isKeyALetter(key) {
    return key.match(/[a-z]/i);
}


/***/ }),

/***/ "./src/utils/randomNum.ts":
/*!********************************!*\
  !*** ./src/utils/randomNum.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomNumber": () => (/* binding */ getRandomNumber)
/* harmony export */ });
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


/***/ }),

/***/ "./src/utils/removeAccents.ts":
/*!************************************!*\
  !*** ./src/utils/removeAccents.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeAccents": () => (/* binding */ removeAccents)
/* harmony export */ });
const accents = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ú: 'u',
    â: 'a',
    ê: 'e',
    ô: 'o',
    ã: 'a',
    õ: 'o',
    à: 'a',
    ç: 'c',
};
function removeAccents(words) {
    const wordsWithoutAccent = [];
    for (let i = 0; i < words.length; i++) {
        const wordChars = [...words[i]];
        for (let j = 0; j < words[i].length; j++) {
            const accent = accents[wordChars[j]];
            if (accent)
                wordChars[j] = accent;
        }
        wordsWithoutAccent.push(wordChars.join(''));
    }
    return wordsWithoutAccent;
}


/***/ }),

/***/ "./src/utils/selectWords.ts":
/*!**********************************!*\
  !*** ./src/utils/selectWords.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "selectWords": () => (/* binding */ selectWords)
/* harmony export */ });
/* harmony import */ var _randomNum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./randomNum */ "./src/utils/randomNum.ts");

function selectWords(words, numOfWordsToSelect) {
    const selectedWords = [];
    const numOfWords = words.length;
    const addedWords = new Set();
    for (let i = 0; i < (numOfWordsToSelect || 1); i++) {
        let newWord = words[(0,_randomNum__WEBPACK_IMPORTED_MODULE_0__.getRandomNumber)(0, numOfWords)];
        while (addedWords.has(newWord)) {
            newWord = words[(0,_randomNum__WEBPACK_IMPORTED_MODULE_0__.getRandomNumber)(0, numOfWords)];
        }
        addedWords.add(newWord);
        selectedWords.push(newWord);
    }
    return selectedWords;
}


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			if(queue) queue.moduleId = module.id;
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			promise.moduleId = module.id;
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map