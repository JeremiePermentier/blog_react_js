import styled from "styled-components";

export const Container = styled.div<{ textAlign?: string }>`
    text-align: ${props => props.textAlign || "initial"};
    margin: 1rem 0;
`;