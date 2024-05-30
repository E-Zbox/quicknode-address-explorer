"use client";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
// components
import Menu from "../components/menu";
// store
import { useMenuStore } from "@/store";
// styles
import { MainApp } from "../styles/App.styles";
// utils
import { ITEM_THREE, ITEM_TWO } from "@/utils/menu";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainAppRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [menuState] = useMenuStore(({ state }) => [state]);

  useEffect(() => {
    const target = mainAppRef.current;

    const selectedItem = menuState.filter((item) => item.selected)[0];

    let scrollYBy = 0;

    switch (selectedItem.id) {
      case ITEM_TWO:
        scrollYBy = target.clientHeight * 1;
        break;
      case ITEM_THREE:
        scrollYBy = target.clientHeight * 2;
        break;
      default:
        scrollYBy = 0;
        break;
    }

    target.scrollTo({
      behavior: "smooth",
      top: scrollYBy,
    });
  }, [menuState]);

  return (
    <MainApp ref={mainAppRef}>
      <Menu />
      {children}
    </MainApp>
  );
}
