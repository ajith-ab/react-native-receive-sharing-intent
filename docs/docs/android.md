---
sidebar_position: 2
---

# Android


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

- Or if you have `MainActivity.kt`:
` <Project_folder>/android/app/src/main/java/com/YOUR_APP/MainActivity.kt` :
```kt
// on top of your file
import android.content.Intent;
...
class MainActivity : ReactActivity() {
...
override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent);
    setIntent(intent);
  }
...
}
```

...

}

```
