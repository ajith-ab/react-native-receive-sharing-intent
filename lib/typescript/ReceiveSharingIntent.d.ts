import type { IReceiveSharingIntent } from "./ReceiveSharingIntent.interfaces";
declare class ReceiveSharingIntentModule implements IReceiveSharingIntent {
    private isIos;
    private utils;
    getReceivedFiles(handler: Function, errorHandler: Function, protocol?: string): void;
    protected getFileNames(handler: Function, errorHandler: Function, url: string): void;
}
export default ReceiveSharingIntentModule;
