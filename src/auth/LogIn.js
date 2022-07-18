import React from "react";
import { connect } from "react-redux";
import { logIn } from "../store/actions/authActions";
import { Navigate } from "react-router";

class LogIn extends React.Component {
  state = {
    email: "",
    password: "",
  };

  // updates state every time inputs change
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // logs in when form submitted (authAction function)
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.logIn(this.state);
  };

  render() {
    const { authError, auth } = this.props;
    const authAlert = (
      <div className="alert alert-danger" role="alert">
        {authError}
      </div>
    );

    // redirects if already logged in
    if (auth.uid) {
      return <Navigate to="/" />;
    }

    return (
      <div className="login-form container">
        <form onSubmit={this.handleSubmit}>
          {authError ? authAlert : null}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              onChange={this.handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (creds) => dispatch(logIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
