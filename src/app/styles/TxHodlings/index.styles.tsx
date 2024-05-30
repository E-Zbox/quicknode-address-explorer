import styled from "styled-components";

interface IMainTxHistory {
  $bgImg: string;
}

interface ITabNavigation {
  $selectedIndex: 0 | 1;
}

interface ITabTitle {
  $selected: boolean;
}

interface ITabScreen {
  $width: string;
}

export const MainTxHistory = styled.main<IMainTxHistory>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  background: url(${({ $bgImg }) => $bgImg});
  background-repeat: repeat;
  background-size: auto 50%;
  background-attachment: fixed;
  padding: calc(var(--ten-px) * 2) calc(var(--ten-px) * 3);

  * {
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ${({ theme: { darkPurple01 } }) =>
        `ellipse at top center, ${darkPurple01}fd, #000000f3, #000000f3`}
    );
    z-index: 0;
  }
`;

export const MainTab = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: calc(var(--three-px) * 2) 0px;
`;

export const TabNavigation = styled.div<ITabNavigation>`
  position: relative;
  height: 60px;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 90%;
    transform: translate(-50%, -50%);
    background-color: #eee1;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: ${({ $selectedIndex }) => `${$selectedIndex * 50}%`};
    height: 2px;
    width: 50%;
    border-radius: 5px;
    background-color: ${({ theme: { blue } }) => blue};
    transition: 350ms ease-out;
  }
`;

export const TabTitle = styled.h3<ITabTitle>`
  --color: ${({ $selected }) => ($selected ? "#eeee" : "#eee7")};
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color);
  text-align: center;
  cursor: pointer;

  &:active {
    scale: 0.98;
  }

  &:hover {
    background-color: ${({ $selected }) => ($selected ? "" : "#aaa3")};
  }
`;

export const TabController = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
`;

export const TabScreen = styled.main<ITabScreen>`
  height: 100%;
  width: ${({ $width }) => $width};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: calc(var(--seven-px) * 2);
`;
