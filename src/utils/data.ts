// .
import home from "./home";
import menu from "./menu";
import txHodlings from "./txHodlings";
// assets
import defaultImage from "../../public/icons8-no-image-96.png";
import loaderGif from "../../public/loader.gif";
import logo from "../../public/logo.png";
import searchIcon from "../../public/icons8-search-96.png";

export const devices = {};

export const screens = {
  default: {
    images: {
      defaultImage,
      loaderGif,
      logo,
      searchIcon,
    },
  },
  home,
  menu,
  txHodlings,
};

export const theme = {
  blue: "#4ebfe4",
  darkBlue01: "#3c559e",
  darkBlue02: "#287ab3",
  darkBlue03: "#3f90c6",
  darkPurple01: "#2d104a", // #42306a
  darkPurple02: "#7356a5",
  darkPurple03: "#9d82c0",
  darkPurple04: "#e9d2f7",
  purple: "#7b7fdf",
  white: "#FFFFFF",
};
