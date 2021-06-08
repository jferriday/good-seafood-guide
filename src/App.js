import MainContainer from './Components/main/main-container/main-container';
import {ThemeProvider, Typography, AppBar, Toolbar, Hidden} from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';
import './App.css';
// Custom theme parameters for Material UI
const theme = createMuiTheme({

    palette: {
      primary: {
        main: '#455a64',
      },
      secondary: {
        main: '#b0bec5',
      },
    },
    typography: {
      h1: {
        fontSize: '2.5rem',
        marginTop: '10px',
        marginBottom: '5px'
      },
      subtitle1: {
        fontSize: "1.25rem",
        color: 'white',
        textAlign: 'left'
      },
      subtitle2: {
        fontSize: "1rem",
        color: 'white',
        textAlign: 'left'
      }
    }  

});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}> 
        <header className="App-header">
        <AppBar position="sticky">
          <Toolbar padding={1}>
              <Hidden xsDown>
              <Typography align="left" className="textPrimary" variant="h1">red list info.</Typography>
              </Hidden>
              <Hidden smUp>
              <Typography align="left" color="white" variant="h1">red list info</Typography>
              </Hidden>
            </Toolbar>

          </AppBar>
        </header>
        <main className="main">
          <MainContainer className="main-container" />
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
