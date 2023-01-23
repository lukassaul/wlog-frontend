import styled, { css } from 'styled-components';
import { ButtonProps } from '.';

const COLOR = {
    primary: css`
        background: #35736E;
        border-radius: 18px;
        color: #fff;
        padding: 0.5em 2.5em;
        filter: drop-shadow(2px 4px 6px #c4c4c4);
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