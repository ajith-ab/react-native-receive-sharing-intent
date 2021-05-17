package com.example.reactnativereceivesharingintent;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
  }


  @Override
  protected String getMainComponentName() {
    return "ReceiveSharingIntentExample";
  }
}
