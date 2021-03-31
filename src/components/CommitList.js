import React, {useContext, useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import {useParams} from 'react-router-dom';
import * as Styles from '../styles/CommitListStyle.js';
export default function CommitList(){
    
    const { state } = useContext(AuthContext);

    const [commits, setCommits] = useState([]);
    let {repo} = useParams()

    useEffect(() => {
        async function fetchCommits(){
            await fetch(`https://api.github.com/repos/${state.user.login}/${repo}/commits?per_page=10`, {
                headers: {
                    'Authorization': `token ${state.token}`,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res => {setCommits(res); console.log(res);})
            .catch(err => console.log(err));
            // res.json()
            // .then(res => setCommits([...res]))
            // .catch(err => console.log(err))
            // console.log(res);
        }
        fetchCommits();
      }, [state.token, state.user.login, repo]);

    // if (!state.isLoggedIn) {
    // return <Redirect to="/login" />;
    // }
    
    return(
    <Styles.Wrapper>
        {
            // console.log(commits)
            commits instanceof Array ? commits.map((item) => {
                return <li key={item.sha}>{item.commit.message}</li>
            }) : 'No Commits'
            // commits.length() > 1 ? 
            //     commits.map((item) => {
            //         return <li key={item.sha}>{item.commit.message}</li>
            //     })
            // : 'No Commits'
        }
    </Styles.Wrapper>
    );
}