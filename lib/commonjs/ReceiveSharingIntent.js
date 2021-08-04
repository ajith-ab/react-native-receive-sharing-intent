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
    _defineProperty(this, "isIos", _reactNative.Platform.OS === 'ios');

    _defineProperty(this, "utils", new _utils.default());

    _defineProperty(this, "isClear", false);
  }

  getReceivedFiles(handler, errorHandler, protocol = 'ShareMedia') {
    if (this.isIos) {
      _reactNative.Linking.getInitialURL().then(res => {
        if (res && res.startsWith(`${protocol}://dataUrl`) && !this.isClear) {
          this.getFileNames(handler, errorHandler, res);
        }
      }).catch(() => {});

      _reactNative.Linking.addEventListener('url', res => {
        const url = res ? res.url : '';

        if (url.startsWith(`${protocol}://dataUrl`) && !this.isClear) {
          this.getFileNames(handler, errorHandler, res.url);
        }
      });
    } else {
      _reactNative.AppState.addEventListener('change', status => {
        if (status === 'active' && !this.isClear) {
          this.getFileNames(handler, errorHandler, '');
        }
      });

      if (!this.isClear) this.getFileNames(handler, errorHandler, '');
    }
  }

  clearReceivedFiles() {
    this.isClear = true;
  }

  getFileNames(handler, errorHandler, url) {
    if (this.isIos) {
      ReceiveSharingIntent.getFileNames(url).then(data => {
        const {
          media,
          text,
          urls
        } = JSON.parse(data);
        handler([...media.map(file => ({
          filePath: file.path,
          fileName: this.utils.getFileName(file.path),
          extension: this.utils.getExtension(file.path),
          mimeType: this.utils.getMimeType(file.path),
          text: null,
          weblink: null,
          contentUri: null
        })), ...text.map(t => ({
          filePath: null,
          fileName: null,
          extension: null,
          mimeType: null,
          weblink: null,
          contentUri: null,
          text: t
        })), ...urls.map(weblink => ({
          filePath: null,
          fileName: null,
          extension: null,
          mimeType: null,
          weblink,
          contentUri: null,
          text: null
        }))]);
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