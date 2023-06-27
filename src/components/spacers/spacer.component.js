import styled from "styled-components/native";

const sizeVariant = {
    small: "4px",
    medium: "8px",
    large: "12px",
  };

  const positionVariant = {
    top: "marginTop",
    left: "marginLeft",
    right: "marginRight",
    bottom: "marginBottom",
  };

  const getVariant = (position, size) => {
    const sizeValue = sizeVariant[size];
    const property = positionVariant[position];
  
    return `${property}:${sizeValue}`;
  };

  export const Spacer = styled.View`
  ${({ position, size }) => getVariant(position, size)}
`;

Spacer.defaultProps = {
    position: "top",
    size: "small",
  };