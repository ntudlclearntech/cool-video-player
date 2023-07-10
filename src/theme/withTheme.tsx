import React, { ComponentType } from 'react';

import { theme as muiTheme } from './mui-theme';
import { ThemeProvider } from '@mui/material/styles';

import './font.scss';

export function withTheme<P extends JSX.IntrinsicAttributes>(WrappedComponent: ComponentType<P>): ComponentType<P> {
  const ComponentWithTheme = (props: P) => {
    return (
      <ThemeProvider theme={muiTheme}>
        <WrappedComponent {...props} />
      </ThemeProvider>
    );
  };

  return ComponentWithTheme;
}
