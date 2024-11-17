import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';
import '../componentsStyleCSS/fontawesome-free-6.4.2-web/css/all.min.css'
import '../componentsStyleCSS/style.css'

class Product extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td className='item_info'>{item._id}</td>
          <td className='item_info'>{item.name}</td>
          <td className='item_info'>{item.price}</td>
          <td className='item_info'>{new Date(item.cdate).toLocaleString()}</td>
          <td className='item_info'>{item.category.name}</td>
          <td className='item_info'><img src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" /></td>
        </tr>
      );
    });
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (<span key={index}>| <b>{index + 1}</b> |</span>);
      } else {
        return (<span key={index} className="link" onClick={() => this.lnkPageClick(index + 1)}>| {index + 1} |</span>);
      }
    });
    return (
      <div>
        <div className="float-left">
          <h2 id='product_list-menu' className="text-center">Danh sách sản phẩm</h2>
          <table class="list_product" className="datatable" border="1" >
            <tbody className="list_product" >
              <tr className="datatable">
                <th className="item_product">ID</th>
                <th className="item_product">Tên</th>
                <th className="item_product">Giá</th>
                <th className="item_product">Ngày tạo</th>
                <th className="item_product">Phân loại</th>
                <th className="item_product">Hình ảnh</th>
              </tr>
              {prods}
              <tr>
                <td className="item_product" colSpan="6"><i className="fa-solid fa-chevron-left"></i>{pagination}
                  <i className="fa-solid fa-chevron-right"></i>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
        <div className="inline" />
        <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
        <div className="float-clear" />

      </div>
    );
  }
  updateProducts = (products, noPages, curPage) => { // arrow-function
    this.setState({ products: products, noPages: noPages, curPage: curPage });
  }
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Product;