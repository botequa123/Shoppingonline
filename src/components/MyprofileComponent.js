import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import "./stylecume.css";
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
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
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    return (
      <div id='khung_nhap_nhap' className="align-center">
        <div class='header_logion_name'>
          <h2 className="text-left">MY PROFILE</h2>
          <h6 className="text-right help">Cần Hỗ Trợ</h6>
        </div>
        <div class="thonghieu_login">
          <div class="thuonghieu">
            <img class="img_kimcuong2" src='https://product.hstatic.net/1000093649/product/upload_a324feb943e4417ca7ec40a9e62d5846_grande.jpg'></img>
            <span class="tgkc">THẾ GIỚI KIM CƯƠNG </span>
          </div>
          <form class="form_sign-up1">
            <table className="align-center">
              <tbody>
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
                  <td><input id='sign_up' class="withd_ip" type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} /></td>
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
  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Vui lòng nhập tài khoản, mật khẩu, tên, số điện thoại và email');
    }
  }
  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành công');
        this.context.setCustomer(result);
      } else {
        alert('Thất bại');
      }
    });
  }
}
export default Myprofile;