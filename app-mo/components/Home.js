import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

//👇🏻 Import the app styles

import { styles } from "../style.js";

const Home = ({ navigation }) => {
  const [username, setUsername] = useState("");

  //👇🏻 checks if the input field is empty
  const storeUsername = async () => {
    try {
      //👇🏻 async function - saves the username to AsyncStorage

      //   redirecting to the Chat page

      await AsyncStorage.setItem("username", username);

      navigation.navigate("Chat");
    } catch (e) {
      Alert.alert("Error! While saving username");
    }
  };

  const handleSignIn = () => {
    if (username.trim()) {
      //👇🏻 calls AsyncStorage function

      storeUsername();
    } else {
      Alert.alert("Username is required.");
    }
  };

  return (
    <SafeAreaView style={styles.loginscreen}>
      <View style={styles.loginscreen}>
        <Text style={styles.loginheading}>Sign in</Text>

        <View style={styles.logininputContainer}>
          <TextInput
            autoCorrect={false}
            placeholder="Enter your username"
            style={styles.logininput}
            onChangeText={(value) => {
              setUsername(value.trim());
            }}
          />
        </View>

        <Pressable onPress={handleSignIn} style={styles.loginbutton}>
          <View>
            <Text style={styles.loginbuttonText}>Get Started</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Home;
{
  /*import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import SocketIOClient, { io } from "socket.io-client";

const Home = ({ navigation }) => {
return (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Home Screen</Text>
    <Button
      title="Go to Chat"
      onPress={() => {
        navigation.navigate("Chat");
      }}
    />
  </View>
);
};
export default Home;
*/
}
