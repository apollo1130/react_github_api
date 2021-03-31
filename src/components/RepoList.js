import React, { useContext, useEffect, useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { AuthContext } from "../App";
import * as Styles from '../styles/RepoListStyle';
import moment from 'moment';
import { GoRepoForked } from "react-icons/go";
export default function RepoList() {
  const { state } = useContext(AuthContext);
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    async function fetchRepos(){
        
        const res = await fetch('https://api.github.com/user/repos', {
            headers: {
                Authorization: `token ${state.token}`,
            },
        });
        res.json()
        .then(res => setRepos(res))
        .catch(err => console.log(err))
    }
    fetchRepos();
  }, [state.token]);
  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  
  return (
      <Styles.Wrapper>
          {
              repos.map((item) => {
                  let momentObj = moment(item.updated_at)
                  let bgColor = item.private ? '#00bcd4' : '#e91e63';
                  let bgText = item.private ? 'PRIVATE' : 'PUBLIC';
                  let isPrivate = <span style={{color: '#ffffff',backgroundColor: bgColor }}>{bgText}</span>;

                  return (
                    <Styles.RepoList key={item.id}>
                        <Styles.RepoListItem>
                            <NavLink to={`/repo/${item.name}`}>
                            <Styles.Title>{item.name}</Styles.Title>
                            </NavLink>
                        </Styles.RepoListItem>
                        {
                            item.description != null ? <p>{item.description}</p> : ''
                        }
                        {isPrivate}
                        <Styles.SpanProperty>
                            <GoRepoForked />
                            {
                                item.forks
                            }
                        </Styles.SpanProperty>
                        Updated on {momentObj.format('YYYY-MM-DD')}                        
                    </Styles.RepoList>
                    // </button>
                  )
              })
          }
      </Styles.Wrapper>
    //   <div className="container">
    //     <button onClick={()=> handleLogout()}>Logout</button>
    //     <div>
    //       <div className="content">
    //         <img src={avatar_url} alt="Avatar"/>
    //         <span>{login}</span>
    //         <span>{public_repos} Repos</span>
    //         <span>{followers} Followers</span>
    //         <span>{following} Following</span>
    //       </div>
    //     </div>
    //   </div>
  );
}