import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

import colors from "../assets/colors";
import { transformer } from "../metro.config";

export default function Header() {
  return (
    <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Take image of your dog and find out his age and breed!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: colors.light,
    fontSize: 18,
    textAlign: "center",
  },
  logo: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.6,
    borderRadius: 100 / 2,
  },
});