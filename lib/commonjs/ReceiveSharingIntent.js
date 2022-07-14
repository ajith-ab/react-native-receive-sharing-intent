"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  ReceiveSharingIntent
} = _reactNative.NativeModules;

class ReceiveSharingIntentModule {
  constructor() {
    _defineProperty(this, "isIos", _reactNative.Platform.OS === "ios");

    _defineProperty(this, "utils", new _utils.default());

    _defineProperty(this, "isClear", false);

    _defineProperty(this, "processedIOSFiles", []);
  }

  getReceivedFiles(handler, errorHandler, protocol = "ShareMedia") {
    if (this.isIos) {
      _reactNative.Linking.getInitialURL().then(res => {
        if (res && res.startsWith(`${protocol}://dataUrl`) && !this.isClear) {
          this.getFileNames(handler, errorHandler, res);
        }
      }).catch(() => {});

      _reactNative.Linking.addEventListener("url", res => {
        const url = res ? res.url : "";

        if (url.startsWith(`${protocol}://dataUrl`) && !this.isClear) {
          this.getFileNames(handler, errorHandler, res.url);
        }
      });
    } else {
      _reactNative.AppState.addEventListener('change', status => {
        if (status === 'active' && !this.isClear) {
          this.getFileNames(handler, errorHandler, "");
        }
      });

      if (!this.isClear) this.getFileNames(handler, errorHandler, "");
    }
  }

  clearReceivedFiles() {
    // this.isClear = true;
    ReceiveSharingIntent.clearFileNames();
  }

  getFileNames(handler, errorHandler, url) {
    if (this.isIos) {
      ReceiveSharingIntent.getFileNames(url).then(data => {
        let files = this.utils.sortData(data); // ignore the files already shared/canceled
        // otherwise, 'getFileNames' method will be returning same data again and again

        const filesToShare = [];

        for (let file of files) {
          const fileName = file.fileName;

          if (!this.processedIOSFiles.includes(fileName)) {
            filesToShare.push(file);
          }

          this.processedIOSFiles.push(fileName);
        }

        console.log("[getFileNames]iOS ", {
          files,
          filesToShare,
          processedIOSFiles: this.processedIOSFiles
        });
        handler(filesToShare);
      }).catch(e => errorHandler(e));
    } else {
      ReceiveSharingIntent.getFileNames().then(fileObject => {
        let files = Object.keys(fileObject).map(k => fileObject[k]);
        handler(files);
      }).catch(e => errorHandler(e));
    }
  }

}

var _default = ReceiveSharingIntentModule;
exports.default = _default;
//# sourceMappingURL=ReceiveSharingIntent.js.map