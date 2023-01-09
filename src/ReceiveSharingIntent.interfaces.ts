export interface IReceiveSharingIntent {
  getReceivedFiles(
    handler: () => SharedFile[],
    errorHandler: () => any,
    protocol: string
  ): void;
}

export interface IUtils {
  sortData(data: any): any;
}

export type SharedFile = {
  filePath?: string | null;
  text?: string | null;
  weblink?: string | null;
  mimeType?: string | null;
  contentUri?: string | null;
  fileName?: string | null;
  extension?: string | null;
};
