import type {
  IReceiveSharingIntent,
  IUtils,
} from './ReceiveSharingIntent.interfaces';
import { Platform, Linking, AppState, NativeModules } from 'react-native';
import Utils from './utils';

const { ReceiveSharingIntent } = NativeModules;

class ReceiveSharingIntentModule implements IReceiveSharingIntent {
  private isIos: boolean = Platform.OS === 'ios';
  private utils: IUtils = new Utils();
  private isClear: boolean = false;

  getReceivedFiles(
    handler: Function,
    errorHandler: Function,
    protocol: string = 'ShareMedia'
  ) {
    if (this.isIos) {
      Linking.getInitialURL()
        .then((res: any) => {
          if (res && res.startsWith(`${protocol}://dataUrl`) && !this.isClear) {
            this.getFileNames(handler, errorHandler, res);
          }
        })
        .catch(() => {});
      Linking.addEventListener('url', (res: any) => {
        const url = res ? res.url : '';
        if (url.startsWith(`${protocol}://dataUrl`) && !this.isClear) {
          this.getFileNames(handler, errorHandler, res.url);
        }
      });
    } else {
      AppState.addEventListener('change', (status: string) => {
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

  protected getFileNames(
    handler: Function,
    errorHandler: Function,
    url: string
  ) {
    if (this.isIos) {
      ReceiveSharingIntent.getFileNames(url)
        .then((data: any) => {
          let files = this.utils.sortData(data);
          handler(files);
        })
        .catch((e: any) => errorHandler(e));
    } else {
      ReceiveSharingIntent.getFileNames()
        .then((fileObject: any) => {
          let files = Object.keys(fileObject).map((k) => fileObject[k]);
          handler(files);
        })
        .catch((e: any) => errorHandler(e));
    }
  }
}

export default ReceiveSharingIntentModule;
