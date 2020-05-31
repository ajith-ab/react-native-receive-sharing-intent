import { NativeModules, Platform, Linking } from 'react-native';
import MimeTypes from "./mimeType.json";

const { ReceiveSharingIntent } = NativeModules;

const isIos = Platform.OS === 'ios';

export default class ReceiveSharingIntentModule {
    
    constructor(){
        this.url = "";
    }
    
    
    // static getFileNames = () =>  new Promise((resolve, reject) => {
    //     ReceiveSharingIntent.getFileNames().then(fileObject => {
    //         let files = Object.keys(fileObject).map((k) => fileObject[k])
    //         resolve(files);
    //     }).catch(e=>{
    //         reject(e);
    //     })
        
    // });
    
    static getSharedName = (handler) => {
        Linking.getInitialURL().then(res =>{
            if(res && res.url && res.url.startsWith("ShareMedia://dataUrl")){
                handler(res.url);
            }
        } ).catch(e=>{});
        Linking.addEventListener("url",(res)=>{
            console.log(res);
            let url = res ? res.url : "";
            if(url.startsWith("ShareMedia://dataUrl")){
                handler(res.url);
            }
        });
    }
    
    
    
    
    
    static getFileNamess = (url) => new Promise((resolve, reject)=>{
        if(isIos){
            ReceiveSharingIntent.getFileNames(url).then(data=>{
               let files = this.iosSortedData(data);
                resolve(files);
            }).catch(e=>reject(data));
          }else{
              reject("asda")
          } 
    });
    
 
    
    
    static clearFileNames = () => {
        ReceiveSharingIntent.clearFileNames();
    }
    
    
    
    iosSortedData = (data) => {
      let objects =   { filePath:null, text:null, weblink:null, mimeType: null, contentUri:null, fileName:null, extension:null };
        
      let file = data;
      if(file.startsWith('text:')){
          let text = file.replace("text:", "");
          let object = [
              { ...objects , text:text }
          ];
          return object;
      }else if(file.startsWith('webUrl:')){
        let weblink = file.replace("webUrl:", "");
        let object = [
            { ...objects , weblink:weblink }
        ];
        return object;
      }else{
        try {
            let files = JSON.parse(file)  
            let object = [];
            for (let i = 0; i < files.length; i++) {
                let singleFile = files[i];
                
                object.push(singleFile);
                
            }
            
            return object;
        } catch (error) {
            return "error";
        }  
      } 
    }
    
    
    
}