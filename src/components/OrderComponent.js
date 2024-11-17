import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
class Order extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }
  render() {
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td id='id_product' >{item._id}</td>
          <td id="hide">{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td id="hide">{item.customer.phone}</td>
          <td>{item.total}</td>
          <td>{item.status}</td>
          <td>
            {item.status === 'PENDING' ?
              <div><span className="link" onClick={() => this.lnkApproveClick(item._id)}>Xác nhận</span> || <span className="link" onClick={() => this.lnkCancelClick(item._id)}>Hủy đơn</span></div>
              : <div />}
          </td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="datatable">
            <td>{index + 1}</td>
            <td id="hide">{item.product._id}</td>
            <td >{item.product.name}</td>
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
        <div className="align-center">
          <h2 className="text-center">Danh sách đơn đặt hàng</h2>
          <table className="datatable" border="1">
            <tbody id='oder_mobile'>
              <tr className="datatable">
                <th >ID</th>
                <th id="hide">Ngày tạo</th>
                <th>Tên khách hàng</th>
                <th id="hide">Số điện thoại</th>
                <th>Tổng giá</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
              {orders}
            </tbody>
          </table>
        </div>
        {this.state.order ?
          <div className="align-center">
            <h2 id='oder_mobile' className="text-center">Chi tiết đơn đặt</h2>
            <table className="datatable" border="1">
              <tbody id='oder_mobile'>
                <tr className="datatable">
                  <th id="info_oder">Số thứ tự</th>
                  <th id="hide"  >ID</th>
                  <th id="info_oder">Tên</th>
                  <th id="info_oder">Hình ảnh</th>
                  <th id="info_oder">Định giá</th>
                  <th id="info_oder">Số lượng</th>
                  <th id="info_oder">Tổng giá</th>
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
    this.apiGetOrders();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
  // event-handlers
  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'Xác nhận');
  }
  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'Hủy đơn');
  }
  // apis
  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert('Thất bại!');
      }
    });
  }
}
export default Order;