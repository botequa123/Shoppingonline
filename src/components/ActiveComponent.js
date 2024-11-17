import axios from 'axios';
import React, { Component } from 'react';
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    return (
      <div >
        <div id='khung_nhap_nhap' className="align-center">
          <div class='header_logion_name'>
            <h2 className="text-left">Kích hoạt tài khoản</h2>
            <h6 className="text-right help">Cần Hỗ Trợ</h6>
          </div>
          <div class="thonghieu_login">
            <div class="thuonghieu">
              <img class="img_kimcuong2" src='https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/436199565_961214562081311_896287466111698533_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=iJH5CLX3KMgQ7kNvgHCzv_b&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=ApkuGIcykJxhyeQKXiEwcg9&oh=00_AYCSYamXy4sI9CiR38dW3qRd4qMzRbEs9WmB76VIM5aFVw&oe=673CC6CE'></img>
              <span class="tgkc">Minh Phúc Sport</span>
            </div>
            <form class="form_active">
              <table id='active' className="align-center">
                <tbody class="acctive">
                  <tr>
                    <td class="nameId">ID</td>
                    <td><input class="input_acctive" type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} /></td>
                  </tr>
                  <tr>
                    <td class="nameId">Token</td>
                    <td><input class="input_acctive" type="text" value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }} /></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td><input className='btn_active' type="submit" value="ACTIVE" onClick={(e) => this.btnActiveClick(e)} /></td>
                  </tr>
                </tbody>
              </table>
            </form>

          </div>
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
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Please input id and token');
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành công');
      } else {
        alert('Thất bại!');
      }
    });
  }
}
export default Active;