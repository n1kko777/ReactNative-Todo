import React from "react";
import { CheckBox, ListItem, Icon } from "@ui-kitten/components";

export const TodoItem = ({ todo, onRemove, onOpen }) => {
  const { title, id } = todo;

  const longPressHandler = () => onRemove(id);

  const renderAccessory = () => (
    <Icon name="edit" width={18} height={18} fill="#fff" />
  );

  return (
    <ListItem
      title={title}
      accessory={renderAccessory}
      onPress={() => onOpen(id)}
      onLongPress={longPressHandler}
    />
  );
};
