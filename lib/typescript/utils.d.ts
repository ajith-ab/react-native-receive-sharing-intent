import type { SharedFile, IUtils } from './ReceiveSharingIntent.interfaces';
declare class Utils implements IUtils {
  sortData(data: any): Array<SharedFile>;
  getFileName: (file: string) => string;
  getExtension: (fileName: string) => string;
  getMimeType: (file: string) => string;
}
export default Utils;
