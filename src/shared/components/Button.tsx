import styled from "styled-components";

const ButtonStyled = styled.button`
    padding: 1rem;
    border-radius: 5px;
    border: none;
    background-color: #000;
    color: #fff;
    cursor: pointer;
`;

type ButtonProps = {
    text: string;
    submit?: boolean;
};

const Button: React.FC<ButtonProps> = ({text, submit})=> {
    return (
        <ButtonStyled type={submit ? "submit" : "button"}>{text}</ButtonStyled>
    );
};

export default Button;