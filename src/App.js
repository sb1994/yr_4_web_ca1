import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ComicList from './components/ComicList';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <h2>Welcome to React Router Tutorial</h2>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li><Link to={'/comics'} className="nav-link"> View Comics </Link></li>
            </ul>
            </nav>
            <hr />
            <div className="container">
              <Switch>
                <Route exact path='/comics' component={ComicList} />
              </Switch>
            </div>
          </div>

        </div>
      </Router>
    );
  }
}
export default App;
