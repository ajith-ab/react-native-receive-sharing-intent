
export interface IReceiveSharingIntent{
    getReceivedFiles(handler: Function , errorHandler: Function, protocol: string ): void,
    clearFileNames() :void,
}

export interface IUtils{
    sortData(data: any): any
}

export interface IReturnData{
    filePath?: any | string,
    text?: any | string,
    weblink?: any | string,
    mimeType?: any | string,
    contentUri?: any | string,
    fileName?: any | string, 
    extension?: any | string,
}
