import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ComicList from './components/ComicList';
import ComicDetail from './components/ComicDetail'
import Home from './components/Home';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <h2>Welcome to React Router Tutorial</h2>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><Link to={'/'} className="nav-link"> Home </Link></li>
              <li className="nav-item"><Link to={'/comics'} className="nav-link"> View Comics </Link></li>
            </ul>
            </nav>
            <hr />
            <div className="container">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/comics' component={ComicList} />
                <Route exact path='/comics/:id' component={ComicDetail} />
              </Switch>
            </div>
          </div>

        </div>
      </Router>
    );
  }
}
export default App;
