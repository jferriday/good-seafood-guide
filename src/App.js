import MainContainer from './Components/main/main-container/main-container';
import {Typography, AppBar, Toolbar, Hidden} from '@material-ui/core';
function App() {
  return (
    <div className="App"> 
      <header className="App-header">
      <AppBar position="sticky">
        <Toolbar>
            <Hidden xsDown>
            <Typography align="left" color="textPrimary" variant="h3" component="h1">Good Seafood Guide</Typography>
            </Hidden>
            <Hidden smUp>
            <Typography align="left" color="textPrimary" variant="h3" component="h1">GSG</Typography>
            </Hidden>
          </Toolbar>

        </AppBar>
      </header>
      <main>
        <MainContainer />
      </main>
    </div>
  );
}

export default App;
