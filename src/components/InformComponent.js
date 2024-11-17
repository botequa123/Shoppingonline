import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import './stylecume.css';
import './fontawesome-free-6.4.2-web/css/all.css';

class Inform extends Component {
  static contextType = MyContext;
  state = {
    prevScrollPos: 0,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { prevScrollPos } = this.state;
    const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    const isScrollUp = currentScrollPos > prevScrollPos;

    this.setState({
      prevScrollPos: currentScrollPos,
      isScrollUp,
    });
  };

  render() {
    const { isScrollUp } = this.state;
    const { token, customer, mycart } = this.context;

    return (
      <div id='menu_header_info' className={isScrollUp ? 'scroll-up' : 'scroll-down'}>
        <div className="float-left">
          {token === '' ? (
            <div>
              <Link id='menu_link_info' to='/login'>Đăng nhập</Link> | <Link id='menu_link_info' to='/signup'>Đăng kí</Link> | <Link id='menu_link_info' to='/active'>Kích hoạt tài khoản</Link>
            </div>
          ) : (
            <div>
              <i className="fa-regular fa-user icon_user"></i>  <b>{customer.name}</b> | <Link id='menu_link_info' to='/home' onClick={this.lnkLogoutClick}>Đăng xuất</Link> | <Link id='menu_link_info' to='/myprofile'>Thông tin của tôi</Link> | <Link id='menu_link_info' to='/myorders'>Đơn hàng của tôi</Link>
            </div>
          )}
        </div>

        <div className="float-right">
          <Link id='menu_link_info' to='/mycart'>Giỏ hàng có <b>{mycart.length}</b> vật phẩm</Link>
        </div>
        <div className="float-clear" />
      </div>
    );
  }

  lnkLogoutClick = () => {
    const { setToken, setCustomer, setMycart } = this.context;
    setToken('');
    setCustomer(null);
    setMycart([]);
  };
}

export default Inform;