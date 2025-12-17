import React from "react";
import styled from "styled-components";
import { StyledTitle } from "./Title.style";

type TitleProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6; // H1 à H6
  children: React.ReactNode;
};

export const Title: React.FC<TitleProps> = ({ level = 2, children }) => {
  return <StyledTitle as={`h${level}`} level={level}>{children}</StyledTitle>;
};
