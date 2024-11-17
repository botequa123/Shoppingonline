import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className="datatable">
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>{item.product.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
          <td>{item.product.price}</td>
          <td>{item.quantity}</td>
          <td>{item.product.price * item.quantity}</td>
          <td><span id='link_a' className="link" onClick={() => this.lnkRemoveClick(item.product._id)}>Xóa sản phẩm</span></td>
        </tr>
      );
    });
    return (
      <div id='khung_nhap_mycart' className="align-center">
        <h2 className="text-center">Giỏ Hàng</h2>
        <table id='menutb' className="datatable" border="1">
          <tbody>
            <tr className="datatable">
              <th>Số thứ tự</th>
              <th>ID</th>
              <th>Tên Sản Phẩm</th>
              <th>Phân Loại</th>
              <th>Hình Ảnh</th>
              <th>Định giá</th>
              <th>Số Lượng</th>
              <th>Tổng giá</th>
              <th>Hoạt Động</th>
            </tr>
            {mycart}
            <tr>
              <td colSpan="6"></td>
              <td>Tổng</td>
              <td>{CartUtil.getTotal(this.context.mycart)}</td>
              <td><span id='link_a' className="link" onClick={() => this.lnkCheckoutClick()}>Mua Hàng</span></td>
            </tr>
          </tbody>
        </table>
        <div class="footer_item footer_item_cuoi">

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
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }
  // event-handlers
  lnkCheckoutClick() {
    if (window.confirm('Bạn có chắc chắn chưa?')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Giỏ hàng của bạn trống');
      }
    }
  }
  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành công!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('Thất bại!');
      }
    });
  }
}
export default withRouter(Mycart);