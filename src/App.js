import './App.css';
import Main from './components/Main.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main></Main>
      </ThemeProvider>
    </div>
  );
}

export default App;
