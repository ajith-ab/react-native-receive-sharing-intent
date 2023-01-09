import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

export default function App() {
  React.useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      (data: any) => {
        console.log(data);
      },
      (err: any) => {
        console.log(err);
      }
    );

    return () => {
      ReceiveSharingIntent.clearReceivedFiles();
    };
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
