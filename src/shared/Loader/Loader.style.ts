import styled from "styled-components";

export const Loader = styled.div`
    border: 4px solid rgba(238, 236, 236, 0.1);
    border-radius: 50%;
    border-top-color: #000;
    width: 5rem;
    height: 5rem;
    animation: spin 1s linear infinite;
    margin: auto;

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`; 