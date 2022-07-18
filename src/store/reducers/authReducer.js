const initState = {};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null,
      };

    case "LOGIN_FAILURE":
      console.log("login error");
      return {
        ...state,
        authError: action.err.message,
      };

    // google login
    case "LOGIN_GOOGLE_SUCCESS":
      console.log("login google success");
      return {
        ...state,
        authError: null,
      };

    case "LOGIN_GOOGLE_FAILURE":
      console.log("login google failure");
      return {
        ...state,
        authError: action.err.message,
      };

    // logout
    case "LOGOUT_SUCCESS":
      console.log("logout success");
      return {
        ...state,
        authError: null,
      };

    case "LOGOUT_FAILURE":
      console.log("logout failure");
      return {
        ...state,
        authError: action.err.message,
      };

    // sign up
    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null,
      };

    case "SIGNUP_FAILURE":
      console.log("signup failure");
      return {
        ...state,
        authError: action.err.message,
      };

    case "SIGNUP_GOOGLE_SUCCESS":
      console.log("signup google success");
      return {
        ...state,
        authError: null,
      };

    case "SIGNUP_GOOGLE_FAILURE":
      console.log("signup google failure");
      return {
        ...state,
        authError: action.err.message,
      };

    default:
      return state;
  }
};

export default authReducer;
