import styled from "styled-components";

interface IMainNFTTracker {
  $bgImg: string;
}

interface IAddressButton {
  $selected: boolean;
}

interface INFTCard {
  $bgImg: string;
  $selected: boolean;
  $tokenId: string;
}

interface INFTCardContainer {
  $selected: boolean;
}

interface INFTCardText {
  $fontFamily?: string;
  $fontSize?: string;
}

export const MainNFTTracker = styled.main<IMainNFTTracker>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: calc(var(--ten-px) * 2) calc(var(--ten-px) * 3);
  background: linear-gradient(
      ${({ theme: { darkPurple01 } }) => `to top, ${darkPurple01}fd, #241223f1`}
    ),
    url(${({ $bgImg }) => $bgImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: scroll;
`;

export const AddressScroller = styled.main`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: scroll;
  margin: calc(var(--ten-px) * 2.5) 0px calc(var(--ten-px) * 3.5);
`;

export const AddressButton = styled.button<IAddressButton>`
  --color02: ${({ theme: { darkPurple02 } }) => darkPurple02};
  --color04: ${({ theme: { darkPurple04 } }) => darkPurple04};
  font-size: 0.9rem;
  font-weight: 200;
  border: none;
  outline: none;
  border-radius: 20px;
  letter-spacing: 1px;
  margin-right: var(--ten-px);
  padding: var(--ten-px) calc(var(--ten-px) * 2);
  color: ${({ $selected }) => ($selected ? "#fff" : "var(--color04)")};
  background: ${({ $selected }) =>
    $selected ? "var(--color02)" : "transparent"};
  border: 1px solid
    ${({ $selected }) => ($selected ? "transparent" : "var(--color04)")};

  &:last-child {
    margin-right: 0px;
  }

  &:hover {
    background: ${({ $selected }) => ($selected ? "var(--color02)" : "#fff2")};
  }
`;

export const NFTCardScroller = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  padding: calc(var(--ten-px) * 2);
  box-shadow: 2px 2px 8px #0003 inset, 0px 0px 20px #0008 inset;
`;

export const NFTCard = styled.main<INFTCard>`
  position: relative;
  width: ${({ $selected }) => ($selected ? "65%" : "32%")};
  height: 400px;
  border-radius: 15px;
  box-shadow: 0px 0px 5px ${({ theme: { darkBlue01 } }) => `${darkBlue01}42`};
  background: linear-gradient(
      to top,
      ${({ $selected }) => ($selected ? "#0002, #0002" : "#0005, #fff4")}
    ),
    url(${({ $bgImg }) => $bgImg});
  background-position: ${({ $selected }) =>
    $selected ? "left center" : "center top"};
  background-repeat: no-repeat;
  background-size: ${({ $selected }) => ($selected ? "30% auto" : "auto 100%")};
  overflow: hidden;
  margin: 0px auto;
  margin-bottom: calc(var(--ten-px) * 2.5);

  &::before {
    content: ${({ $selected, $tokenId }) => ($selected ? `${$tokenId}` : "")};
    position: absolute;
    top: 0px;
    right: 0px;
    height: 50px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    border-radius: 0px 15px 0px 15px;
    padding: 0px
      ${({ $selected }) => ($selected ? "calc(var(--ten-px) * 2.5)" : "0px")};
    background-color: ${({ theme: { blue } }) => blue};
    opacity: ${({ $selected }) => ($selected ? "0.9" : "0.001")};
    z-index: 2;
  }

  &:hover {
    background-size: ${({ $selected }) =>
      $selected ? "30% auto" : "auto 120%"};
    & > div {
      height: ${({ $selected }) => ($selected ? "100%" : "80px")};
      width: ${({ $selected }) => ($selected ? "70%" : "100%")};
      right: ${({ $selected }) => ($selected ? "0px" : "")};

      * {
        visibility: visible;
      }
    }
  }
`;

export const NFTCardContainer = styled.div<INFTCardContainer>`
  position: absolute;
  bottom: 0px;
  left: ${({ $selected }) => (!$selected ? "0px" : "")};
  right: ${({ $selected }) => ($selected ? "0px" : "")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${({ $selected }) => ($selected ? "100%" : "0px")};
  width: ${({ $selected }) => ($selected ? "70%" : "100%")};
  background: linear-gradient(
    ${({ $selected }) =>
      $selected ? "to right, #0000, #1118, #1118 " : "to top, #000a, #0006"}
  );
  border-radius: ${({ $selected }) =>
    $selected ? "0px 15px 15px 0px" : "1px"};
  box-shadow: 0px -150px 300px #1115;
  z-index: 1;

  * {
    visibility: ${({ $selected }) => ($selected ? "visible" : "hidden")};
  }
`;

export const NFTCardField = styled.h3`
  font-family: "Open Sans";
  font-size: 1rem;
  font-weight: bold;
  color: #888a;
  margin-right: var(--ten-px);
  text-transform: uppercase;
`;

export const NFTCardText = styled.h3<INFTCardText>`
  font-family: ${({ $fontFamily }) => $fontFamily || "Source Sans Pro"};
  font-size: ${({ $fontSize }) => $fontSize || "1.3rem"};
  font-weight: 100;
  color: #fff;
  height: fit-content;
  max-height: 250px;
  overflow-y: scroll;
`;
