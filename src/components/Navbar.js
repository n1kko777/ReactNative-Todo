import React, { useContext } from "react";
import { StyleSheet, Platform } from "react-native";
import { Text } from "@ui-kitten/components";
import { Layout, Icon, Button } from "@ui-kitten/components";

import { THEME } from "../theme";
import { ScreenContext } from "../context/screen/screenContext";

const backHomeIcon = style => (
  <Icon {...style} width={24} height={24} fill="#fff" name="arrow-back" />
);

export const Navbar = ({ title }) => {
  const { todoID, changeScreen } = useContext(ScreenContext);

  return (
    <Layout
      style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navbarIos,
          android: styles.navbarAndroid
        })
      }}
    >
      {todoID !== null && (
        <Button
          onPress={() => changeScreen(null)}
          style={styles.button}
          appearance="ghost"
          status="danger"
          icon={backHomeIcon}
        />
      )}
      <Text style={styles.title}>{title}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: "relative",
    fontSize: 28,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    height: 70,
    width: "100%",
    paddingTop: 30
  },

  navbarAndroid: {
    backgroundColor: THEME.NAVBAR_COLOR
  },
  navbarIos: {
    borderBottomColor: THEME.NAVBAR_COLOR,
    borderBottomWidth: 1
  },

  title: {
    width: "100%",
    textAlign: "center"
  },
  button: {
    position: "absolute",
    zIndex: 10,
    bottom: -5,
    left: -10,
    padding: 0,
    opacity: 1
  }
});
