package com.ajithab.RNReceiveSharingIntent;

import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Objects;

public class ReceiveSharingIntentHelper {

    private Context context;

    public ReceiveSharingIntentHelper(Application context){
        this.context = context;
    }

    public void sendFileNames(Context context, Intent intent, Promise promise){
        try {
            String action = intent.getAction();
            String type = intent.getType();
            if(type == null) { return; }
            if(!type.startsWith("text") && (Objects.equals(action, Intent.ACTION_SEND) || Objects.equals(action, Intent.ACTION_SEND_MULTIPLE))){
                WritableMap files = getMediaUris(intent,context);
                promise.resolve(files);
            }else if(type.startsWith("text") && Objects.equals(action, Intent.ACTION_SEND)){
                String text = null;
                try{
                    text = intent.getStringExtra(Intent.EXTRA_TEXT);
                }catch (Exception ignored){ }
                if(text == null){
                    WritableMap files = getMediaUris(intent,context);
                    promise.resolve(files);
                }else{
                    WritableMap files = new WritableNativeMap();
                    WritableMap file = new WritableNativeMap();
                    file.putString("contentUri",null);
                    file.putString("filePath", null);
                    file.putString("fileName", null);
                    file.putString("extension", null);
                    if(text.startsWith("http")){
                        file.putString("weblink", text);
                        file.putString("text",null);
                    }else{
                        file.putString("weblink", null);
                        file.putString("text",text);
                    }
                    files.putMap("0",file);
                    promise.resolve(files);
                }

            }else if(Objects.equals(action, Intent.ACTION_VIEW)){
                String link = intent.getDataString();
                WritableMap files = new WritableNativeMap();
                WritableMap file = new WritableNativeMap();
                file.putString("contentUri",null);
                file.putString("filePath", null);
                file.putString("mimeType",null);
                file.putString("text",null);
                file.putString("weblink", link);
                file.putString("fileName", null);
                file.putString("extension", null);
                files.putMap("0",file);
                promise.resolve(files);
            }else{
                promise.reject("error","Invalid file type.");
            }
        }catch (Exception e){
            promise.reject("error",e.toString());
        }
    };


    public WritableMap getMediaUris(Intent intent, Context context){
        if (intent == null) return null;
        WritableMap files = new WritableNativeMap();
        if(Objects.equals(intent.getAction(), Intent.ACTION_SEND)){
            WritableMap file = new WritableNativeMap();
            Uri contentUri = (Uri) intent.getParcelableExtra(Intent.EXTRA_STREAM);
            String filePath =   ReceiveSharingIntentGetFileDirectory.getFilePath(context, contentUri);
            if(filePath != null){
                file.putString("fileName", getFileName(filePath));
                file.putString("extension", getExtension(filePath));
                file.putString("mimeType",getMediaType(filePath));
            }else{
                file.putString("fileName", null);
                file.putString("extension", null);
                file.putString("mimeType",null);
            }
            file.putString("contentUri",contentUri.toString());
            file.putString("filePath", filePath);
            file.putString("text",null);
            file.putString("weblink", null);
            files.putMap("0",file);
        }else if(Objects.equals(intent.getAction(), Intent.ACTION_SEND_MULTIPLE)) {
            ArrayList<Uri> contentUris = intent.getParcelableArrayListExtra(Intent.EXTRA_STREAM);
            if (contentUris != null) {
                int index = 0;
                for (Uri uri : contentUris) {
                    WritableMap file = new WritableNativeMap();
                    String filePath = ReceiveSharingIntentGetFileDirectory.getFilePath(context, uri);
                    if(filePath != null){
                        file.putString("fileName", getFileName(filePath));
                        file.putString("extension", getExtension(filePath));
                        file.putString("mimeType",getMediaType(filePath));
                    }else{
                        file.putString("fileName", null);
                        file.putString("extension", null);
                        file.putString("mimeType",null);
                    }
                    file.putString("contentUri",uri.toString());
                    file.putString("filePath", filePath);
                    file.putString("text",null);
                    file.putString("weblink", null);
                    files.putMap(Integer.toString(index),file);
                    index++;
                }
            }
        }
        return  files;
    }


    private String getMediaType(String url){
        String mimeType = URLConnection.guessContentTypeFromName(url);
        return mimeType;
    }


    public void clearFileNames(Intent intent){
        String type = intent.getType();
        if(type == null) return;
        if (type.startsWith("text")) {
            intent.removeExtra(Intent.EXTRA_TEXT);
        } else if (type.startsWith("image") || type.startsWith("video") || type.startsWith("application")) {
            intent.removeExtra(Intent.EXTRA_STREAM);
        }
    }

    public String getFileName(String file){
        return  file.substring(file.lastIndexOf('/') + 1);
    }

    public String getExtension(String file){
        return file.substring(file.lastIndexOf('.') + 1);
    }

}