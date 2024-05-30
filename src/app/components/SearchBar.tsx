"use strict";
import React from "react";
// styles
import { Loader } from "@/app/styles/Loader.styles";
import {
  MainSearch,
  SubmitButton,
  TextInput,
} from "../styles/SearchBar.styles";
// utils
import { screens } from "@/utils/data";

interface IProps {
  disabled: boolean;
  loading: boolean;
  id: string;
  name: string;
  placeholder: string;
  borderRadius?: string;
  width?: string;
  value: string;
  onChange: React.ChangeEventHandler;
  searchFunction: () => void;
}

const SearchBar = ({
  disabled,
  loading,
  id,
  name,
  placeholder,
  borderRadius,
  width,
  value,
  onChange,
  searchFunction,
}: IProps) => {
  const {
    default: {
      images: { loaderGif, searchIcon },
    },
  } = screens;
  return (
    <MainSearch $borderRadius={borderRadius} $width={width}>
      <TextInput
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {loading ? (
        <Loader src={loaderGif.src} $size="40px" />
      ) : (
        <SubmitButton
          $bgImg={searchIcon.src}
          $disabled={disabled}
          onClick={searchFunction}
          disabled={disabled}
        ></SubmitButton>
      )}
    </MainSearch>
  );
};

export default SearchBar;
