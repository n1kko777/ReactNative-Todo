import React, { useState, useEffect } from "react";
import { Input, Button } from "@ui-kitten/components";
import { View, StyleSheet, Alert, Dimensions, Keyboard } from "react-native";
import { THEME } from "../theme";

import { Layout } from "@ui-kitten/components";

export const TodoScreen = ({ todo, onSubmit, onRemove }) => {
  const { title, id } = todo;

  console.log("id :", id);

  const [value, setValue] = React.useState(title);
  const { wrapper, addInput, button, buttonDelete } = styles;

  const onPressSubmit = () => {
    if (value.trim().length !== 0) {
      todo.title = value;
      onSubmit(todo);
      Keyboard.dismiss();
    } else {
      Alert.alert("Укажите навзавние!");
    }
  };

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_DEFAULT * 2
  );

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get("window").width - THEME.PADDING_DEFAULT * 2;

      setDeviceWidth(width);
    };
    Dimensions.addEventListener("change", update);

    return () => Dimensions.removeEventListener("change", update);
  });

  return (
    <Layout
      style={{ width: deviceWidth, marginHorizontal: THEME.PADDING_DEFAULT }}
    >
      <View style={wrapper}>
        <Input
          placeholder="Название задачи"
          value={value}
          onChangeText={setValue}
          style={addInput}
        />
        <Button style={button} size="small" onPress={onPressSubmit}>
          Обновить
        </Button>
      </View>
      <View>
        <Button
          style={buttonDelete}
          status="danger"
          onPress={() => onRemove(id)}
        >
          Удалить
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: THEME.PADDING_DEFAULT,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  addInput: { width: "70%", marginTop: 4 },
  button: {
    marginLeft: 8
  },

  buttonDelete: {
    margin: 10
  }
});
