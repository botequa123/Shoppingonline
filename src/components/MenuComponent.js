import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import '../componentsStyleCSS/fontawesome-free-6.4.2-web/css/all.min.css'
import '../componentsStyleCSS/style.css'

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="header">

        <div className="float-left row2-12">
          {/* <i class="fa-solid fa-bars menu_icon_mobile"></i> */}
          <ul id="menu_mobile" class="menu_mobile" className="menu center_menu  ">
            <li class="list_item" className="menu"><div className="img_logo" src="./logo.jpg" alt=""></div></li>
            <li class="list_item" className="menu"><Link to='/admin/category'>Phân loại</Link></li>
            <li class="list_item" className="menu"><Link to='/admin/product'>Sản phẩm</Link></li>
            <li class="list_item" className="menu"><Link to='/admin/order'>Đơn hàng</Link></li>
            <li class="list_item" className="menu"><Link to='/admin/customer'>Khách hàng</Link></li>
          </ul>
        </div>

        <div className="float-right center_menu" ><i className="fa-solid fa-user font-icon"></i>
          <b>{this.context.username}</b> | <a className="logout_item" href="" onClick={() => this.lnkLogoutClick()}>Logout</a>
        </div>
        <div className="float-clear" />
      </div>
      // <div class="">

      // </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}

export default Menu;