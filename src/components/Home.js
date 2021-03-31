import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import * as Styles from '../styles/HomeStyle';
import UserOverView from './UserOverView';
import RepoList from './RepoList';
export default function Home() {
  const { state, dispatch } = useContext(AuthContext);

  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }
  // const { avatar_url, name, public_repos, followers, following } = state.user;
  // const {token} = state.respond;
  // console.log(token);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  } 

  return (
    <Styles.Wrapper>
      
      <div className="row">
        <div className="col-md-3 col-sm-3 col-lg-3">
          <UserOverView />
        </div>
        <div className="col-md-9 col-sm-9 col-lg-9" style={{marginTop: 20}}>

          <RepoList />
        </div>


      </div>
      <Styles.LogoutButton onClick={() => handleLogout()}>
          LogOut
        </Styles.LogoutButton>
    </Styles.Wrapper>
        // <button onClick={()=> handleLogout()}>Logout</button>

  );
}