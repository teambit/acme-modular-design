import { useTheme } from './acme-theme-provider.js';
import { AcmeTheme } from './acme-theme.js';
import { TokenViewer } from '@bitdesign/sparks.sparks-theme';

function ViewTokens() {
  const theme = useTheme();

  return <TokenViewer theme={theme} />;
}

export const LightTheme = () => {
  return (
    <AcmeTheme>
      <ViewTokens />
    </AcmeTheme>
  );
};

export const DarkTheme = () => {
  return (
    <AcmeTheme initialTheme='dark'>
      <ViewTokens />
    </AcmeTheme>
  );
};
