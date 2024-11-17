import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import '../componentsStyleCSS/style.css'
import '../componentsStyleCSS/fontawesome-free-6.4.2-web/css/all.min.css'
class Login extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    if (this.context.token === '') {
      return (

        <div className=" align-valign-center center_login_admin">
          {/* // align-valign-center */}
          <div className="box-login" >
            <h2 className="text-center">ADMIN LOGIN</h2>
            <form className="form_center form_center_mobile">
              <table className="align-center">
                <tbody>
                  <tr className="login-input-mobile">

                    <td className="font-size" > <i className="fa-solid fa-user font-icon"></i>Tài khoản</td>
                    <td><input className="inputlogin" type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
                  </tr>
                  <tr className="login-input-mobile">
                    <td className="font-size"><i className="fa-solid fa-lock font-icon"></i>Mật khẩu</td>
                    <td><input className="inputlogin" type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
                  </tr>
                  <tr >
                    <td>
                      <input className="btn-submit" type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      );
    }
    return (<div />);
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Vui lòng nhập tài khoản và mật khẩu');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}
export default Login;