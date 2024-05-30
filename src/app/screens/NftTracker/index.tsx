"use client";
import React, { useEffect, useState } from "react";
// api
import { ethereumWhales, fetchNFTs } from "@/api";
// components
import SearchBar from "@/app/components/SearchBar";
// store
import { useOwnerNFTPortfolioStore } from "@/store";
// styles
import { Loader } from "@/app/styles/Loader.styles";
import {
  AddressButton,
  AddressScroller,
  MainNFTTracker,
  NFTCard,
  NFTCardContainer,
  NFTCardField,
  NFTCardScroller,
  NFTCardText,
} from "@/app/styles/NftTracker/index.styles";
import { FlexContainer } from "@/app/styles/shared/Container.styles";
import { SearchText, Title } from "@/app/styles/shared/Text.styles";
// utils
import { screens } from "@/utils/data";

const LOCAL_STORAGE_ADDRESS_NFTS = "addressNFTsPortfolio";

const NftTracker = () => {
  const {
    default: {
      images: { defaultImage, loaderGif, logo },
    },
  } = screens;

  const [currentSearchedAddress, setCurrentSearchedAddress] = useState("");
  const [formState, setFormState] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [walletAddresses, setWalletAddresses] = useState(ethereumWhales);

  //   const [ownerNFTPortfolioState, setOwnerNFTPortfolioState] = useState({
  //     ...nftPortfolio,
  //     assets: nftPortfolio.assets.map((item) => ({ ...item, selected: false })),
  //   });

  const [ownerNFTPortfolioState, setOwnerNFTPortfolioState] =
    useOwnerNFTPortfolioStore(({ state, setState }) => [state, setState]);

  const selectedWalletAddress = walletAddresses.find((item) => item.selected)!;

  const handleWalletAddressClick = (_index: number) => {
    setWalletAddresses((prevState) => {
      const updatedWalletAddress = prevState.map((item, index) => ({
        ...item,
        selected: _index == index,
      }));

      return updatedWalletAddress;
    });
  };

  const handleNFTCardClick = (_index: number) => {
    const assets = ownerNFTPortfolioState[
      selectedWalletAddress.text
    ].assets.map((item, index) => ({
      ...item,
      selected: index == _index ? !item.selected : false,
    }));

    setOwnerNFTPortfolioState({
      [selectedWalletAddress.text]: {
        ...ownerNFTPortfolioState[selectedWalletAddress.text],
        assets,
      },
    });
  };

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

    const { data, error, success } = await fetchNFTs(formState);

    if (success) {
      const { owner } = data;

      setCurrentSearchedAddress(formState);
      setOwnerNFTPortfolioState({ [owner]: data });
    }
  };

  useEffect(() => {
    // let's fetch the ownerNFTPortfolioState from localStorage if it exists
    const localStorageOwnerNFTPortfolioState = localStorage.getItem(
      LOCAL_STORAGE_ADDRESS_NFTS
    );

    if (localStorageOwnerNFTPortfolioState) {
      setOwnerNFTPortfolioState(JSON.parse(localStorageOwnerNFTPortfolioState));
    }

    Promise.all(
      walletAddresses.map(async ({ text }) => {
        if (!ownerNFTPortfolioState[text]) {
          // let's make API request
          const { data, error, success } = await fetchNFTs(text);

          if (!success) {
            throw error;
          }

          const { owner } = data;

          setOwnerNFTPortfolioState({ [owner]: data });
        }
      })
    )
      .then((res) => {})
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setLoading(false);
    setSearchLoading(false);
    // let's set localStorage
    const keys = Object.getOwnPropertyNames(ownerNFTPortfolioState);

    if (keys.length) {
      localStorage.setItem(
        LOCAL_STORAGE_ADDRESS_NFTS,
        JSON.stringify(ownerNFTPortfolioState)
      );
    }
  }, [ownerNFTPortfolioState]);

  useEffect(() => {
    if (currentSearchedAddress) {
      // let's disable any selected walletAddress
      setWalletAddresses((prevState) => {
        const updatedWalletAddress = prevState.map((item) => ({
          ...item,
          selected: false,
        }));

        return updatedWalletAddress;
      });
    }
  }, [currentSearchedAddress]);

  useEffect(() => {
    const selectedWalletAddress = walletAddresses.find((item) => item.selected);

    if (selectedWalletAddress) {
      setLoading(true);
      setCurrentSearchedAddress("");
      fetchNFTs(selectedWalletAddress.text)
        .then((res) => {
          const { data, error, success } = res;

          if (!success) throw error;

          const { owner } = data;

          setOwnerNFTPortfolioState({ [owner]: data });
        })
        .catch((err) => console.log(err));
    }
  }, [walletAddresses]);

  return (
    <MainNFTTracker $bgImg={logo.src}>
      <FlexContainer $flexDirection="row" $padding={"20px 0px 40px 0px"}>
        <Title>NFT Portfolio Tracker</Title>
      </FlexContainer>
      <FlexContainer $flexDirection="column" $alignItems="flex-start">
        <FlexContainer $flexDirection="row" $width="fit-content">
          <SearchBar
            disabled={formState.length == 0}
            loading={searchLoading}
            id="input_search"
            name="input_search"
            placeholder="Owner: 0xffdd..."
            value={formState}
            onChange={handleSearchBarChange}
            searchFunction={handleSearchSubmit}
          />
          {currentSearchedAddress.length > 0 ? (
            <FlexContainer
              $flexDirection="row"
              $width="fit-contet"
              $padding="0px 0px 0px 15px"
            >
              <SearchText $opacity={"0.4"}>Showing Results for: </SearchText>
              <SearchText>{currentSearchedAddress}</SearchText>
            </FlexContainer>
          ) : (
            <></>
          )}
        </FlexContainer>
        <AddressScroller>
          <FlexContainer
            $flexDirection="row"
            $justifyContent="flex-start"
            $width="fit-content"
          >
            {walletAddresses.reverse().map(({ text, selected }, key) => (
              <AddressButton
                key={key}
                $selected={selected}
                onClick={() => handleWalletAddressClick(key)}
              >
                {text}
              </AddressButton>
            ))}
          </FlexContainer>
        </AddressScroller>
      </FlexContainer>
      <NFTCardScroller>
        {loading ? (
          <FlexContainer
            $height="100%"
            $alignItems="center"
            $justifyContent="center"
          >
            <Loader src={loaderGif.src} $size="80px" />
          </FlexContainer>
        ) : (
          <FlexContainer
            $flexDirection="row"
            $flexWrap="wrap"
            $justifyContent="flex-start"
            $alignItems="flex-start"
          >
            {currentSearchedAddress.length > 0 ? (
              ownerNFTPortfolioState[currentSearchedAddress]?.assets.length ==
                0 || !ownerNFTPortfolioState[currentSearchedAddress] ? (
                <FlexContainer
                  $height="100%"
                  $alignItems="center"
                  $justifyContent="center"
                >
                  <SearchText>No NFTs found</SearchText>
                </FlexContainer>
              ) : (
                ownerNFTPortfolioState[currentSearchedAddress]?.assets.map(
                  (
                    {
                      collectionName,
                      collectionTokenId,
                      description,
                      imageUrl,
                      selected,
                    },
                    key
                  ) => (
                    <NFTCard
                      key={key}
                      $bgImg={imageUrl || defaultImage.src}
                      $selected={selected}
                      $tokenId={`"#${collectionTokenId}"`}
                      onClick={() => handleNFTCardClick(key)}
                    >
                      <NFTCardContainer $selected={selected}>
                        <FlexContainer
                          $flexDirection="row"
                          $alignItems="center"
                          $justifyContent="flex-start"
                          $padding="10px 20px"
                        >
                          <NFTCardField>Collection:</NFTCardField>
                          <NFTCardText>{collectionName}</NFTCardText>
                        </FlexContainer>
                        {selected ? (
                          <FlexContainer
                            $flexDirection="row"
                            $alignItems="center"
                            $justifyContent={"flex-start"}
                            $padding="10px 20px"
                          >
                            <NFTCardText
                              $fontFamily="Open Sans"
                              $fontSize="1.1rem"
                            >
                              {description}
                            </NFTCardText>
                          </FlexContainer>
                        ) : (
                          <></>
                        )}
                      </NFTCardContainer>
                    </NFTCard>
                  )
                )
              )
            ) : (
              ownerNFTPortfolioState[selectedWalletAddress.text]?.assets.map(
                (
                  {
                    collectionName,
                    collectionTokenId,
                    description,
                    imageUrl,
                    selected,
                  },
                  key
                ) => (
                  <NFTCard
                    key={key}
                    $bgImg={imageUrl || defaultImage.src}
                    $selected={selected}
                    $tokenId={`"#${collectionTokenId}"`}
                    onClick={() => handleNFTCardClick(key)}
                  >
                    <NFTCardContainer $selected={selected}>
                      <FlexContainer
                        $flexDirection="row"
                        $alignItems="center"
                        $justifyContent="flex-start"
                        $padding="10px 20px"
                      >
                        <NFTCardField>Collection:</NFTCardField>
                        <NFTCardText>{collectionName}</NFTCardText>
                      </FlexContainer>
                      {selected ? (
                        <FlexContainer
                          $flexDirection="row"
                          $alignItems="center"
                          $justifyContent={"flex-start"}
                          $padding="10px 20px"
                        >
                          <NFTCardText
                            $fontFamily="Open Sans"
                            $fontSize="1.1rem"
                          >
                            {description}
                          </NFTCardText>
                        </FlexContainer>
                      ) : (
                        <></>
                      )}
                    </NFTCardContainer>
                  </NFTCard>
                )
              )
            )}
          </FlexContainer>
        )}
      </NFTCardScroller>
    </MainNFTTracker>
  );
};

export default NftTracker;
