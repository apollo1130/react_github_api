import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
// import GithubIcon from "mdi-react/GithubIcon";
// import {FormGroup,Label, Button, Input, Spinner, Form} from 'reactstrap';
import { AuthContext } from "../App";
import axios from 'axios';

export default function Login() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  // const { client_id, redirect_uri } = state;
  // const {redirect_uri} = state;
  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      setData({ ...data, isLoading: true });

      const requestData = {
        code: newUrl[1]
      };

      const proxy_url = state.proxy_url;

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(proxy_url, {
        method: "POST",
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: "LOGIN",
            payload: { data: data, isLoggedIn: true }
          });
        })
        .catch(error => {
          setData({
            isLoading: false,
            errorMessage: "Sorry! Login failed"
          });
        });
    }
  }, [state, dispatch, data]);
  if (state.isLoggedIn) {
    
    return <Redirect to="/" />;
  }

  const client_secret = React.createRef()
  const client_id = React.createRef();
  return (
      <div className={{alignItems: 'center'}}>
        <div>
          <h1>Welcome</h1>
          <span>{data.errorMessage}</span>
        </div>
        <div>
          {
            data.isLoading ? (
              <div className="loader" />
            ):
            <div>
              <input placeholder="ClientID" ref={client_id}></input>
              <input type="password" placeholder="ClientSecret" ref={client_secret}></input>
              <button
                onClick = {async () => {
                  await axios.post('http://localhost:5000/clientInfo', {client_secret: client_secret.current?.value, client_id: client_id.current?.value})
                  .then(res => {
                    if (res.data.success === 1){
                      setData({ ...data, errorMessage: "" })
                      window.location.href=res.data.url;
                    }
                  });
                }}
              >Login With GitHub
              </button>
            </div>
          }
        </div>
      </div>
  );
}
