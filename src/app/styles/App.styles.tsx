import styled from "styled-components";

export const MainApp = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  box-shadow: 2px 2px 8px #000 inset, 0px 0px 20px #000a inset,
    0px 0px 20px ${({ theme: { darkPurple01 } }) => darkPurple01} inset;
  background-color: ${({ theme: { darkPurple01 } }) => darkPurple01};
`;
