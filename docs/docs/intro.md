---
sidebar_position: 1
---


# Installation


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="npm"
  values={[
    { label: 'npm', value: 'npm', },
    { label: 'yarn', value: 'yarn', },
  ]
}>
<TabItem value="npm">

```bash
$ npm install react-native-receive-sharing-intent --save
```

</TabItem>
<TabItem value="yarn">

```bash
$ yarn add react-native-receive-sharing-intent
```

</TabItem>
</Tabs>


## React Native version <  0.60.0


```shell
$ npx react-native link react-native-receive-sharing-intent
```

Note: `Ios and Android on Debbuging time not working at sometimes while App is Closed`

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
    }, 
    'ShareMedia' // share url protocol (must be unique to your app, suggest using your apple bundle id)
    );
    
    
    // To clear Intents
    ReceiveSharingIntent.clearReceivedFiles();
    
```