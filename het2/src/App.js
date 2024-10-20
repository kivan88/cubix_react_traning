import './App.css';
import Table from "./components/Table";

function App() {
  const numberOfPairs = 5;
  
  return (
    <div>
      <Table key="mainTable" numberOfPairs={numberOfPairs}></Table>
    </div>
  );
}

export default App;