import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const InChatFileTransfer = ({ filePath }) => {
  var fileType = "";
  var name = "";
  if (filePath !== undefined) {
    name = filePath.split("/").pop();
    fileType = filePath.split(".").pop();
  }
  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <Image
          source={
            fileType === "pdf"
              ? require("app-mo/assets/pdf.png")
              : require("app-mo/assets/unknown-file.png")
          }
          style={{ height: 80, width: 60 }}
        />
        <View>
          <Text style={styles.text}>
            {name.replace("%20", "").replace(" ", "")}
          </Text>
          <Text style={styles.textType}>{fileType.toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );
};
export default InChatFileTransfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    borderRadius: 15,
    padding: 5,
    textAlign: "left",
  },
  text: {
    flex: 1,
    color: "black",
    marginTop: 10,
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  textType: {
    color: "black",
    marginTop: 5,
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 10,
  },
  frame: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 10,
    padding: 5,
    marginTop: -4,
  },
});
