import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import Ping from 'react-native-ping';

export default function Screen2() {

  const fun1 = async () => {
    let response = 'x';
    try {
      const ms = await Ping.start('172.217.8.110',{ timeout: 1000 });
      console.log(ms);
      // alert(ms)
      response = ms;
    } catch (error) {
      console.log('special code',error.code, error.message);
      // alert(error.code)
      response = error.code;
    }

    alert(response);
    
  }
  return (
    <View style={styles.container}>
      <Text>hello</Text>
      <Button title="button1" onPress={() => fun1()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})
