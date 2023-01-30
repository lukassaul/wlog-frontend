import styled, { css } from 'styled-components';
import { ButtonProps } from '.';

const COLOR = {
    primaryPurple: css`
        color: #fff;
        padding: 0.5em 2.5em;
        background: #3B3C4E;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 40px;
    `,
    primaryGreen: css`
        color: #fff;
        padding: 0.5em 2.5em;
        background: #F9BF29;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 40px;
    `,
    secondaryPurple: css`
        color: #fff;
        padding: 0.5em 2.5em;
        background: #0177FB;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 40px;
    `,
    secondaryGreen: css`
        color: #fff;
        padding: 0.5em 2.5em;
        background: #0177FB;
        border-radius: 40px;
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