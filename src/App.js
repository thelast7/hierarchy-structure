import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import MainPage from './component/dashboard'
import LoginPage from './component/login-page'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/' exact component={MainPage} />
          <Route path='/login' component={LoginPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
