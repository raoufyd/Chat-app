import PDFReader from "@hashiprobr/expo-pdf-reader";
import React from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from "react-native";
function InChatView({ props, visible, onClose }) {
  const { currentMessage } = props;
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      style={{ height: 100 }}
    >
      <View style={{ padding: 20 }}>
        <PDFReader
          source={{ uri: currentMessage.file.url }}
          style={{ height: 10, width: 10 }}
        />
        <TouchableOpacity onPress={onClose} style={styles.buttonCancel}>
          <Image
            style={styles.buttonFooterInChatView}
            source={require("app-mo/assets/cancel.png")}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
export default InChatView;
const styles = StyleSheet.create({
  buttonCancel: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderColor: "black",
    left: 13,
    top: 20,
  },
  textBtn: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
