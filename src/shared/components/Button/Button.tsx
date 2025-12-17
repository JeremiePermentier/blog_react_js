import React from "react";
import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "small" | "medium" | "large";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  loading: boolean;
};

const variantStyles = {
  primary: css`
    background-color: #0070f3;
    color: #fff;
    &:hover { background-color: #005bb5; }
  `,
  secondary: css`
    background-color: #eaeaea;
    color: #000;
    &:hover { background-color: #cacaca; }
  `,
  danger: css`
    background-color: #ff4d4f;
    color: #fff;
    &:hover { background-color: #d9363e; }
  `,
};

const sizeStyles = {
  small: css`
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  `,
  medium: css`
    padding: 0.5rem 1rem;
    font-size: 1rem;
  `,
  large: css`
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  `,
};

const StyledButton = styled.button<{ variant: ButtonVariant; size: ButtonSize; loading: boolean }>`
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  ${({ variant }) => variantStyles[variant]};
  ${({ size }) => sizeStyles[size]};
  ${({ loading }) => loading && 'cursor: not-allowed;'}
`;

const Loader = styled.div`
  border: 4px solid rgba(238, 236, 236, 0.1);
  border-radius: 50%;
  border-top-color: #FFF;
  width: 1rem;
  height: 1rem;
  animation: spin 1s linear infinite;
  margin: auto;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  loading,
  ...props
}) => {
  return (
    <StyledButton variant={variant} size={size} {...props} loading={loading}>
      {loading ? <Loader /> : children}
    </StyledButton>
  );
};

export default Button;
