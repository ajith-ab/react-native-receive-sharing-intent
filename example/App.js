/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar
} from 'react-native';

import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

const App = () => {
    
  useEffect(()=>{
    
    
    
    ReceiveSharingIntent.getSharedName((url)=>{
      console.log("link",url);
      ReceiveSharingIntent.getFileNamess(url).then(file=>{
        console.log(file)
      }).catch(e=>console.log(e));
    });
    
   
    // ReceiveSharingIntent.getFileNames().then(file => {
    //     console.log(file);
    // }).catch(e => console.log(e));
    return () => {
      ReceiveSharingIntent.clearFileNames();
    }
  },[]);
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View >
          <Text onPress={()=> ReceiveSharingIntent.clearFileName()} style={styles.container}>
          asd
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    
    justifyContent:'center'
  }
});

export default App;
