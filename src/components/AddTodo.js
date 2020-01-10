import React from "react";
import { Input, Button, Layout } from "@ui-kitten/components";
import { StyleSheet, Alert, Keyboard } from "react-native";

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = React.useState("");
  const { wrapper, addInput, button } = styles;

  const onPressSubmit = () => {
    if (value.trim().length !== 0) {
      onSubmit(value);
      setValue("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Укажите навзавние!");
      setValue("");
    }
  };

  return (
    <Layout style={wrapper}>
      <Input
        placeholder="Название задачи"
        value={value}
        onChangeText={setValue}
        style={addInput}
      />
      <Button style={button} size="small" onPress={onPressSubmit}>
        Добавить
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  addInput: { width: "70%", marginTop: 4 },
  button: {
    marginLeft: 8
  }
});

// #1A2138
