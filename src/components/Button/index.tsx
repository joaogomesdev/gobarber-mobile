/* eslint-disable no-unused-vars */
import React from 'react';

import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

// eslint-disable-next-line react/prop-types
const Button: React.FC<RectButtonProperties> = ({ children, ...rest }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
