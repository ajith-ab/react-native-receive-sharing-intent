import * as React from 'react';

import { StyleSheet, View, Text, NativeModules } from 'react-native';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
var NativeModuleEx = NativeModules.ReceiveSharingIntent;


export default function App() {

  React.useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles((data:any)=> {
      console.log(data);
      
    },
    ()=>{

    },
    
    "");

    NativeModuleEx.getFileNames('Some String !');



  }, []);

  return (
    <View style={styles.container}>
      <Text>Result:</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
