import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Icon from "./Icon";
import Box from "./Box";
import {
  applyVariations,
  getPaletteColor,
  deprecatedColorValue
} from "./utils";

const Checkbox = props => {
  const { disabled, size } = props;

  // Add 4px to Icon's height and width to account for size reduction caused by adding padding to SVG element
  const borderAdjustedSize = size + 4;

  return (
    <CheckBoxWrapper disabled={disabled}>
      <StyledInput type="checkbox" {...props} role="checkbox" />
      <Icon name="BoxChecked" size={borderAdjustedSize} data-name="checked" />
      <Icon name="BoxEmpty" size={borderAdjustedSize} data-name="empty" />
    </CheckBoxWrapper>
  );
};

const CheckBoxWrapper = styled(Box)`
  display: inline-flex;
  align-items: center;
  position: relative;
  vertical-align: middle;
  padding: 2px;
  cursor: pointer;
  background-color: inherit;
  color: ${props =>
    props.disabled
      ? getPaletteColor("border.base")(props)
      : getPaletteColor("border.light")(props)};

  svg {
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 2px;
  }

  svg[data-name='checked'] {
    display: none;
  }
  
  > input:hover ~ svg[data-name='empty'] {
    color: ${props =>
      props.disabled ? props.theme.colors.borderGray : props.theme.colors.blue};
      }
  }
  
  > input {
    &:focus ~ svg {
      border: 1px solid ${theme.colors.borderGray};
      background-color: ${theme.colors.lightGray};
    }
  }

  > input:checked {
    & ~ svg[data-name='checked'] {
      display: inline-block;
      color: ${props =>
        props.disabled
          ? getPaletteColor("border.base")(props)
          : getPaletteColor("base")(props)};
    }

    & ~ svg[data-name='empty'] {
      display: none;
    }
    
    &:focus ~ svg {
      border: 1px solid ${theme.colors.blue};
      background-color: ${theme.colors.lightBlue};
    }

    &:hover ~ svg[data-name='checked'] {
      color: ${props =>
        props.disabled
          ? props.theme.colors.borderGray
          : props.theme.colors.darkBlue};
        }
  }

  ${applyVariations("Checkbox")}
`;

const StyledInput = styled.input`
  appearance: none;
  opacity: 0;
  position: absolute;
  z-index: 0;
`;

Checkbox.displayName = "Checkbox";

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  color: deprecatedColorValue()
};

Checkbox.defaultProps = {
  size: 20,
  color: "primary"
};

export default withTheme(Checkbox);
