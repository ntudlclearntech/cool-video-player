import { createTheme } from '@mui/material/styles';
import palette from './mui-theme.module.scss';

// You need to make sure that the typings for the theme's typography variants and the Typography's variant prop reflects the new set of variants.
declare module '@mui/material/styles' {
  interface TypographyVariants {
    warning: React.CSSProperties;
    highlight: React.CSSProperties;
    success: React.CSSProperties;
    critical: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    warning?: React.CSSProperties;
    highlight?: React.CSSProperties;
    success?: React.CSSProperties;
    critical?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    warning: true;
    highlight: true;
    success: true;
    critical: true;
  }
}

export let theme = createTheme({
  palette: {
    primary: {
      main: palette.primaryMainColor,
      light: palette.primaryLightColor,
      dark: palette.primaryDarkColor,
      contrastText: palette.primaryContrastTextColor,
    },
    secondary: {
      main: palette.secondaryMainColor,
      light: palette.secondaryLightColor,
      dark: palette.secondaryDarkColor,
      contrastText: palette.secondaryContrastTextColor,
    },
    error: {
      main: palette.errorMainColor,
      light: palette.errorLightColor,
      dark: palette.errorDarkColor,
      contrastText: palette.errorContrastTextColor,
    },
    warning: {
      main: palette.warningMainColor,
      light: palette.warningLightColor,
      dark: palette.warningDarkColor,
      contrastText: palette.warningContrastTextColor,
    },
    success: {
      main: palette.successMainColor,
      light: palette.successLightColor,
      dark: palette.successDarkColor,
      contrastText: palette.successContrastTextColor,
    },
    info: {
      main: palette.infoMainColor,
      light: palette.infoLightColor,
      dark: palette.infoDarkColor,
      contrastText: palette.infoContrastTextColor,
    },
    text: {
      primary: palette.textPrimaryColor,
      secondary: palette.textSecondaryColor,
      disabled: palette.textDisabledColor,
    },
    divider: palette.dividerColor,
  },
  typography: { // NOTE: font color is configured in src/theme/font.css
    fontFamily: [
      'Roboto',
      'Helvetica',
      'Arial',
      '"Microsoft JhengHei"',
      'Ubuntu',
      'sans-serif',
    ].join(','),
    fontSize: 16,
    htmlFontSize: 16,
    h1: {
      fontWeight: 400,
      fontSize: '2rem',
    },
    h2: {
      fontWeight: 400,
      fontSize: '1.75rem',
    },
    h3: {
      fontWeight: 400,
      fontSize: '1.5rem',
    },
    h4: {
      fontWeight: 400,
      fontSize: '1.25rem',
    },
    h5: {
      fontWeight: 400,
      fontSize: '1.125rem',
    },
    h6: {
      fontWeight: 700,
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '1rem',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    button: {
      fontWeight: 400,
      fontSize: '1rem',
      textTransform: 'none',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    overline: {
      fontWeight: 400,
    },
  },
});

theme = createTheme(theme, {
  typography: {
    warning: {
      ...theme.typography.body1,
      color: palette.errorMainColor,
    },
    highlight: {
      ...theme.typography.body1,
      fontWeight: 700,
      color: palette.secondaryMainColor,
    },
    success: {
      ...theme.typography.body1,
      color: palette.successMainColor,
    },
    critical: {
      ...theme.typography.body1,
      fontWeight: 700,
      color: palette.errorDarkColor,
    },
  },
});
