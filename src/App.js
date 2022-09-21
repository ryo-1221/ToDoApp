import Main from './views/Main.jsx';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Amplify, { API, Auth } from 'aws-amplify';
import { Authenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import '@aws-amplify/ui-react/styles.css';
// import cognitoConstants from './constants/auth';

import awsExports from './aws-exports';
Amplify.configure(awsExports);
// Amplify.configure(cognitoConstants);

export const tokenContext = React.createContext();

const theme = createTheme({
  typography: {
    fontSize: 12,
  },
  palette: {
    primary: {
      light: '#5df890',
      main: '#00c461',
      dark: '#009234',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f5f5db',
    },
    kinari: {
      main: '#F6F5EA',
      dark: '#dbd69f',
    },
    background: {
      default: '#00c461',
    },
  },
});

// function App() {
//   return (
//     <div className="App">
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Main></Main>
//       </ThemeProvider>
//     </div>
//   );
// }
// export default App;

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => {
        const token = {
          jwt: user.signInUserSession.idToken.jwtToken,
          username: user.username,
        };
        return (
          <main>
            <div className="App">
              <tokenContext.Provider value={token}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Main signOut={signOut}></Main>
                </ThemeProvider>
              </tokenContext.Provider>
            </div>
            <button onClick={signOut}>Sign out</button>
          </main>
        );
      }}
    </Authenticator>
  );
};
export default AuthStateApp;
