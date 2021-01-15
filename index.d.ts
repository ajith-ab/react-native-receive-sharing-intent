declare namespace ReceiveSharingIntent {
    export interface ShareIntentFile {
        filePath: string|null;
        text: string|null;
        weblink: string|null;
        mimeType: string|null;
        contentUri: string|null;
        fileName: string|null;
        extension: string|null;
    }
    
    export type ShareIntentResponse = ShareIntentFile[];

    export function getReceivedFiles(
        callback: (files: ShareIntentResponse) => void,
        errorHandler: (error: Error) => void,
        protocol?: string
    ): void;

    export function clearReceivedFiles(): void;
}

export = ReceiveSharingIntent;
