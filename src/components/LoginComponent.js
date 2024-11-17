import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import "./stylecume.css";
import "./fontawesome-free-6.4.2-web/css/all.css";
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    return (
      <div id='khung_nhap_nhap' className="align-center">
        <div class='header_logion_name'>
          <h2 className="text-left">Đăng nhập</h2>
          <h6 className="text-right help">Cần Hỗ Trợ</h6>
        </div>
        <div class="thonghieu_login">
          <div class="thuonghieu">
            <img class="img_kimcuong2" src='https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/436199565_961214562081311_896287466111698533_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=iJH5CLX3KMgQ7kNvgHCzv_b&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=ApkuGIcykJxhyeQKXiEwcg9&oh=00_AYCSYamXy4sI9CiR38dW3qRd4qMzRbEs9WmB76VIM5aFVw&oe=673CC6CE'></img>
            <span class="tgkc">Minh Phúc Sport</span>
          </div>
          <form>
            <table className="align-center">
              <tbody class="khunglogin">
                <tr class='imput_login'>
                  <td class="text-color">Tài khoản</td>
                  <td><input class="withd_ip" type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
                </tr>
                <tr class='imput_login'>
                  <td class="text-color">Mật khẩu</td>
                  <td><input class="withd_ip" type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
                </tr>
                <tr class='imput_login'>
                  <td></td>
                  <td class="btn_input_center"><input id='btnip' type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} /></td>
                </tr>
              </tbody>
            </table>
          </form>

        </div>
        <div class="footer_item">
          <div>
            <span class='sp1'>CHĂM SÓC KHÁCH HÀNG</span> <br></br>
            <span>Trung tâm trợ giúp</span> <br></br>
            <span>Minh Phúc shop</span> <br></br>
            <span>Hướng dẫn mua hàng</span> <br></br>
          </div>
          <div>
            <span class='sp1'>GIỚI THIỆU</span> <br></br>
            <span>Tuyển Dụng</span> <br></br>
            <span>Điều Khoản</span> <br></br>
          </div>
          <div>
            <span class='sp1'>DỊCH VỤ KHÁCH HÀNG</span> <br></br>
            <span>Hướng dẫn mua hàng và thanh toán</span> <br></br>
            <span>Thông tin bảo hành sản phẩm</span> <br></br>
          </div>
          <div>
            <span class='sp1'>Liên Hệ: 123456789</span> <br></br>
          </div>

        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
      </div>
    );
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
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        alert(result.message);
      }
    });
  }
}
export default withRouter(Login);