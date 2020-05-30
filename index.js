import { NativeModules, Platform } from 'react-native';

const { ReceiveSharingIntent } = NativeModules;

const isIos = Platform.OS === 'ios';

export default class ReceiveSharingIntentModule {
    
    
    static getFileNames = () =>  new Promise((resolve, reject) => {
        ReceiveSharingIntent.getFileNames().then(fileObject => {
            let files = Object.keys(fileObject).map((k) => fileObject[k])
            resolve(files);
        }).catch(e=>{
            reject(e);
        })
        
    });
    
    
    static clearFileNames = () => {
        ReceiveSharingIntent.clearFileNames();
    }
    
    
    
}