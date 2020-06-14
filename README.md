# react-native-receive-sharing-intent

A React Native plugin that enables React Native apps to receive sharing photos, videos, text, urls or any other file types from another app.

Also, supports iOS Share extension and launching the host app automatically. Check the provided example for more info.

## Demo

| Android | Ios | 
| :---: | :---: | 
| <img height="400" src="https://raw.githubusercontent.com/ajith-ab/react-native-receive-sharing-intent/master/doc/android.gif" />| <img height="400"  src="https://raw.githubusercontent.com/ajith-ab/react-native-receive-sharing-intent/master/doc/ios.gif" /> |


## Installation

#### Npm

```bash
$ npm install react-native-receive-sharing-intent --save
```
#### Yarn
```bash
$ yarn add react-native-receive-sharing-intent
```

#### ios

```bash
$ cd ios && pod install
```


### Mostly automatic installation less than React Native `0.60.0`

`$ react-native link react-native-receive-sharing-intent`

Note: `Ios and Android on Debbuging time not working at sometimes while App is Closed`

### Android
` <Project_folder>/android/app/src/main/manifest.xml `

```xml

<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  package="com.example">
    ....
    <!--TODO Add this Line  -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
  
      <application .... >
            <activity
              ....
              android:launchMode="singleTask"> <!--TODO IMPORTANT.set launchMode -> singleTask Recommended -->
              
            .....
          <intent-filter>
              <action android:name="android.intent.action.VIEW" />
              <category android:name="android.intent.category.DEFAULT" />
              <category android:name="android.intent.category.BROWSABLE" />
              <!--TODO:  Add this filter, if you want support opening urls into your app-->
              <data
                  android:scheme="https"
                  android:host="example.com"
                  android:pathPrefix="/invite"/>
          </intent-filter>

          <!--TODO: Add this filter, if you want to support sharing text into your app-->
          <intent-filter>
              <action android:name="android.intent.action.SEND" />
              <category android:name="android.intent.category.DEFAULT" />
              <data android:mimeType="text/*" />
          </intent-filter>

          <!--TODO: Add this filter, if you want to support sharing images into your app-->
          <intent-filter>
              <action android:name="android.intent.action.SEND" />
              <category android:name="android.intent.category.DEFAULT" />
              <data android:mimeType="image/*" />
          </intent-filter>

          <intent-filter>
              <action android:name="android.intent.action.SEND_MULTIPLE" />
              <category android:name="android.intent.category.DEFAULT" />
              <data android:mimeType="image/*" />
          </intent-filter>

          <!--TODO: Add this filter, if you want to support sharing videos into your app-->
          <intent-filter>
              <action android:name="android.intent.action.SEND" />
              <category android:name="android.intent.category.DEFAULT" />
              <data android:mimeType="video/*" />
          </intent-filter>
          <intent-filter>
              <action android:name="android.intent.action.SEND_MULTIPLE" />
              <category android:name="android.intent.category.DEFAULT" />
              <data android:mimeType="video/*" />
          </intent-filter>

          <!--TODO: Add this filter, if you want to support sharing any type of files-->
          <intent-filter>
              <action android:name="android.intent.action.SEND" />
              <category android:name="android.intent.category.DEFAULT" />
              <data android:mimeType="*/*" />
          </intent-filter>
          <intent-filter>
              <action android:name="android.intent.action.SEND_MULTIPLE" />
              <category android:name="android.intent.category.DEFAULT" />
              <data android:mimeType="*/*" />
          </intent-filter>
              
             .....
              
       </activity>
        
     </application>

</manifest>    
```

- On MainActivity on your react-native app 
` <Project_folder>/android/app/src/main/java/com/YOUR_APP/MainActivity.java` :

```java

// on top of your file
import android.content.Intent;

...

public class MainActivity extends ReactActivity {

...

// on your MainActivity Class body
@Override
public void onNewIntent(Intent intent) {
  super.onNewIntent(intent);
  setIntent(intent);
}

...

}

```

### Ios

`<project_folder>/ios/<project_name>/info.plist`

```xml
<plist version="1.0">
<dict>
  
  .....

<key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleTypeRole</key>
			<string>Editor</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>ShareMedia</string>
			</array>
		</dict>
		<dict/>
	</array>

<key>NSPhotoLibraryUsageDescription</key>
  <string>
      To upload photos, please allow permission to access your photo library.
  </string>
  
  ....
  
</dict>
</plist>  
```

`<project_folder>/ios/<project_name>/AppDelegate.m`

```objectivec
....

#import <React/RCTLinkingManager.h> // Add this Line in Header of file

....
@implementation AppDelegate

...

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

@end

```

`<project_folder>/ios/<your project name>/<your project name>.entitlements`

```xml

....
    <!--TODO:  Add this tag, if you want support opening urls into your app-->
    <key>com.apple.developer.associated-domains</key>
    <array>
        <string>applinks:example.com</string>
    </array>
....

```


####  Create Share Extension

  - Using xcode, go to File/New/Target and Choose "Share Extension"
  - Give it a name you want to show on while Sharing i.e. i Choose "Example Share"
 
  `<project_folder>/ios/<Your Share Extension Name>/info.plist` 
  
  ```xml
<plist version="1.0">
<dict>
...
    <key>NSExtension</key>
    <dict>
      <key>NSExtensionAttributes</key>
          <dict>
              <key>PHSupportedMediaTypes</key>
                 <array>
                      <!--TODO: Add this flag, if you want to support sharing video into your app-->
                     <string>Video</string>
                     <!--TODO: Add this flag, if you want to support sharing images into your app-->
                     <string>Image</string>
                 </array>
              <key>NSExtensionActivationRule</key>
              <dict>
                  <!--TODO: Add this flag, if you want to support sharing text into your app-->
                  <key>NSExtensionActivationSupportsText</key>
                  <true/>
                  <!--TODO: Add this tag, if you want to support sharing urls into your app-->
                <key>NSExtensionActivationSupportsWebURLWithMaxCount</key>
                <integer>1</integer>
                <!--TODO: Add this flag, if you want to support sharing images into your app-->
                  <key>NSExtensionActivationSupportsImageWithMaxCount</key>
                  <integer>100</integer>
                  <!--TODO: Add this flag, if you want to support sharing video into your app-->
                  <key>NSExtensionActivationSupportsMovieWithMaxCount</key>
                  <integer>100</integer>
                  <!--TODO: Add this flag, if you want to support sharing other files into your app-->
                  <!--Change the integer to however many files you want to be able to share at a time-->
                  <key>NSExtensionActivationSupportsFileWithMaxCount</key>
                  <integer>100</integer>
              </dict>
          </dict>
      <key>NSExtensionMainStoryboard</key>
      <string>MainInterface</string>
      <key>NSExtensionPointIdentifier</key>
      <string>com.apple.share-services</string>
    </dict>
  
 </dict>
</plist>

```
`<project_folder>/ios/<Your Share Extension Name>/ShareViewController.swift`
 - <b> Note: Important </b> change the `hostAppBundleIdentifier` value to your main host app bundle identifier (example in my case: `com.ajith.example` ) in this `ShareViewController.swift` 

```swift


//
//  ShareViewController.swift
//  Example Share
//
//  Created by Ajith A B on 30/05/20.
//

import UIKit
import Social
import MobileCoreServices
import Photos

class ShareViewController: SLComposeServiceViewController {
  // TODO: IMPORTANT: This should be your host app bundle identifier
  let hostAppBundleIdentifier = "com.ajith.example"
  let sharedKey = "ShareKey"
  var sharedMedia: [SharedMediaFile] = []
  var sharedText: [String] = []
  let imageContentType = kUTTypeImage as String
  let videoContentType = kUTTypeMovie as String
  let textContentType = kUTTypeText as String
  let urlContentType = kUTTypeURL as String
  let fileURLType = kUTTypeFileURL as String;
  
  override func isContentValid() -> Bool {
    return true
  }

  override func didSelectPost() {
    // This is called after the user selects Post. Do the upload of contentText and/or NSExtensionContext attachments.
    if let content = extensionContext!.inputItems[0] as? NSExtensionItem {
      if let contents = content.attachments {
        for (index, attachment) in (contents).enumerated() {
          if attachment.hasItemConformingToTypeIdentifier(imageContentType) {
            handleImages(content: content, attachment: attachment, index: index)
          } else if attachment.hasItemConformingToTypeIdentifier(textContentType) {
            handleText(content: content, attachment: attachment, index: index)
          } else if attachment.hasItemConformingToTypeIdentifier(fileURLType) {
            handleFiles(content: content, attachment: attachment, index: index)
          } else if attachment.hasItemConformingToTypeIdentifier(urlContentType) {
            handleUrl(content: content, attachment: attachment, index: index)
          } else if attachment.hasItemConformingToTypeIdentifier(videoContentType) {
            handleVideos(content: content, attachment: attachment, index: index)
          }
        }
      }
    }
  }

  override func configurationItems() -> [Any]! {
    // To add configuration options via table cells at the bottom of the sheet, return an array of SLComposeSheetConfigurationItem here.
    return []
  }
  
  private func handleText (content: NSExtensionItem, attachment: NSItemProvider, index: Int) {
    attachment.loadItem(forTypeIdentifier: textContentType, options: nil) { [weak self] data, error in
      
      if error == nil, let item = data as? String, let this = self {
        
        this.sharedText.append(item)
        
        // If this is the last item, save imagesData in userDefaults and redirect to host app
        if index == (content.attachments?.count)! - 1 {
          let userDefaults = UserDefaults(suiteName: "group.\(this.hostAppBundleIdentifier)")
          userDefaults?.set(this.sharedText, forKey: this.sharedKey)
          userDefaults?.synchronize()
          this.redirectToHostApp(type: .text)
        }
        
      } else {
        self?.dismissWithError()
      }
    }
  }
  
  private func handleUrl (content: NSExtensionItem, attachment: NSItemProvider, index: Int) {
    attachment.loadItem(forTypeIdentifier: urlContentType, options: nil) { [weak self] data, error in
      
      if error == nil, let item = data as? URL, let this = self {
        
        this.sharedText.append(item.absoluteString)
        
        // If this is the last item, save imagesData in userDefaults and redirect to host app
        if index == (content.attachments?.count)! - 1 {
          let userDefaults = UserDefaults(suiteName: "group.\(this.hostAppBundleIdentifier)")
          userDefaults?.set(this.sharedText, forKey: this.sharedKey)
          userDefaults?.synchronize()
          this.redirectToHostApp(type: .text)
        }
        
      } else {
        self?.dismissWithError()
      }
    }
  }
  
  private func handleImages (content: NSExtensionItem, attachment: NSItemProvider, index: Int) {
    attachment.loadItem(forTypeIdentifier: imageContentType, options: nil) { [weak self] data, error in
      
      if error == nil, let url = data as? URL, let this = self {
        //  this.redirectToHostApp(type: .media)
        // Always copy
        let fileExtension = this.getExtension(from: url, type: .video)
        let newName = UUID().uuidString
        let newPath = FileManager.default
          .containerURL(forSecurityApplicationGroupIdentifier: "group.\(this.hostAppBundleIdentifier)")!
          .appendingPathComponent("\(newName).\(fileExtension)")
        let copied = this.copyFile(at: url, to: newPath)
        if(copied) {
          this.sharedMedia.append(SharedMediaFile(path: newPath.absoluteString, thumbnail: nil, duration: nil, type: .image))
        }
        
        // If this is the last item, save imagesData in userDefaults and redirect to host app
        if index == (content.attachments?.count)! - 1 {
          let userDefaults = UserDefaults(suiteName: "group.\(this.hostAppBundleIdentifier)")
          userDefaults?.set(this.toData(data: this.sharedMedia), forKey: this.sharedKey)
          userDefaults?.synchronize()
          this.redirectToHostApp(type: .media)
        }
        
      } else {
        self?.dismissWithError()
      }
    }
  }
  
  private func handleVideos (content: NSExtensionItem, attachment: NSItemProvider, index: Int) {
    attachment.loadItem(forTypeIdentifier: videoContentType, options:nil) { [weak self] data, error in
      
      if error == nil, let url = data as? URL, let this = self {
        
        // Always copy
        let fileExtension = this.getExtension(from: url, type: .video)
        let newName = UUID().uuidString
        let newPath = FileManager.default
          .containerURL(forSecurityApplicationGroupIdentifier: "group.\(this.hostAppBundleIdentifier)")!
          .appendingPathComponent("\(newName).\(fileExtension)")
        let copied = this.copyFile(at: url, to: newPath)
        if(copied) {
          guard let sharedFile = this.getSharedMediaFile(forVideo: newPath) else {
            return
          }
          this.sharedMedia.append(sharedFile)
        }

        // If this is the last item, save imagesData in userDefaults and redirect to host app
        if index == (content.attachments?.count)! - 1 {
          let userDefaults = UserDefaults(suiteName: "group.\(this.hostAppBundleIdentifier)")
          userDefaults?.set(this.toData(data: this.sharedMedia), forKey: this.sharedKey)
          userDefaults?.synchronize()
          this.redirectToHostApp(type: .media)
        }
        
      } else {
        self?.dismissWithError()
      }
    }
  }
  
  private func handleFiles (content: NSExtensionItem, attachment: NSItemProvider, index: Int) {
    attachment.loadItem(forTypeIdentifier: fileURLType, options: nil) { [weak self] data, error in
      
      if error == nil, let url = data as? URL, let this = self {
        
        // Always copy
        let newName = this.getFileName(from :url)
        let newPath = FileManager.default
          .containerURL(forSecurityApplicationGroupIdentifier: "group.\(this.hostAppBundleIdentifier)")!
          .appendingPathComponent("\(newName)")
        let copied = this.copyFile(at: url, to: newPath)
        if (copied) {
          this.sharedMedia.append(SharedMediaFile(path: newPath.absoluteString, thumbnail: nil, duration: nil, type: .file))
        }
        
        if index == (content.attachments?.count)! - 1 {
          let userDefaults = UserDefaults(suiteName: "group.\(this.hostAppBundleIdentifier)")
          userDefaults?.set(this.toData(data: this.sharedMedia), forKey: this.sharedKey)
          userDefaults?.synchronize()
          this.redirectToHostApp(type: .file)
        }
        
      } else {
        self?.dismissWithError()
      }
    }
  }
  
  private func dismissWithError() {
    print("[ERROR] Error loading data!")
    let alert = UIAlertController(title: "Error", message: "Error loading data", preferredStyle: .alert)
    
    let action = UIAlertAction(title: "Error", style: .cancel) { _ in
      self.dismiss(animated: true, completion: nil)
    }
    
    alert.addAction(action)
    present(alert, animated: true, completion: nil)
    extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
  }
  
  private func redirectToHostApp(type: RedirectType) {
    let url = URL(string: "ShareMedia://dataUrl=\(sharedKey)#\(type)")
    var responder = self as UIResponder?
    let selectorOpenURL = sel_registerName("openURL:")
    
    while (responder != nil) {
      if (responder?.responds(to: selectorOpenURL))! {
        let _ = responder?.perform(selectorOpenURL, with: url)
      }
      responder = responder!.next
    }
    extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
  }
  
  enum RedirectType {
    case media
    case text
    case file
  }
  
  func getExtension(from url: URL, type: SharedMediaType) -> String {
    let parts = url.lastPathComponent.components(separatedBy: ".")
    var ex: String? = nil
    if (parts.count > 1) {
      ex = parts.last
    }
    
    if (ex == nil) {
      switch type {
      case .image:
        ex = "PNG"
      case .video:
        ex = "MP4"
      case .file:
        ex = "TXT"
      }
    }
    return ex ?? "Unknown"
  }
  
  func getFileName(from url: URL) -> String {
    var name = url.lastPathComponent
    
    if (name == "") {
      name = UUID().uuidString + "." + getExtension(from: url, type: .file)
    }
    
    return name
  }
  
  func copyFile(at srcURL: URL, to dstURL: URL) -> Bool {
    do {
      if FileManager.default.fileExists(atPath: dstURL.path) {
        try FileManager.default.removeItem(at: dstURL)
      }
      try FileManager.default.copyItem(at: srcURL, to: dstURL)
    } catch (let error) {
      print("Cannot copy item at \(srcURL) to \(dstURL): \(error)")
      return false
    }
    return true
  }
  
  private func getSharedMediaFile(forVideo: URL) -> SharedMediaFile? {
    let asset = AVAsset(url: forVideo)
    let duration = (CMTimeGetSeconds(asset.duration) * 1000).rounded()
    let thumbnailPath = getThumbnailPath(for: forVideo)
    
    if FileManager.default.fileExists(atPath: thumbnailPath.path) {
      return SharedMediaFile(path: forVideo.absoluteString, thumbnail: thumbnailPath.absoluteString, duration: duration, type: .video)
    }
    
    var saved = false
    let assetImgGenerate = AVAssetImageGenerator(asset: asset)
    assetImgGenerate.appliesPreferredTrackTransform = true
    //        let scale = UIScreen.main.scale
    assetImgGenerate.maximumSize =  CGSize(width: 360, height: 360)
    do {
      let img = try assetImgGenerate.copyCGImage(at: CMTimeMakeWithSeconds(600, preferredTimescale: Int32(1.0)), actualTime: nil)
      try UIImage.pngData(UIImage(cgImage: img))()?.write(to: thumbnailPath)
      saved = true
    } catch {
      saved = false
    }
    
    return saved ? SharedMediaFile(path: forVideo.absoluteString, thumbnail: thumbnailPath.absoluteString, duration: duration, type: .video) : nil
    
  }
  
  private func getThumbnailPath(for url: URL) -> URL {
    let fileName = Data(url.lastPathComponent.utf8).base64EncodedString().replacingOccurrences(of: "==", with: "")
    let path = FileManager.default
      .containerURL(forSecurityApplicationGroupIdentifier: "group.\(hostAppBundleIdentifier)")!
      .appendingPathComponent("\(fileName).jpg")
    return path
  }
  
  class SharedMediaFile: Codable {
    var path: String; // can be image, video or url path. It can also be text content
    var thumbnail: String?; // video thumbnail
    var duration: Double?; // video duration in milliseconds
    var type: SharedMediaType;
    
    
    init(path: String, thumbnail: String?, duration: Double?, type: SharedMediaType) {
      self.path = path
      self.thumbnail = thumbnail
      self.duration = duration
      self.type = type
    }
    
    // Debug method to print out SharedMediaFile details in the console
    func toString() {
      print("[SharedMediaFile] \n\tpath: \(self.path)\n\tthumbnail: \(self.thumbnail)\n\tduration: \(self.duration)\n\ttype: \(self.type)")
    }
  }
  
  enum SharedMediaType: Int, Codable {
    case image
    case video
    case file
  }
  
  func toData(data: [SharedMediaFile]) -> Data {
    let encodedData = try? JSONEncoder().encode(data)
    return encodedData!
  }
}

extension Array {
  subscript (safe index: UInt) -> Element? {
    return Int(index) < count ? self[Int(index)] : nil
  }
}




```
#### Create App Group

- Go to the Capabilities tab and switch on the App Groups switch for both targets. Add a new group and name it group.YOUR_HOST_APP_BUNDLE_IDENTIFIER in my case group.com.ajith.example

- App group name must be start with `group.`

1. Create a app group for main App

![group text](https://raw.githubusercontent.com/ajith-ab/react-native-receive-sharing-intent/master/doc/app%20group2.png)

2. Create a app group for Share Extension

![group text](https://raw.githubusercontent.com/ajith-ab/react-native-receive-sharing-intent/master/doc/app%20group1.png)


#### Compiling issues and their fixes
  - Error: App does not build after adding Share Extension?

    Fix: Check Build Settings of your share extension and remove everything that tries to import Cocoapods from your main project. i.e. remove everything under Linking/Other Linker Flags

 - You might need to disable bitcode for the extension target


## Usage
```javascript
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';


    // To get All Recived Urls
    ReceiveSharingIntent.getReceivedFiles(files => {
      // files returns as JSON Array example
      //[{ filePath: null, text: null, weblink: null, mimeType: null, contentUri: null, fileName: null, extension: null }]
    }, 
    (error) =>{
      console.log(error);
    });
    
    
    // To clear Intents
    ReceiveSharingIntent.clearReceivedFiles();
    
```


### Donate

<p><a href="https://www.paypal.me/ajithab" rel="nofollow"><img height="75" src="https://raw.githubusercontent.com/stefan-niedermann/paypal-donate-button/master/paypal-donate-button.png" style="max-width:100%;"></a></p>


### Author
[Ajith A B](https://www.linkedin.com/in/ajith-a-b-a61303197)

### licenses

MIT