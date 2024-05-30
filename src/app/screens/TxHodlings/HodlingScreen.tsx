"use client";
import React, { useEffect, useState } from "react";
// api
import { ethereumWhales, getWalletTokenBalance } from "@/api";
import { IWalletTokenBalanceResult } from "@/api/interface";
// components
import Card from "@/app/components/txHodlings/Card";
import SearchBar from "@/app/components/SearchBar";
// styles
import {
  HodlingContainer,
  HodlingScroller,
  ViewButton,
} from "@/app/styles/TxHodlings/HodlingScreen.styles";
import { SearchText } from "@/app/styles/shared/Text.styles";
import {
  FlexContainer,
  PositionContainer,
} from "@/app/styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";
import { Loader } from "@/app/styles/Loader.styles";

const LOCAL_STORAGE_IS_GRID_VIEW = "localStorageIsGridView";

const HodlingScreen = () => {
  const [currentSearchedAddress, setCurrentSearchedAddress] = useState("");
  const [formState, setFormState] = useState("");
  const [isGridView, setIsGridView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [walletTokens, setWalletTokens] = useState<IWalletTokenBalanceResult[]>(
    []
  );

  const {
    default: {
      images: { loaderGif },
    },
    txHodlings: {
      hodlingScreen: {
        images: { gridViewIcon, listViewIcon, unknownCoin },
      },
    },
  } = screens;

  const handleSearchBarChange: React.ChangeEventHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(value);
  };

  const handleSearchSubmit = async () => {
    if (formState.length == 0) {
      return;
    }

    const isValid = formState.toLowerCase().match(/(\b0x[a-f0-9]{40}\b)/g);

    if (!isValid) {
      alert("Invalid wallet address. Must be a valid Ethereum Address");
      return;
    }

    setSearchLoading(true);
    setLoading(true);

    const { data, error, success } = await getWalletTokenBalance(formState);

    if (success) {
      setCurrentSearchedAddress(formState);
      setWalletTokens(data.result);
    }
  };

  const handleViewButtonClick = (isGridView: boolean) => {
    setIsGridView(isGridView);
  };

  useEffect(() => {
    const localStorageIsGridView = localStorage.getItem(
      LOCAL_STORAGE_IS_GRID_VIEW
    );

    if (localStorageIsGridView) {
      setIsGridView(JSON.parse(localStorageIsGridView));
    }

    const randomIndex = Math.floor(Math.random() * ethereumWhales.length);

    if (walletTokens.length == 0) {
      getWalletTokenBalance(ethereumWhales[randomIndex].text)
        .then((res) => {
          const { data, error, success } = res;

          if (!success) {
            throw error;
          }

          setWalletTokens(data.result);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    setLoading(false);
    setSearchLoading(false);
  }, [walletTokens]);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_IS_GRID_VIEW,
      JSON.stringify(isGridView)
    );
  }, [isGridView]);

  return (
    <FlexContainer $height={"fit-content"}>
      <PositionContainer
        $position="relative"
        $flexDirection="row"
        $justifyContent="space-between"
        $alignItems="center"
        $padding="0px 0px 10px 0px"
        $width={"100%"}
      >
        <FlexContainer $flexDirection="row" $justifyContent="center">
          <SearchBar
            disabled={formState.length == 0}
            loading={searchLoading}
            id="input_tx_searchbar"
            name="input_tx_searchbar"
            placeholder="Address: 0x42d904b..."
            borderRadius="30px"
            width="500px"
            value={formState}
            onChange={handleSearchBarChange}
            searchFunction={handleSearchSubmit}
          />
        </FlexContainer>
        <PositionContainer
          $right="20%"
          $flexDirection="row"
          $justifyContent="flex-end"
          $width="fit-content"
          $padding={"0px 0px 0px 0px"}
        >
          <ViewButton
            $bgImg={gridViewIcon.src}
            $selected={isGridView}
            onClick={() => handleViewButtonClick(true)}
          ></ViewButton>
          <ViewButton
            $bgImg={listViewIcon.src}
            $selected={!isGridView}
            onClick={() => handleViewButtonClick(false)}
          ></ViewButton>
        </PositionContainer>
      </PositionContainer>
      {loading ? (
        <FlexContainer
          $flexDirection="row"
          $alignItems="center"
          $justifyContent="center"
        >
          <Loader src={loaderGif.src} $size="70px" />
        </FlexContainer>
      ) : currentSearchedAddress.length ? (
        <FlexContainer
          $flexDirection="row"
          $alignItems="center"
          $justifyContent="center"
        >
          <SearchText $opacity={"0.4"}>Showing Results for: </SearchText>
          <SearchText>{currentSearchedAddress}</SearchText>
        </FlexContainer>
      ) : (
        <></>
      )}
      {walletTokens.length ? (
        <HodlingScroller>
          <HodlingContainer $isGridView={isGridView}>
            {walletTokens.map(({ name, symbol, decimals, totalBalance }, key) =>
              Number(totalBalance) > 0 && name !== null && symbol !== null ? (
                <Card
                  decimals={Number(decimals || 1)}
                  isGridView={isGridView}
                  name={name || ""}
                  symbol={symbol || ""}
                  totalBalance={Number(totalBalance)}
                />
              ) : (
                <></>
              )
            )}
          </HodlingContainer>
        </HodlingScroller>
      ) : (
        <FlexContainer
          $height="100%"
          $alignItems="center"
          $justifyContent="center"
        >
          <SearchText>No ERC-20 tokens found</SearchText>
        </FlexContainer>
      )}
    </FlexContainer>
  );
};

export default HodlingScreen;
