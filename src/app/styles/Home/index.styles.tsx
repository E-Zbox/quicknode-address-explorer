import styled from "styled-components";

interface IBody {
  $isNormal: boolean;
}

interface IImage {
  $bgImg: string;
}

interface IFloaterButton {
  $selected: boolean;
}

export const MainHome = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px calc(var(--ten-px) * 8);
`;

export const MainScroller = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
`;

export const Image = styled.div<IImage>`
  width: 400px;
  height: 400px;
  background: url(${({ $bgImg }) => $bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 3px;
`;

export const Title = styled.h3`
  font-family: "Open Sans";
  font-size: 2.5rem;
  font-weight: bolder;
`;

export const Body = styled.span<IBody>`
  display: inline;
  font-family: "Open Sans";
  font-size: 1.29rem;
  font-weight: ${({ $isNormal }) => ($isNormal ? "200" : "900")};
  opacity: ${({ $isNormal }) => ($isNormal ? "0.7" : "1")};
  letter-spacing: 2px;
  line-height: 2.3rem;
`;

export const Floater = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
`;

export const FloaterButton = styled.div<IFloaterButton>`
  width: 40px;
  height: 4px;
  margin-right: calc(var(--ten-px) * 2);
  border-radius: 4px;
  background-color: ${({ $selected }) => ($selected ? "#FFF" : "#FFF4")};

  &:hover {
    background-color: ${({ $selected }) => ($selected ? "#FFF" : "#FFF9")};
  }
`;
