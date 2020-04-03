import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './components/HomePage'
import EditPage from './components/EditPage'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route path='/' exact component={HomePage} />
      <Route path='/edit/' exact  component={EditPage} />
      <Route path='/edit/:id'  component={EditPage} />
    </Router>
  );
}

export default App;
