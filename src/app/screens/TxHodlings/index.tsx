"use client";
import React, { useCallback, useState } from "react";
// screens
import HodlingScreen from "./HodlingScreen";
import TxScreen from "./TxScreen";
// styles
import {
  MainTab,
  MainTxHistory,
  TabController,
  TabNavigation,
  TabScreen,
  TabTitle,
} from "@/app/styles/TxHodlings/index.styles";
import { FlexContainer } from "@/app/styles/shared/Container.styles";
import { Title } from "@/app/styles/shared/Text.styles";
// utils
import { screens } from "@/utils/data";

const TxHodlings = () => {
  const {
    default: {
      images: { logo },
    },
    txHodlings: { tabs },
  } = screens;

  const [tabControllerNode, setTabControllerNode] = useState<HTMLDivElement>();
  const [tabControllerWidth, setTabControllerWidth] = useState("0px");

  const [tabState, setTabState] = useState(tabs);

  const tabControllerRef = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        setTabControllerWidth(`${node.getBoundingClientRect().width}px`);
        setTabControllerNode(node);
      }
    },
    [tabState]
  );

  let selectedIndex: 0 | 1 = 0;

  tabState.forEach((item, index) => {
    if (item.selected == true) {
      selectedIndex = index == 0 || index == 1 ? index : 0;
    }
  });

  const handleTabClick = (_index: number) => {
    setTabState((prevState) => {
      const updatedState = prevState.map((item, index) => ({
        ...item,
        selected: index == _index,
      }));

      return updatedState;
    });

    if (tabControllerNode != null) {
      const scrollXBy = tabControllerNode?.clientWidth * _index;
      tabControllerNode.scrollTo({
        behavior: "instant",
        left: scrollXBy,
      });
    }
  };

  return (
    <MainTxHistory $bgImg={logo.src}>
      <FlexContainer
        $flexDirection="row"
        $padding={"20px 0px 10px 0px"}
        $width="fit-content"
      >
        <Title>TX & HODLings</Title>
      </FlexContainer>
      <MainTab>
        <TabNavigation $selectedIndex={selectedIndex}>
          {tabState.map(({ title, selected }, key) => (
            <TabTitle
              key={key}
              $selected={selected}
              onClick={() => handleTabClick(key)}
            >
              {title}
            </TabTitle>
          ))}
        </TabNavigation>
        <TabController ref={tabControllerRef}>
          <FlexContainer
            $flexDirection="row"
            $height="100%"
            $width="fit-content"
          >
            <TabScreen $width={tabControllerWidth}>
              <TxScreen />
            </TabScreen>
            <TabScreen $width={tabControllerWidth}>
              <HodlingScreen />
            </TabScreen>
          </FlexContainer>
        </TabController>
      </MainTab>
    </MainTxHistory>
  );
};

export default TxHodlings;
