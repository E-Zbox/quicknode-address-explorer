"use client";
import React, { useCallback, useEffect, useState } from "react";
// api
import { getTransactionsByAddress } from "@/api";
import { ITransactionsByAddressResult } from "@/api/interface";
// components
import SearchBar from "@/app/components/SearchBar";
import PaginationBar from "@/app/components/txHodlings/PaginationBar";
// styles
import {
  MainTransactionTable,
  Transaction,
  TransactionScrollerTab,
  TransactionTable,
  TransactionText,
} from "@/app/styles/TxHodlings/TxScreen.styles";
import {
  FlexContainer,
  ScrollerContainer,
} from "@/app/styles/shared/Container.styles";
import { SearchText } from "@/app/styles/shared/Text.styles";

const TxScreen = () => {
  const [addressTransactions, setAddressTransactions] = useState<
    ITransactionsByAddressResult[]
  >([]);
  const [currentSearchedAddress, setCurrentSearchedAddress] = useState("");
  const [formState, setFormState] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({
    page: 1,
    maxItemsPerPage: 5,
    totalPages: 0,
  });
  const [searchLoading, setSearchLoading] = useState(false);
  const [scrollerRefHeight, setScrollerRefHeight] = useState("");

  const scrollerRef = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        setScrollerRefHeight(`${node.getBoundingClientRect().height}px`);
      }
    },
    [searchLoading]
  );

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

    const { data, error, success } = await getTransactionsByAddress(formState);

    if (success) {
      const { pageNumber: page, paginatedItems, totalItems, totalPages } = data;
      setCurrentSearchedAddress(formState);
      setAddressTransactions(paginatedItems);
      setPageData({
        page,
        maxItemsPerPage: totalItems / totalPages,
        totalPages: totalPages,
      });
    }
  };

  useEffect(() => {
    setLoading(false);
    setSearchLoading(false);
  }, [pageData]);

  return (
    <FlexContainer $height="100%">
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
      {addressTransactions.length > 0 ? (
        <ScrollerContainer
          ref={scrollerRef}
          $height="100%"
          $overflow="hidden scroll"
        >
          <FlexContainer $alignItems="center">
            <MainTransactionTable $height={scrollerRefHeight}>
              <TransactionTable>
                <Transaction>
                  <TransactionScrollerTab $width={"100%"}>
                    <TransactionText $fontWeight={600}>From</TransactionText>
                  </TransactionScrollerTab>
                  <TransactionScrollerTab $width={"100%"}>
                    <TransactionText $fontWeight={600}>To</TransactionText>
                  </TransactionScrollerTab>
                  <TransactionScrollerTab $width={"400px"}>
                    <TransactionText $fontWeight={600}>
                      Timestamp
                    </TransactionText>
                  </TransactionScrollerTab>
                </Transaction>
                {addressTransactions.map(
                  ({ fromAddress, toAddress, blockTimestamp }, key) => {
                    const fullDate = new Date(blockTimestamp);
                    const date = fullDate.getDate();
                    const month = fullDate.getMonth() + 1;
                    const hours = fullDate.getHours();
                    const minutes = fullDate.getMinutes();
                    const seconds = fullDate.getSeconds();
                    const dateText = `${date > 9 ? date : `0${date}`}/${
                      month > 9 ? month : `0${month}`
                    }/${fullDate.getUTCFullYear()}`;
                    const timeText = `${hours > 9 ? hours : `0${hours}`}:${
                      minutes > 9 ? minutes : `0${minutes}`
                    }:${seconds > 9 ? seconds : `0${seconds}`}`;

                    return (
                      <Transaction key={key}>
                        <TransactionScrollerTab $width={"100%"}>
                          <TransactionText $fontSize="1rem">
                            {fromAddress}
                          </TransactionText>
                        </TransactionScrollerTab>
                        <TransactionScrollerTab $width={"100%"}>
                          <TransactionText $fontSize="1rem">
                            {toAddress}
                          </TransactionText>
                        </TransactionScrollerTab>
                        <TransactionScrollerTab $width={"400px"}>
                          <TransactionText $fontSize="1rem">
                            {`${timeText} ${dateText}`}
                          </TransactionText>
                        </TransactionScrollerTab>
                      </Transaction>
                    );
                  }
                )}
                <FlexContainer $height={"100%"} $justifyContent="flex-end">
                  <PaginationBar
                    pageData={pageData}
                    setPageData={setPageData}
                  />
                </FlexContainer>
              </TransactionTable>
            </MainTransactionTable>
          </FlexContainer>
        </ScrollerContainer>
      ) : (
        <FlexContainer
          $height="100%"
          $alignItems="center"
          $justifyContent="center"
        >
          <SearchText>
            Enter a wallet address to view its latest transactions
          </SearchText>
        </FlexContainer>
      )}
    </FlexContainer>
  );
};

export default TxScreen;
