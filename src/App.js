import MainContainer from './Components/main/main-container/main-container';
import {ThemeProvider, Typography, AppBar, Toolbar, Hidden} from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';

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

});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}> 
        <header className="App-header">
        <AppBar position="sticky">
          <Toolbar>
              <Hidden xsDown>
              <Typography align="left" className="textPrimary" variant="h3" component="h1">red list info.</Typography>
              </Hidden>
              <Hidden smUp>
              <Typography align="left" color="white" variant="h3" component="h1">rli.</Typography>
              </Hidden>
            </Toolbar>

          </AppBar>
        </header>
        <main>
          <MainContainer />
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
