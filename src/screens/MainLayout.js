import React, { useContext } from "react";

import {
  ApplicationProvider,
  IconRegistry,
  Layout
} from "@ui-kitten/components";
import { mapping, dark as darkTheme } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { HomeScreen } from "./HomeScreen";
import { TodoScreen } from "./TodoScreen";

import { Navbar } from "../components/Navbar";

import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "../theme";
import { ScreenContext } from "../context/screen/screenContext";

export const MainLayout = () => {
  const { todoID } = useContext(ScreenContext);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={darkTheme}>
        <Layout style={styles.container}>
          <Navbar title="Todo App" />
          <Layout style={{ width: Dimensions.get("window").width - 40 }}>
            {todoID ? <TodoScreen /> : <HomeScreen />}
          </Layout>
        </Layout>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.DEFAULT_COLOR
  }
});
