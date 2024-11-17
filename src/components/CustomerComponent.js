import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import '../componentsStyleCSS/style.css'
import '../componentsStyleCSS/fontawesome-free-6.4.2-web/css/all.min.css'
class Customer extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null
    };
  }
  render() {
    const customers = this.state.customers.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trCustomerClick(item)}>
          <td className="width_content" id='hide'>{item._id}</td>
          <td >{item.username}</td>
          <td>{item.password}</td>
          <td id='hide'>{item.name}</td>
          <td id='hide'>{item.phone}</td>
          <td className="width_content" id='id_product3'>{item.email}</td>
          <td>{item.active}</td>
          <td>
            {item.active === 0 ?
              <span className="link" onClick={() => this.lnkEmailClick(item)}>EMAIL</span>
              :
              <span className="link" onClick={() => this.lnkDeactiveClick(item)}>Hủy kích hoạt</span>}
          </td>
        </tr>
      );
    });
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trOrderClick(item)}>
          <td id='id_product2'>{item._id}</td>
          <td id='id_product2'>{new Date(item.cdate).toLocaleString()}</td>
          <td >{item.customer.name}</td>
          <td id='hide' >{item.customer.phone}</td>
          <td>{item.total}</td>
          <td>{item.status}</td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="datatable">
            <td>{index + 1}</td>
            <td >{item.product._id}</td>
            <td>{item.product.name}</td>
            <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
            <td>{item.product.price}</td>
            <td>{item.quantity}</td>
            <td>{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }
    return (
      <div>
        <div className="align-center align-center2">
          <h2 className="text-center">Danh sách khách hàng</h2>
          <table className="datatable" border="1">
            <tbody id='from_date'>
              <tr className="datatable">
                <th className='width_content' id='hide' >ID</th>
                <th >Tài khoản</th>
                <th>Mật khẩu</th>
                <th id='hide'>Tên</th>
                <th id='hide'>Số điện thoại</th>
                <th>Email</th>
                <th>Đã kích hoạt</th>
                <th>Hành động</th>
              </tr>
              {customers}
            </tbody>
          </table>
        </div>
        {this.state.orders.length > 0 ?
          <div className="align-center">
            <h2 className="text-center">ORDER LIST</h2>
            <table className="datatable" border="1">
              <tbody id='hide_info'>
                <tr className="datatable">
                  <th>ID</th>
                  <th>Ngày tạo</th>
                  <th>Tên khách hàng</th>
                  <th id='hide'>Số điện thoại khách hàng</th>
                  <th>Tổng giá</th>
                  <th>Trạng thái</th>
                </tr>
                {orders}
              </tbody>
            </table>
          </div>
          : <div />}
        {this.state.order ?
          <div className="align-center">
            <h2 className="text-center">Chi tiết đơn đặt hàng</h2>
            <table className="datatable" border="1">
              <tbody id='hide_info'>
                <tr className="datatable">
                  <th>Số đơn</th>
                  <th>Prod.ID</th>
                  <th>Prod.name</th>
                  <th>Hình ảnh</th>
                  <th>Giá</th>
                  <th>Quantity</th>
                  <th>Số lượng</th>
                </tr>
                {items}
              </tbody>
            </table>
          </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCustomers();
  }
  // event-handlers
  trCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  }
  trOrderClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetCustomers() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers', config).then((res) => {
      const result = res.data;
      this.setState({ customers: result });
    });
  }
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
  // event-handlers
  lnkEmailClick(item) {
    this.apiGetCustomerSendmail(item._id);
  }
  // apis
  apiGetCustomerSendmail(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers/sendmail/' + id, config).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
  // event-handlers
  lnkDeactiveClick(item) {
    this.apiPutCustomerDeactive(item._id, item.token);
  }
  // apis
  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/customers/deactive/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetCustomers();
      } else {
        alert('Tải danh sách thất bại!');
      }
    });
  }

}
export default Customer;