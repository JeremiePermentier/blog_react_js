import React from "react";
import styled from "styled-components";

const StyledCoverImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

type CoverImageProps = {
  src: string;
  alt?: string;
};

export const CoverImage: React.FC<CoverImageProps> = ({ src, alt }) => {
  return <StyledCoverImage src={src} alt={alt} />;
};
