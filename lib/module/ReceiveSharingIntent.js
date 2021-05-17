function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Platform, Linking, AppState, NativeModules } from "react-native";
import Utils from "./utils";
const {
  ReceiveSharingIntent
} = NativeModules;

class ReceiveSharingIntentModule {
  constructor() {
    _defineProperty(this, "isIos", Platform.OS === "ios");

    _defineProperty(this, "utils", new Utils());

    _defineProperty(this, "isClear", false);
  }

  getReceivedFiles(handler, errorHandler, protocol = "ShareMedia") {
    if (this.isIos) {
      Linking.getInitialURL().then(res => {
        if (res && res.startsWith(`${protocol}://dataUrl`) && !this.isClear) {
          this.getFileNames(handler, errorHandler, res);
        }
      }).catch(() => {});
      Linking.addEventListener("url", res => {
        const url = res ? res.url : "";

        if (url.startsWith(`${protocol}://dataUrl`) && !this.isClear) {
          this.getFileNames(handler, errorHandler, res.url);
        }
      });
    } else {
      AppState.addEventListener('change', status => {
        if (status === 'active' && !this.isClear) {
          this.getFileNames(handler, errorHandler, "");
        }
      });
      if (!this.isClear) this.getFileNames(handler, errorHandler, "");
    }
  }

  clearReceivedFiles() {
    this.isClear = true;
  }

  getFileNames(handler, errorHandler, url) {
    if (this.isIos) {
      ReceiveSharingIntent.getFileNames(url).then(data => {
        let files = this.utils.sortData(data);
        handler(files);
      }).catch(e => errorHandler(e));
    } else {
      ReceiveSharingIntent.getFileNames().then(fileObject => {
        let files = Object.keys(fileObject).map(k => fileObject[k]);
        handler(files);
      }).catch(e => errorHandler(e));
    }
  }

}

export default ReceiveSharingIntentModule;
//# sourceMappingURL=ReceiveSharingIntent.js.map