import type { Metadata } from "next";
import React from "react";
// components
import Layout from "./components/Layout";

export const metadata: Metadata = {
  title: "Quicknode Address Explorer",
  description:
    "A quicknode powered Dapp that allows you view and address HODL position and past transactions on-chain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
