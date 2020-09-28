import React from 'react';
import { AuthProvider } from './auth';

// import { Container } from './styles';

// eslint-disable-next-line react/prop-types
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
