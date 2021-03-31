import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import * as Styles from '../styles/UserOverViewStyle';

export default function UserOverView() {
  const { state } = useContext(AuthContext);

  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }
  console.log(state);
  const { avatar_url, login, public_repos, followers, following } = state.user;
  const stats = [
    {
        name: 'Public Repos',
        value: public_repos
    },
    {
        name: 'Followers',
        value: followers
    },
    {
        name: 'Following',
        value: following
    }
  ];
//   const renderStat = (stat) => {

//     return (
//         <Styles.List key={stat.name}>
//             <p>{stat.value}</p>
//             <p>{stat.name}</p>
//         </Styles.List>
//     )
//   }  
  return (
    <Styles.UserWrapper>
    <Styles.StyledDiv>
        <Styles.ImageWrapper src={avatar_url} alt={`${login} Avatar`} />
    </Styles.StyledDiv>
    <Styles.StyledDiv>
        <Styles.Title>{login}</Styles.Title>
    </Styles.StyledDiv>

    <Styles.UnList>
        {
            stats.map((item) =>{
                return (
                    <Styles.List key={item.name}>
                        <p>{item.value}</p>
                        <p>{item.name}</p>
                    </Styles.List>
                )
            })
        }
    </Styles.UnList>

    </Styles.UserWrapper>
  );
}