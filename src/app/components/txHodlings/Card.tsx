"use client";
import React from "react";
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
