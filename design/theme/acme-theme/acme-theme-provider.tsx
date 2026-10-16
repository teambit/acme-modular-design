import { createTheme } from '@bitdesign/sparks.sparks-theme';
import { AcmeThemeSchema, acmeThemeTokens } from './acme-theme-tokens.js';

/**
 * creating and declaring the acme-theme theme.
 * define the theme schema as a type variable for proper type completions.
 */
export const AcmeThemeProvider = createTheme<AcmeThemeSchema>({
  tokens: acmeThemeTokens,
});

/**
 * a react hook for contextual access to design token
 * from components.
 */
export const { useTheme } = AcmeThemeProvider;
