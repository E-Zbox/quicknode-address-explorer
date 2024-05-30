import styled from "styled-components";

interface IMainTransactionTable {
  $height: string;
}

interface ITransactionScrollerTab {
  $width?: string;
}

interface ITransactionText {
  $fontSize?: string;
  $fontWeight?: number;
}

export const MainTransactionTable = styled.main<IMainTransactionTable>`
  height: ${({ $height }) => $height};
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const TransactionTable = styled.div`
  // height: 390px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: calc(var(--ten-px) * 2);
  padding: 0px var(--three-px);
  background-color: ${({ theme: { white } }) => `${white}9A`};
  border-radius: 0px;
  overflow: hidden;
`;

export const Transaction = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid
    ${({ theme: { darkPurple01 } }) => `${darkPurple01}33`};
  border-radius: 3px;
`;

export const TransactionTableTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: bolder;
  color: ${({ theme: { white } }) => white};
  text-transform: capitalize;
`;

export const TransactionTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: bolder;
  color: ${({ theme: { darkPurple01 } }) => darkPurple01};
`;

export const TransactionScrollerTab = styled.div<ITransactionScrollerTab>`
  width: ${({ $width }) => $width || "fit-content"};
  overflow-x: scroll;
  margin: 0px calc(var(--three-px) * 0.5);
`;

export const TransactionText = styled.h3<ITransactionText>`
  //   width: fit-content;
  font-family: "Nunito Sans";
  font-size: ${({ $fontSize }) => $fontSize || ""};
  font-weight: ${({ $fontWeight }) => $fontWeight || "400"};
  padding: calc(var(--ten-px) * 1.5) 0px;
  text-align: left;
  color: ${({ theme: { darkPurple01 } }) => darkPurple01};
`;
