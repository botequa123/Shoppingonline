import axios from 'axios';
import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }
  render() {
    return (
      <div id='khung_nhap_nhap' className="align-center">
        <div class='header_logion_name'>
          <h2 className="text-left">SIGN-UP</h2>
          <h6 className="text-right help">Cần Hỗ Trợ</h6>
        </div>
        <div class="thonghieu_login">
          <div class="thuonghieu">
            <img class="img_kimcuong2" src='https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/436199565_961214562081311_896287466111698533_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=iJH5CLX3KMgQ7kNvgHCzv_b&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=ApkuGIcykJxhyeQKXiEwcg9&oh=00_AYCSYamXy4sI9CiR38dW3qRd4qMzRbEs9WmB76VIM5aFVw&oe=673CC6CE'></img>
            <span class="tgkc">Minh Phúc Shop</span>
          </div>
          <form class="form_sign-up">
            <table className="align-center">
              <tbody className='khunglogin'>
                <tr>
                  <td>Username</td>
                  <td><input class="withd_ip" type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td><input class="withd_ip" type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td><input class="withd_ip" type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td><input class="withd_ip" type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td><input class="withd_ip" type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} /></td>
                </tr>
                <tr>
                  <td></td>
                  <td><input id='sign_up' class="withd_ip" type="submit" value="SIGN-UP" onClick={(e) => this.btnSignupClick(e)} /></td>
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
      </div>
    );
  }
  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiSignup(account);
    } else {
      alert('Vui lòng nhập tài khoản, mật khẩu, tên, số điện thoại và email');
    }
  }
  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Signup;