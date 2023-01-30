import React from "react";
import { Content } from "./styles";

export type ButtonProps = {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    children?: React.ReactNode;
    color?: 'primaryPurple' | 'primaryGreen' | 'secondaryPurple' | 'secondaryGreen';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset' | undefined;
}

function Button({
    onClick,
    children,
    color = 'primaryPurple',
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