"use client";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
// styles
import {
  CoinBalance,
  CoinImage,
  CoinImageDiv,
  CoinName,
  CoinSymbol,
  Card as MainCard,
} from "@/app/styles/TxHodlings/HodlingScreen.styles";
import { FlexContainer } from "@/app/styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";

interface ICardProps {
  decimals: number;
  isGridView: boolean;
  name: string;
  symbol: string;
  totalBalance: number;
}

const Card = ({
  decimals,
  isGridView,
  name,
  symbol,
  totalBalance,
}: ICardProps) => {
  const coinImageRef = useRef() as MutableRefObject<HTMLImageElement>;

  const [imageLoadedState, setImageLoadedState] = useState(true);

  const {
    txHodlings: {
      hodlingScreen: {
        images: { unknownCoin },
      },
    },
  } = screens;

  const handleImageLoad = (e: Event) => {
    if (e.type !== "error") {
      setImageLoadedState(true);
    } else {
      setImageLoadedState(false);
      console.log({ name, symbol });
      console.log(coinImageRef.current.getAttribute("src"));
    }
  };

  useEffect(() => {
    coinImageRef.current.addEventListener("error", handleImageLoad);
    coinImageRef.current.addEventListener("load", handleImageLoad);

    return () => {
      coinImageRef.current?.removeEventListener("error", handleImageLoad);
      coinImageRef.current?.removeEventListener("load", handleImageLoad);
    };
  }, []);

  useEffect(() => {
    if (!imageLoadedState) {
      coinImageRef.current.setAttribute("src", unknownCoin.src);
    }
  }, [imageLoadedState]);

  return (
    <MainCard $isGridView={isGridView} title={name}>
      <FlexContainer
        $flexDirection="row"
        $alignItems="center"
        $width="fit-content"
      >
        <CoinImageDiv $isGridView={isGridView}>
          <CoinImage
            src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
            alt={""}
            ref={coinImageRef}
          />
        </CoinImageDiv>
        <CoinName $isGridView={isGridView}>
          {name.length <= 20 ? name : `${name.substring(0, 20)}...`}
        </CoinName>
        <CoinSymbol $isGridView={isGridView}>
          {symbol.length <= 10 ? symbol : `${symbol.substring(0, 11)}...`}
        </CoinSymbol>
      </FlexContainer>
      <CoinBalance $isGridView={isGridView}>
        {totalBalance / decimals}
      </CoinBalance>
    </MainCard>
  );
};

export default Card;
