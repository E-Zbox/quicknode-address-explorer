import styled from "styled-components";

interface IItem {
  $selected: boolean;
}

export const MainMenu = styled.main`
  height: 80px;
  width: fit-content;
  position: fixed;
  top: 12px;
  right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
`;

export const Item = styled.div<IItem>`
  position: relative;
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0px 1px;
  background-color: #000a;
  overflow: hidden;
  cursor: pointer;
  padding: 0px calc(var(--ten-px) * 3);
  border-radius: ${({ $selected }) => ($selected ? "0px 0px 3px 3px" : "0px")};

  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    height: 3px;
    width: ${({ $selected }) => ($selected ? "100%" : "0px")};
    background-color: ${({ $selected, theme: { blue } }) =>
      $selected ? blue : `transparent`};
    transition: 300ms linear;
  }

  &:hover {
    &::after {
      width: 100%;
      background-color: ${({ $selected, theme: { blue } }) =>
        $selected ? blue : `${blue}45`};
    }
  }
`;

export const ItemText = styled.h3`
  margin-left: calc(var(--ten-px));
`;

export const ItemImage = styled.img`
  --size: 32px;
  height: var(--size);
  width: var(--size);
`;
