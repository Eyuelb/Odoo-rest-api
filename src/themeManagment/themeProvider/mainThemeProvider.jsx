import { ThemeProvider } from 'theme-ui'
import { theme } from '@themeManagment'
export const MainThemeProvider = ({ children }) => {

  
    return (
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    );
  }