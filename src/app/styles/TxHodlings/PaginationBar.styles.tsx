import styled from "styled-components";

interface IMainPaginationBar {
  $hideShadow?: boolean;
}

interface IButton {
  $moveToLeft: boolean;
}

export const MainPaginationBar = styled.main<IMainPaginationBar>`
  width: 250px;
  height: 50px;
  max-width: calc(100vw - 20px);
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: space-evenly;
  box-shadow: ${({ $hideShadow, theme: { darkPurple01 } }) =>
    $hideShadow ? "" : `2px 3px 15px ${darkPurple01}33`};
  background-color: ${({ theme: { darkPurple01 } }) => `${darkPurple01}00`};
  border-radius: 5px;
  margin: calc(var(--ten-px)) 0px;

  * {
    color: ${({ theme: { darkPurple01 } }) => darkPurple01};
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PageText = styled.h3`
  font-family: "Nunito Sans";
  font-size: 1rem;
  font-weight: 600;
  margin-right: var(--seven-px);
`;

export const PageInput = styled.input`
  height: 35px;
  width: 40px;
  text-align: center;
  border: none;
  padding: var(--ten-px);
  font-size: 1.4rem;
  font-weight: bolder;
  background-color: ${({ theme: { white } }) => `${white}21`};
  margin-right: var(--ten-px);
  border-radius: 3px;
  outline: 1px solid ${({ theme: { white } }) => `${white}2e`};

  &:focus {
    outline: 2px solid ${({ theme: { blue } }) => `${blue}94`};
  }
`;

export const Button = styled.button<IButton>`
  width: fit-content;
  height: fit-content;
  outline: none;
  display: grid;
  place-items: center;
  background: ${({ theme: { white } }) => `${white}15`};
  scale: 1;
  border-radius: 5px;
  padding: calc(var(--seven-px) * 1.5);
  border: none;

  &:active {
    scale: 0.9;
  }

  &:hover {
    transform: translateX(
      ${({ $moveToLeft }) => ($moveToLeft ? "-5px" : "5px")}
    );
    background: linear-gradient(
      ${({ $moveToLeft, theme: { white } }) =>
        $moveToLeft
          ? `to left, ${white}75, ${white}05`
          : `to left, ${white}05, ${white}75`}
    );
  }
`;
