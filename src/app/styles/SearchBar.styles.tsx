import styled, { keyframes } from "styled-components";

interface IMainSearch {
  $borderRadius?: string;
  $width?: string;
}

interface IButton {
  $bgImg: string;
  $disabled: boolean;
}

const scaleAnimation = keyframes`
    60% {
        scale: 1.05;
    }
    100% {
        scale: 0.9;
    }
`;

export const MainSearch = styled.main<IMainSearch>`
  height: 50px;
  width: ${({ $width }) => $width || "250px"};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: 2px solid #9994;
  background-color: #9994;
  padding-right: var(--seven-px);
  overflow: hidden;
  border-radius: ${({ $borderRadius }) => $borderRadius || "7px"};
`;

export const TextInput = styled.input`
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 200;
  padding: var(--seven-px);
  padding-left: calc(var(--ten-px) * 1.5);
  background: transparent;
  -webkit-appearance: transparent;

  &:active,
  &:focus,
  &:-webkit-autofill,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:hover {
    background: transparent;
  }
`;

export const SubmitButton = styled.button<IButton>`
  width: 40px;
  height: 40px;
  outline: none;
  border: none;
  background: url(${({ $bgImg }) => $bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  scale: 0.9;
  opacity: ${({ $disabled }) => ($disabled ? "0.3" : "1")};

  &:hover {
    animation: ${scaleAnimation} 500ms forwards linear;
  }
`;
