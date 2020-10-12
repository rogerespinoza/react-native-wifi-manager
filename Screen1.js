import React, { Component } from "react";
import { Text, View, Button, PermissionsAndroid } from "react-native";
import WifiManager from "react-native-wifi-reborn";

export default class Screen1 extends Component {
  state = {
    aa: 1,
    pass: ''
  };
  componentDidMount() {
    WifiManager.getCurrentWifiSSID().then(
      (ssid) => {
        console.log("Your current connected wifi SSID is " + ssid);
        this.setState({pass: ssid});
      },
      () => {
        console.log("Cannot get current SSID!");
      }
    );
  }

  componentDidUpdate() {
    console.log("hello");
    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        console.log("Your current connected wifi SSID is " + ssid);
        // this.setState({pass: ssid});
      },
      () => {
        console.log("Cannot get current SSID!");
      }
    )
  }

  fun1() {
    console.log("hello");
    WifiManager.getCurrentWifiSSID().then(
      (ssid) => {
        console.log("Your current connected wifi SSID is " + ssid);
        alert(ssid);
      },
      () => {
        alert("noo");
        console.log("Cannot get current SSID!");
      }
    );
  }

  fun2 = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location permission is required for WiFi connections",
        message:
          "This app needs location permission as this is required  " +
          "to scan for wifi networks.",
        buttonNegative: "DENY",
        buttonPositive: "ALLOW",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      WifiManager.getCurrentWifiSSID().then(
        (ssid) => {
          console.log("Your current connected wifi SSID is " + ssid);
          alert(ssid);
        },
        () => {
          alert("noo");
          console.log("Cannot get current SSID!");
        }
      );
    } else {
      alert('Permission denied');
    }
  };

  connectWithWifi = async () => {
    try {
      WifiManager.connectToSSID('AP').then(
        () => {
          console.log("Connected successfully!");
        },
        () => {
          console.log("Connection failed!");
        }
      );
      // setConnected({connected: true, ssid});
    } catch (error) {
      // setConnected({connected: false, error: error.message});
      console.log('Connection failed!', {error});
    }
  };

  savePassword = async () => {
    try {
      await fetch('http://192.168.4.1/wifisave?s=CLARO_ESPINOZA&p=0600727523')
    } catch (error) {
    }
  }

  

  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text> textInComponent </Text>
        <Button
          title="hello"
          onPress={() => {
            this.connectWithWifi();
          }}
        />
        <Button
          title="password"
          onPress={() => {
            this.savePassword();
          }}
        />
      </View>
    );
  }
}


// import React, {useState, useEffect} from 'react';
// import { PermissionsAndroid, Button } from 'react-native';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   StatusBar,
//   Text,
// } from 'react-native';

// import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
// import WifiManager from 'react-native-wifi-reborn';

// const App = () => {
//   const [connected, setConnected] = useState({connected: false, ssid: 'S4N'});
//   const [ssid, setSsid] = useState('');
//   const password ="tanenbaum-1981";

//   const initWifi = async () => {
//     try {
//       const ssid = await WifiManager.getCurrentWifiSSID();
//       setSsid(ssid);
//       console.log('Your current connected wifi SSID is ' + ssid);
//     } catch (error) {
//       setSsid('Cannot get current SSID!' + error.message);
//       console.log('Cannot get current SSID!', {error});
//     }
//   }

//   // const requestLocationPermission = async () => {
//   //   try {
//   //     const granted = await PermissionsAndroid.request(
//   //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//   //       {
//   //         title: "React Native Wifi Reborn App Permission",
//   //         message:
//   //           "Location permission is required to connect with or scan for Wifi networks. ",
//   //         buttonNeutral: "Ask Me Later",
//   //         buttonNegative: "Cancel",
//   //         buttonPositive: "OK"
//   //       }
//   //     );
//   //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//   //       initWifi();
//   //     } else {
//   //       console.log("Location permission denied");
//   //     }
//   //   } catch (err) {
//   //     console.warn(err);
//   //   }
//   // };

//   // const connectWithWifi = async () => {
//   //   try {
//   //     const data = await WifiManager.connectToProtectedSSID(
//   //       ssid,
//   //       password,
//   //       false,
//   //     );
//   //     console.log('Connected successfully!', {data});
//   //     setConnected({connected: true, ssid});
//   //   } catch (error) {
//   //     setConnected({connected: false, error: error.message});
//   //     console.log('Connection failed!', {error});
//   //   }
//   // };

//   const scanExample = async () => {
//     try {
//       const data = await WifiManager.reScanAndLoadWifiList()
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   useEffect(async() => {
//     // requestLocationPermission();
//     try {
//       const ssid = await WifiManager.getCurrentWifiSSID();
//       setSsid(ssid);
//       console.log('Your current connected wifi SSID is ' + ssid);
//     } catch (error) {
//       setSsid('Cannot get current SSID!' + error.message);
//       console.log('Cannot get current SSID!', {error});
//     }

//   }, []);

//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           <View style={styles.sectionContainer}>
//             <Text style={styles.sectionTitle}>ssid</Text>
//             <Text style={styles.sectionDescription}>
//               {JSON.stringify(ssid)}
//             </Text>
//           </View>
//           <View style={styles.sectionContainer}>
//             <Text style={styles.sectionTitle}>Connected</Text>
//             <Text style={styles.sectionDescription}>
//               {JSON.stringify(connected)}
//             </Text>
//           </View>
//           <Button onPress={() => initWifi()} title="Connect" />
//           <View style={styles.body}></View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;