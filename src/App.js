import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from "./globalState";
import Header from "./components/Headers/Header";
import MainPages from "./components/mainpages/Pages";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
    </DataProvider>

  );
}

export default App;
