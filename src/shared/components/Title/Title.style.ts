import styled, { css } from "styled-components";

export const StyledTitle = styled.h1<{ level: number }>`
  margin: 0.5rem 0;
  font-weight: 600;
  text-transform: capitalize;

  ${({ level }) => level === 1 && css`
    font-size: 2.5rem;
  `}
  ${({ level }) => level === 2 && css`
    font-size: 2rem;
  `}
  ${({ level }) => level === 3 && css`
    font-size: 1.5rem;
  `}
  ${({ level }) => level === 4 && css`
    font-size: 1.25rem;
  `}
  ${({ level }) => level === 5 && css`
    font-size: 1rem;
  `}
  ${({ level }) => level === 6 && css`
    font-size: 0.875rem;
  `}
`;