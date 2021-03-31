import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import CommitList from './components/CommitList';
import { initialState, reducer } from "./redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';

export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
    <Router>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Home}/>
        <Route path="/repo/:repo" component={CommitList} />
      </Switch>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
