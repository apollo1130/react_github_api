export const initialState = {
  isLoggedIn: false,
  user: null,
  client_id: '',
  redirect_uri: 'http://localhost:3000/login',
  client_secret: '',
  proxy_url: 'http://localhost:5000/authenticate'
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn))
      localStorage.setItem("user", JSON.stringify(action.payload.data.user))
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.data.user,
        token: action.payload.data.token
      };
    }
    case "LOGOUT": {
      localStorage.clear()
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }
    default:
      return state;
  }
};
