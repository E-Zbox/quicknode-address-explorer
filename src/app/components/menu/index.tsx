"use client";
import React, { useState } from "react";
// store
import { useMenuStore } from "@/store";
// styles
import { Item, ItemImage, ItemText, MainMenu } from "@/app/styles/Menu.styles";
// utils
import { screens } from "@/utils/data";

const Menu = () => {
  const {
    menu: { items },
  } = screens;

  const [menuState, setMenuState] = useMenuStore(
    ({ state, setSelectedState }) => [state, setSelectedState]
  );

  return (
    <MainMenu>
      {menuState.map(({ icon, id, selected, title }, key) => (
        <Item
          key={key}
          $selected={selected}
          onClick={() => {
            setMenuState(id);
          }}
        >
          <ItemImage src={icon} alt={icon.substring(0, 11)} />
          <ItemText>{title}</ItemText>
        </Item>
      ))}
    </MainMenu>
  );
};

export default Menu;
