import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import './stylecume.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      prevScrollPos: 0,
      isScrollUp: false,
    };
  }

  componentDidMount() {
    this.apiGetCategories();
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
    const { categories, isScrollUp } = this.state;

    const cates = categories.map((item) => (
      <li key={item._id} className="menu color_text">
        <Link to={'/product/category/' + item._id}>{item.name}</Link>
      </li>
    ));

    return (
      <div
        id="header"
        className={`border-bottom ${isScrollUp ? 'hidden' : ''}`}
      >
        <div className="float-left">
          <ul className="menu">
            <li className="menu color_text">
              <Link to="/">Home</Link>
            </li>
            {cates}
          </ul>
        </div>
        <div className="float-right">
          <form id="search" className="search">
            <input
              id="iput_search"
              type="search"
              placeholder="Enter keyword"
              className="keyword"
              value={this.state.txtKeyword}
              onChange={(e) => {
                this.setState({ txtKeyword: e.target.value });
              }}
            />
            <input
              id="btn_search"
              type="submit"
              value="SEARCH"
              onClick={(e) => this.btnSearchClick(e)}
            />
          </form>
        </div>
        <div className="float-clear" />
      </div>
    );
  }

  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
}

export default withRouter(Menu);