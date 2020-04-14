import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './pages/HomePage'
import EmpEditPage from './pages/EmpEditPage'
import DepEditPage from "./pages/DepEditPage";
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <div className={'container'}>
      <Router>
        <Route path='/' exact component={HomePage} />
        <Route path='/editEmp/' exact  component={EmpEditPage} />
        <Route path='/editEmp/:id'  component={EmpEditPage} />
        <Route path='/editDep/' exact  component={DepEditPage} />
        <Route path='/editDep/:id'  component={DepEditPage} />
      </Router>
    </div>
  );
}

export default App;
