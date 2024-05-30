"use client";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
// styles
import {
  Body,
  Floater,
  FloaterButton,
  Image,
  MainHome,
  MainScroller,
  Title,
} from "@/app/styles/Home/index.styles";
import { FlexContainer } from "@/app/styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";

const Home = () => {
  const mainScrollerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const {
    home: { BODY_BOLD, BODY_NORMAL, contents },
  } = screens;

  const [contentState, setContentState] = useState(contents);
  const [scrollerCounter, setScrollerCounter] = useState(0);
  const [scrollerRefWidth, setScrollerRefWidth] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const target = mainScrollerRef.current;

      if (target) {
        setScrollerCounter((prevState) =>
          prevState >= target.children[0].children.length - 1
            ? 0
            : prevState + 1
        );
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const target = mainScrollerRef.current;
    const scrollXBy = target.clientWidth * scrollerCounter;

    let newWidth = `${target.clientWidth}px`;

    if (scrollerRefWidth !== newWidth) {
      setScrollerRefWidth(newWidth);
    }

    target.scrollTo({
      behavior: "smooth",
      left: scrollXBy,
      top: 0,
    });
  }, [scrollerCounter]);

  return (
    <MainHome>
      <MainScroller ref={mainScrollerRef}>
        <FlexContainer
          $flexDirection="row"
          $justifyContent="flex-start"
          $alignItems="center"
          $height="100%"
          $width="fit-content"
        >
          {contentState.map(({ body, image, title }, key) => (
            <FlexContainer
              key={key}
              $flexDirection="row"
              $justifyContent="flex-start"
              $alignItems="center"
              $height="100%"
              $width={scrollerRefWidth}
            >
              <Image $bgImg={image} />
              <FlexContainer
                $height="40%"
                $width="fit-content"
                $justifyContent="space-evenly"
                $padding={"0px 0px 0px 40px"}
              >
                <Title>{title}</Title>
                <FlexContainer
                  $alignSelf="end"
                  $flexWrap="wrap"
                  $flexDirection="row"
                  $width="600px"
                  $miscellaneous="transform: translateY(30%);"
                >
                  <Body $isNormal={true}>
                    {body.map(({ text, type }, key) =>
                      type === BODY_NORMAL ? (
                        text
                      ) : (
                        <Body key={key} $isNormal={type == BODY_NORMAL}>
                          {text}
                        </Body>
                      )
                    )}
                  </Body>
                </FlexContainer>
              </FlexContainer>
            </FlexContainer>
          ))}
        </FlexContainer>
      </MainScroller>
      <Floater>
        {contentState.map((_, index) => (
          <FloaterButton key={index} $selected={index === scrollerCounter} />
        ))}
      </Floater>
    </MainHome>
  );
};

export default Home;
