import type { IReturnData, IUtils } from './ReceiveSharingIntent.interfaces';
declare class Utils implements IUtils {
    sortData(data: any): Array<IReturnData>;
    getFileName: (file: string) => string;
    getExtension: (fileName: string) => string;
    getMimeType: (file: string) => string;
}
export default Utils;
