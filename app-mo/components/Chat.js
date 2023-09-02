import React from "react";

import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";

import { Feather } from "@expo/vector-icons";

import ChatComponent from "../components/ChatComponent";

import { styles } from "../style.js";

const Chat = () => {
  //👇🏻 Dummy list of rooms

  const rooms = [
    {
      id: "1",

      name: "Novu Hangouts",

      messages: [
        {
          id: "1a",

          text: "Hello guys, welcome!",

          time: "07:50",

          user: "Tomer",
        },

        {
          id: "1b",

          text: "Hi Tomer, thank you! 😇",

          time: "08:50",

          user: "David",
        },
      ],
    },

    {
      id: "2",

      name: "Hacksquad Team 1",

      messages: [
        {
          id: "2a",

          text: "Guys, who's awake? 🙏🏽",

          time: "12:50",

          user: "Team Leader",
        },

        {
          id: "2b",

          text: "What's up? 🧑🏻‍💻",

          time: "03:50",

          user: "Victoria",
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>

          {/* 👇🏻 Logs "ButtonPressed" to the console when the icon is clicked */}

          <Pressable onPress={() => console.log("Button Pressed!")}>
            <Feather name="edit" size={24} color="green" />
          </Pressable>
        </View>
      </View>

      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>

            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chat;

{
  /*import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const socket = io("http://192.168.1.9:3000");

const Chat = ({ navigation }) => {
  const [username, setUsername] = useState();
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");

      console.log("socket.id", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, [socket]);

  const sendMessage = (msg) => {
    socket.emit("chat message", msg);
  };

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);
  useEffect(() => {
    getUserName();
  }, []);

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage("");
  };
  let tada;
  const getUserName = async () => {
    const usr = await AsyncStorage.getItem("username");
    setUsername(usr);
  };

  return (
    <View>
      <Text>Chat Screen</Text>
      <View>
        {messages.map((msg, index) => (
          <Text key={index}>
            {username} :{msg}
          </Text>
        ))}
      </View>
      <TextInput value={message} onChangeText={setMessage} />
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
};
export default Chat;*/
}
