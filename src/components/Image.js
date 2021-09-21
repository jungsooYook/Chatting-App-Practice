import React from "react";
import styled from "styled-components";
import Proptypes from "prop-types";

const Container = styled.View`
  align-self: center;
  margin-bottom: 30px;
`;

const StyledImage = styled.Image`
  background-color: ${({ theme }) => theme.imageBackground}
  width: 100px;
  height: 100px;
  border-radius: ${({ rounded }) => (rounded ? 50 : 0)}px
`;

function Image({ url, imageStyle, rounded }) {
  return (
    <Container>
      <StyledImage source={{ uri: url }} style={imageStyle} rounded={rounded} />
    </Container>
  );
}

Image.defaultProps = {
  rounded: false,
};
export default Image;
