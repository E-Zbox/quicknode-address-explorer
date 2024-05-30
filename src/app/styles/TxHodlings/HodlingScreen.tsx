import styled from "styled-components";

interface IViewType {
  $isGridView: boolean;
}

interface IViewButton {
  $bgImg: string;
  $selected: boolean;
}

export const HodlingScroller = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
`;

export const HodlingContainer = styled.div<IViewType>`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  ${({ $isGridView }) =>
    $isGridView
      ? `
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `
      : `
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  `};
  cursor: pointer;
`;

export const Card = styled.div<IViewType>`
  ${({ $isGridView }) =>
    $isGridView
      ? `
    // grid view
    --size: 200px;
    position: relative;
    width: var(--size);
    height: var(--size);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    border-radius: 10px;
    background-color: #4443;
    margin: 0px var(--ten-px) var(--ten-px) 0px;
    `
      : `
    // list view
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 3px;
    padding: calc(var(--ten-px)*3);
    margin-bottom: var(--three-px);
    background-color: #fff1;
    `}
`;

export const CoinImageDiv = styled.div<IViewType>`
  --size: ${({ $isGridView }) => ($isGridView ? "90px" : "24px")};
  height: var(--size);
  width: var(--size);
  display: grid;
  place-items: center;
  ${({ $isGridView }) =>
    $isGridView
      ? `
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `
      : ``}
`;

export const CoinImage = styled.img`
  width: 90%;
  height: auto;
`;

export const CoinName = styled.h3<IViewType>`
  width: fit-content;
  font-family: "Source Sans Pro";
  font-size: 1.1rem;
  font-weight: normal;
  margin: 0px calc(var(--ten-px) * 3) 0px var(--seven-px);
  display: ${({ $isGridView }) => ($isGridView ? "none" : "initial")};
`;

export const CoinSymbol = styled.h3<IViewType>`
  width: fit-content;
  font-family: "Open Sans";
  font-weight: bolder;
  opacity: 0.4;
  ${({ $isGridView }) =>
    $isGridView
      ? `
        position: absolute;
        top: 10%;
        right: 10%;
        font-size: 0.8rem;
    `
      : `
        font-size: 1rem;
    `}
`;

export const CoinBalance = styled.h3<IViewType>`
  font-family: "Source Sans Pro";
  ${({ $isGridView }) =>
    $isGridView
      ? `
        width: 100%;
        text-align: center;
        font-size: 0.9rem;
        padding: calc(var(--ten-px)*2) 0px;
    `
      : `
  font-size: 1rem;
      `}
`;

export const ViewButton = styled.button<IViewButton>`
  --size: 40px;
  width: var(--size);
  height: var(--size);
  outline: none;
  border: none;
  scale: ${({ $selected }) => ($selected ? "1.1" : "0.9")};
  margin-right: var(--ten-px);
  border: 1px solid #eed1;
  background: url(${({ $bgImg }) => $bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: ${({ $selected }) =>
    $selected ? "1px 1px 15px #eed1, 0px 0px 15px #9991" : "1px 1px 5px #eed1"};

  &:active {
    scale: ${({ $selected }) => ($selected ? "1.1" : "0.95")};
  }

  &:hover {
    scale: ${({ $selected }) => ($selected ? "1.1" : "1")};
  }
`;
