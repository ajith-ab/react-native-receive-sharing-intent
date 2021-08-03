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
        .then((data: string) => {
          const { media, text, urls } = JSON.parse(data) as {
            media: { path: string }[];
            text: string[];
            urls: string[];
          };
          handler([
            ...media.map((file: any) => ({
              filePath: file.path,
              fileName: this.utils.getFileName(file.path),
              extension: this.utils.getExtension(file.path),
              mimeType: this.utils.getMimeType(file.path),
              text: null,
              weblink: null,
              contentUri: null,
            })),
            ...text.map((t) => ({
              filePath: null,
              fileName: null,
              extension: null,
              mimeType: null,
              weblink: null,
              contentUri: null,
              text: t,
            })),
            ...urls.map((weblink) => ({
              filePath: null,
              fileName: null,
              extension: null,
              mimeType: null,
              weblink,
              contentUri: null,
              text: null,
            })),
          ]);
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
