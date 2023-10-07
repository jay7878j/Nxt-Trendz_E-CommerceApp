import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const loginImg =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png'
const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'

class LoginForm extends Component {
  state = {
    username: 'rahul',
    password: 'rahul@2021',
    isLoginFailed: false,
    errorMsg: '',
    showPassword: false,
  }

  // On Successful User Login
  onSuccessfulLogin = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 2})
    history.replace('/')
  }

  // On User Login Failed
  onFailureLogin = errorMsg => {
    this.setState({
      isLoginFailed: true,
      errorMsg,
      username: '',
      password: '',
      showPassword: false,
    })
  }

  // On Login Form Submit
  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userLoginDetails = {
      username,
      password,
    }

    const loginApi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userLoginDetails),
    }

    const response = await fetch(loginApi, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessfulLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  // Username input field container
  usernameContainer = () => {
    const {username} = this.state

    const onUsernameChange = event => {
      this.setState({username: event.target.value})
    }

    return (
      <div className="input-container">
        <label htmlFor="username" className="input-label">
          USERNAME
        </label>
        <input
          type="text"
          className="input-box"
          id="username"
          placeholder="Username"
          onChange={onUsernameChange}
          value={username}
          required
        />
      </div>
    )
  }

  // Password input field container
  passwordContainer = () => {
    const {password, showPassword} = this.state
    const passwordType = showPassword ? 'text' : 'password'

    const onPasswordChange = event => {
      this.setState({password: event.target.value})
    }

    return (
      <div className="input-container">
        <label htmlFor="password" className="input-label">
          PASSWORD
        </label>
        <input
          type={passwordType}
          className="input-box"
          id="password"
          placeholder="Password"
          onChange={onPasswordChange}
          value={password}
          required
        />
      </div>
    )
  }

  // Show Password Container
  showPasswordContainer = () => {
    const {showPassword} = this.state

    const onShowPasswordClick = event => {
      this.setState({showPassword: event.target.checked})
    }

    return (
      <div className="show-password-container">
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          onClick={onShowPasswordClick}
          onChange={() => {}}
          checked={showPassword}
        />
        <label htmlFor="checkbox" className="checkbox-label">
          Show Password
        </label>
      </div>
    )
  }

  //   Login Route Render Section
  render() {
    const {isLoginFailed, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-route-main-container">
        <div className="login-app-container">
          <img
            className="sm-website-logo-img"
            src={websiteLogo}
            alt="website logo"
          />
          <img className="login-img" src={loginImg} alt="website login" />
          <form className="login-form-container" onSubmit={this.onFormSubmit}>
            <img
              className="md-website-logo-img"
              src={websiteLogo}
              alt="website logo"
            />
            {this.usernameContainer()}
            {this.passwordContainer()}
            {this.showPasswordContainer()}
            <div className="login-btn-container">
              <button type="submit" className="login-btn">
                Login
              </button>
              {isLoginFailed && <p className="error">*{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
