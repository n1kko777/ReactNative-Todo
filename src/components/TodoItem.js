import React, { useContext } from "react";
import { ListItem, Icon } from "@ui-kitten/components";
import { ScreenContext } from "../context/screen/screenContext";

export const TodoItem = ({ todo, onRemove }) => {
  const { changeScreen } = useContext(ScreenContext);
  const { title, id } = todo;

  const longPressHandler = () => onRemove(id);

  const renderAccessory = () => (
    <Icon name="edit" width={18} height={18} fill="#fff" />
  );

  return (
    <ListItem
      title={title}
      accessory={renderAccessory}
      onPress={() => changeScreen(id)}
      onLongPress={longPressHandler}
    />
  );
};
