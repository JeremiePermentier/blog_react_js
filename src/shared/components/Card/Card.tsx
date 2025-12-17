import React, { type ReactNode } from "react";
import { CardContainer } from "./Card.style";

type CardProps = {
  children: ReactNode;
};

export const Card: React.FC<CardProps> = ({ children }) => {
  return <CardContainer>{children}</CardContainer>;
};
