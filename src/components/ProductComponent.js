import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import "./stylecume.css";
import "../boottrap/bootstrap-5.3.2-dist/css/bootstrap.min.css";
import "../boottrap/bootstrap-5.3.2-dist/js/bootstrap.bundle.min.js";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const { params } = this.props;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  apiGetProductsByCatID(cid) {
    axios.get(`/api/customer/products/category/${cid}`).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get(`/api/customer/products/search/${keyword}`).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  render() {
    const { products } = this.state;

    const prods = products.map((item) => (
      <div key={item._id} className="inline">
        <figure id="khung_sp">
          <Link to={`/product/${item._id}`}>
            <img
              src={`data:image/jpg;base64,${item.image}`}
              width="250px"
              height="300px"
              alt={item.name}
            />
          </Link>
          <figcaption className="text-center">
            <Link to={`/product/${item._id}`} className="name_product">
              {item.name}
            </Link>
            <br />
            <span className="price_product">{item.price}</span>
          </figcaption>
        </figure>
      </div>
    ));

    return (
      <div id="padding_product" className="text-center">
        <div id="padding_product_goiy">
          <span className="goi_y">GỢI Ý SẢN PHẨM</span>
        </div>
        {prods}
        {/* Footer */}
        <div className="footer">
          <div className="footer_item">
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
      </div>
    );
  }
}

export default withRouter(Product);
