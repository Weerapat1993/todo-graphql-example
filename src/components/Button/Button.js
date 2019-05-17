import { func, string, bool, any, number, oneOfType } from 'prop-types';
import { get } from 'lodash';
import styled, { css } from 'styled-components';

const fontColor = (props, color) => {
  switch (color) {
    case 'primary':
    case 'warning':
    case 'success':
    case 'danger':
    case 'default':
      return get(props, `theme.btn.${color}`, color);
    default:
      return color;
  }
};

const fontHoverColor = (props, color) => {
  switch (color) {
    case 'primary':
    case 'warning':
    case 'success':
    case 'danger':
    case 'default':
      return get(props, `theme.btnHover.${color}`, color);
    default:
      return color;
  }
};

export const Button = styled.button`
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  color: ${props => props.textColor || props.outline ? fontColor(props, props.color) : '#ffffff'};
  padding: ${props => props.padding};
  border: 1px solid ${props => props.outline ? fontColor(props, props.color) : 'transparent'};
  background: ${props => props.outline ? 'transparent' : fontColor(props, props.color)};
  border-radius: ${props => props.radius};
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.size ? `${props.size}px` : props.theme.fontSize};
  font-weight: ${props => props.bold ? `bold` : 'normal'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  width: ${props => props.width ? `${props.width}px` : 'auto'};
  line-height: ${props => props.height ? `${props.height}px` : 'auto'};
  height: ${props => props.height ? `${props.height}px` : 'auto'};
  ${props => props.block && 'display: block; width: 100%;'}
  margin: 0;
  text-decoration: none;
  text-align: center;
  ${props => props.ellipsis && css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `}
  ${props => props.styled(props)}

  &:hover {
    color: ${props => props.hoverTextColor || props.outline && fontHoverColor(props, props.color)};
    background: ${props => props.outline ? 'transparent' : props.color && fontHoverColor(props, props.color)};
  }
`;

Button.propTypes = {
  color: string,
  hoverColor: string,
  textColor: string,
  hoverTextColor: string,
  styled: func,
  outline: bool,
  children: any,
  width: number,
  height: number,
  block: bool,
  size: number,
  disabled: bool,
  padding: oneOfType([string, number]),
  radius: oneOfType([string, number]),
  ellipsis: bool,
  bold: bool
};

Button.defaultProps = {
  color: 'default',
  hoverColor: 'default',
  textColor: '',
  hoverTextColor: '',
  styled: () => '',
  outline: false,
  children: '',
  width: 0,
  height: 40,
  block: false,
  size: 0,
  disabled: false,
  padding: '0 16px',
  radius: 0,
  ellipsis: false,
  bold: false
};

export default Button;
