import React from "react";
import { signUp } from "../store/actions/authActions";
import { connect } from "react-redux";
import { Navigate } from "react-router";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    signupDate: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    const { auth, authError } = this.props;
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
      <div className="signup-form container">
        <form onSubmit={this.handleSubmit}>
          {authError ? authAlert : null}
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              onChange={this.handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              onChange={this.handleChange}
            />
          </div>

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
            <div id="passwordHelp" className="form-text">
              Your password must be at least 6 characters long
            </div>
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
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user) => dispatch(signUp(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
