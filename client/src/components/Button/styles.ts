import styled, { css } from 'styled-components';
import { ButtonProps } from '.';

const COLOR = {
    primary: css`
        color: #fff;
        background: #302D2D;
        padding: 6px 10px;
        border-radius: 5px;
    `,
    secondary: css`
        color: #fff;
        background: #302D2D;
        padding: 20px 50px;
        border-radius: 10px;
    `
}

const DISABLED = css`
  cursor: not-allowed;
  background: #d4d4d4;
  color: #f5f5f5;
`;

export const Content = styled.button<ButtonProps>`
  cursor: pointer;
  border: none;
  font-weight: 500;
  outline: none;
  transition: all 0.2s;
  ${(props) => props.color && COLOR[props.color]}
  ${(props) => props.disabled && DISABLED}
`;