import React from "react";
import { Layout } from "@ui-kitten/components";
import { StyleSheet, ActivityIndicator } from "react-native";
import { THEME } from "../../theme";

export const AppLoader = () => {
  return (
    <Layout style={styles.center}>
      <ActivityIndicator size="large" color="#fff" />
    </Layout>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: THEME.PADDING_DEFAULT
  }
});
