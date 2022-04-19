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

    _defineProperty(this, "processedIOSFiles", []);
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

export default ReceiveSharingIntentModule;
//# sourceMappingURL=ReceiveSharingIntent.js.map