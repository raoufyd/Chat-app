import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { styles } from "../style.js";
//import * as DocumentPicker from "react-native-document-picker";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { FontAwesome } from "@fortawesome/react-fontawesome";
import { Icon } from "@rneui/base";
import InChatFileTransfer from "./InChatFileTransfer";
import InChatView from "./inChatView";

const Messaging = ({ route, navigation }) => {
  const [chatMessages, setChatMessages] = useState([
    {
      _id: "1",

      text: "Hello guys, welcome!",

      createdAt: 8,

      user: { _id: 1, name: "DR YEDDOU" },

      image:
        "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",

      file: { url: "" },
    },

    {
      _id: "2",

      text: "Hi Tomer, thank you! 😇",

      createdAt: 8,

      user: { _id: 2, name: "DR YEDDOU" },

      image: "",

      file: { url: "" },
    },
  ]);

  const [user, setUser] = useState({
    _id: uuidv4(),
    name: "a",
  });

  //👇🏻 Access the chatroom's name and id

  const { name, id } = route.params;

  //👇🏻 This function gets the username saved on AsyncStorage

  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem("username");

      if (value !== null) {
        setUser({
          _id: uuidv4(),
          name: value,
        });
      }
    } catch (e) {
      console.error("Error while loading username!");
    }
  };

  //👇🏻 Sets the header title to the name chatroom's name

  useLayoutEffect(() => {
    // navigation.setOptions({ title: name });

    getUsername();
  }, []);

  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    setChatMessages((e) => [
      ...e,
      {
        _id: uuidv4(),

        createdAt: `${hour} : ${mins}`,

        user: user,

        image: imagePath.file,

        file: { url: filePath },
      },
    ]);
    console.log("chatMessages", chatMessages);
  };

  // inside App()
  // declare 4 states
  const [isAttachImage, setIsAttachImage] = useState(false);
  const [isAttachFile, setIsAttachFile] = useState(false);
  const [imagePath, setImagePath] = useState({ file: "" });
  const [filePath, setFilePath] = useState("");
  const [text, setText] = useState("");

  const onSend = useCallback(
    (messages = []) => {
      const [messageToSend] = messages;
      setText(messageToSend.text);
      console.log("messageToSend", messageToSend);

      if (isAttachImage) {
        const newMessage = {
          _id: uuidv4(),
          createdAt: new Date(),
          text: text,
          user: {
            _id: user._id,
            name: user.name,
          },
          image: imagePath.file,
          file: {
            url: "",
          },
        };
        setChatMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessage)
        );
        setImagePath({ file: "" });
        setIsAttachImage(false);
      } else if (isAttachFile) {
        const newMessage = {
          _id: uuidv4(),
          createdAt: new Date(),
          text: text,
          user: {
            _id: user._id,
            name: user.name,
          },
          image: "",
          file: {
            url: filePath,
          },
        };
        setChatMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessage)
        );
        setFilePath("");
        setIsAttachFile(false);
      } else {
        setChatMessages((previousMessages) =>
          GiftedChat.append(previousMessages, messages)
        );
      }
      setText("");
    },
    [filePath, imagePath, isAttachFile, isAttachImage]
  );

  // add a function attach file using DocumentPicker.pick
  onInputTextChanged = (e) => {
    setText(e);
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      console.log("result[0]", result.assets[0].uri);
      const fileUri = result.assets[0].uri;
      if (!fileUri) {
        console.log("File URI is undefined or null");
        return;
      }

      if (fileUri.indexOf(".png") !== -1 || fileUri.indexOf(".jpg") !== -1) {
        setImagePath({ file: fileUri });
        setIsAttachImage(true);
        setText("   ");
      }
    } catch (err) {
      if (!err) {
        console.log("User cancelled file picker");
      } else {
        console.log("DocumentPicker err => ", err);
        throw err;
      }
    }
  };
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      console.log("result/****/", result.assets[0].uri);
      const fileUri = result.assets[0].uri;
      if (!fileUri) {
        console.log("File URI is undefined or null");
        return;
      }
      console.log("fileUri.indexOf(.jpg", fileUri);

      setFilePath(fileUri);
      console.log("filePath", filePath);
      setIsAttachFile(true);
      setText("   ");
    } catch (err) {
      if (err) {
        console.log("User cancelled file picker");
      } else {
        console.log("DocumentPicker err => ", err);
        throw err;
      }
    }
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={pickDocument}>
            <Icon
              type="font-awesome"
              name="paperclip"
              style={{
                marginBottom: 10,
                marginRight: 10,
                transform: [{ rotateY: "180deg" }],
              }}
              size={25}
              color="blue"
              tvParallaxProperties={undefined}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
            <Icon
              type="font-awesome"
              name="image"
              style={{
                marginBottom: 10,
                marginRight: 10,
                transform: [{ rotateY: "180deg" }],
              }}
              size={25}
              color="blue"
              tvParallaxProperties={undefined}
            />
          </TouchableOpacity>
          <Icon
            type="font-awesome"
            name="send"
            style={{ marginBottom: 10, marginRight: 10 }}
            size={25}
            color="orange"
            tvParallaxProperties={undefined}
          />
        </View>
      </Send>
    );
  };

  const [fileVisible, setFileVisible] = useState(false);

  // Modify renderBuble()
  const renderBubble = (props) => {
    const { currentMessage } = props;
    console.log("currentMessage", currentMessage);
    if (currentMessage.file && currentMessage.file.url) {
      return (
        <TouchableOpacity
          style={{
            ...styles.fileContainer,
            backgroundColor:
              props.currentMessage.user._id === 2 ? "#2e64e5" : "#efefef",
            borderBottomLeftRadius:
              props.currentMessage.user._id === 2 ? 15 : 5,
            borderBottomRightRadius:
              props.currentMessage.user._id === 2 ? 5 : 15,
          }}
          onPress={() => setFileVisible(true)}
        >
          <InChatFileTransfer
            style={{ marginTop: -10 }}
            filePath={currentMessage.file.url}
          />
          <InChatView
            props={props}
            visible={fileVisible}
            onClose={() => setFileVisible(false)}
          />
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                ...styles.fileText,
                color: currentMessage.user._id === 2 ? "white" : "black",
              }}
            >
              {currentMessage.text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#efefef",
          },
        }}
      />
    );
  };
  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  const renderChatFooter = useCallback(() => {
    if (imagePath.file !== "") {
      return (
        <View style={styles.chatImageFooter}>
          <Image
            source={{ uri: imagePath.file }}
            style={styles.chatLeftImageFooter}
          />
          <View style={styles.chatRightFooter}>
            <TouchableOpacity
              onPress={() => {
                setIsAttachImage(false);
                setImagePath({ file: "" });
              }}
              style={styles.buttonFooterChat}
            >
              <Image
                style={styles.buttonFooterChat}
                source={require("app-mo/assets/cancel.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (filePath) {
      return (
        <View style={styles.chatFooter}>
          <View style={styles.chatLeftFooter}>
            <InChatFileTransfer filePath={filePath} />
          </View>
          <View style={styles.chatRightFooter}>
            <TouchableOpacity
              onPress={() => {
                setIsAttachFile(false);
                setFilePath("");
              }}
              style={styles.buttonFooterChat}
            >
              <Image
                style={styles.buttonFooterChat}
                source={require("app-mo/assets/cancel.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  }, [filePath, imagePath]);

  return (
    <GiftedChat
      messages={chatMessages}
      isTyping={true}
      text={text}
      showAvatarForEveryMessage={true}
      renderSend={renderSend}
      renderBubble={renderBubble}
      onInputTextChanged={onInputTextChanged}
      alwaysShowSend
      renderChatFooter={renderChatFooter}
      onSend={(m) => {
        console.log("m", m);
        if (isAttachImage || isAttachFile) {
          onSend(m);
        } else if (m[0].text == "") {
          return;
        } else {
          onSend(m);
        }
      }}
      scrollToBottomComponent={scrollToBottomComponent}
      user={{
        _id: uuidv4(),
        name: user.name,
      }}
    />
    /*
  <View style={styles.messagingscreen}>
    <View
      style={[
        styles.messagingscreen,

        { paddingVertical: 15, paddingHorizontal: 10 },
      ]}
    >
      {chatMessages[0] ? (
        <FlatList
          data={chatMessages}
          renderItem={({ item }) => (
            <MessageComponent item={item} user={user} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        ""
      )}
    </View>
    <KeyboardAwareScrollView
      contentContainerStyle={{
        justifyContent: "space-evenly",
        alignItems: "flex-start",
      }}
      style={{
        display: "flex",
        flex: 1,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
      }}
    >
      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          value={message}
          onChangeText={(value) => setMessage(value)}
        />

        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}
        >
          <View>
            <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  </View>*/
  );
};
export default Messaging;
