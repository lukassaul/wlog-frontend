import React from "react";
import { Content } from "./styles";

export type ButtonProps = {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    children?: React.ReactNode;
    color?: 'primary' | 'secondary';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset' | undefined;
}

function Button({
    onClick,
    children,
    color = 'primary',
    disabled,
    type
}: ButtonProps) {
    return (
        <Content onClick={onClick} color={color} disabled={disabled} type={type}>
            {children}
        </Content>
    )
}

export default Button;