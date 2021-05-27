import './App.css';
import MainContainer from './Components/main/main-container/main-container';
import Assessment from './Components/assessment/Assessment';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Good Seafood Guide</h1>
      </header>
      <main>
        <MainContainer />
        <Assessment />
      </main>
    </div>
  );
}

export default App;
