import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import '../componentsStyleCSS/style.css';
import '../componentsStyleCSS/fontawesome-free-6.4.2-web/css/all.min.css';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: '',
      cmbCategory: '', // Default value can be empty or 'none'
      imgProduct: '',
    };

    // Binding methods to ensure 'this' context is correct
    this.apiGetCategories = this.apiGetCategories.bind(this);
    this.apiPostProduct = this.apiPostProduct.bind(this);
    this.apiPutProduct = this.apiPutProduct.bind(this);
    this.apiDeleteProduct = this.apiDeleteProduct.bind(this);
    this.previewImage = this.previewImage.bind(this);
  }

  render() {
    const { categories, txtID, txtName, txtPrice, cmbCategory, imgProduct } = this.state;

    // Render categories
    const cates = categories.map((cate) => {
      return (
        <option key={cate._id} value={cate._id} selected={cate._id === cmbCategory}>
          {cate.name}
        </option>
      );
    });

    return (
      <div className="float-right product-detail">
        <h2 id="PRODUCT_detail_mobole" className="text-center">
          Chi tiết sản phẩm
        </h2>
        <form>
          <table id="table_product">
            <tbody>
              <tr>
                <td className="name">ID</td>
                <td>
                  <input
                    id="ipproduct"
                    type="text"
                    value={txtID}
                    onChange={(e) => this.setState({ txtID: e.target.value })}
                    readOnly={true}
                  />
                </td>
              </tr>
              <tr>
                <td className="name">Tên</td>
                <td>
                  <input
                    id="ipproduct"
                    type="text"
                    value={txtName}
                    onChange={(e) => this.setState({ txtName: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <td className="name">Giá</td>
                <td>
                  <input
                    id="ipproduct"
                    type="text"
                    value={txtPrice}
                    onChange={(e) => this.setState({ txtPrice: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <td className="name">Hình ảnh</td>
                <td>
                  <input type="file" name="fileImage" accept="image/jpeg, image/png, image/gif" onChange={this.previewImage} />
                </td>
              </tr>
              <tr>
                <td className="name">Phân loại</td>
                <td>
                  <select
                    value={cmbCategory}
                    onChange={(e) => this.setState({ cmbCategory: e.target.value })}
                  >
                    <option value="">Chọn phân loại</option> {/* default value can be an empty string */}
                    {cates}
                  </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td className="btn">
                  <input className="btn btn_submit" type="submit" value="ADD NEW" onClick={this.btnAddClick} />
                  <input className="btn btn-update" type="submit" value="UPDATE" onClick={this.btnUpdateClick} />
                  <input className="btn btn-delet" type="submit" value="DELETE" onClick={this.btnDeleteClick} />
                </td>
              </tr>
              <tr>
                <td id="imgproduct img_table" colSpan="2">
                  <img src={imgProduct} width="300px" height="300px" alt="" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image,
      });
    }
  }

  // event-handlers

  btnAddClick = (e) => {
    e.preventDefault();
    const { txtName, txtPrice, cmbCategory, imgProduct } = this.state;

    if (!txtName || !txtPrice || !cmbCategory || !imgProduct) {
      alert('Vui lòng điền tất cả');
      return;
    }

    const prod = {
      name: txtName,
      price: parseFloat(txtPrice),
      category: cmbCategory,
      image: imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''), // Remove base64 prefix
    };

    this.apiPostProduct(prod);
  };

  // API calls
  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành công');
        this.apiGetProducts();
      } else {
        alert('Thất bại!');
      }
    });
  }

  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages);
      } else {
        axios.get('/api/admin/products?page=' + (this.props.curPage - 1), config).then((res) => {
          const result = res.data;
          this.props.updateProducts(result.products, result.noPages);
        });
      }
    });
  }

  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  btnUpdateClick = (e) => {
    e.preventDefault();
    const { txtID, txtName, txtPrice, cmbCategory, imgProduct } = this.state;

    if (!txtID || !txtName || !parseFloat(txtPrice) || !cmbCategory || !imgProduct) {
      alert('Please fill out all fields.');
      return;
    }

    const prod = {
      name: txtName,
      price: parseFloat(txtPrice),
      category: cmbCategory,
      image: imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''),
    };

    this.apiPutProduct(txtID, prod);
  };

  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành công');
        this.apiGetProducts();
      } else {
        alert('Thất bại!');
      }
    });
  }

  btnDeleteClick = (e) => {
    e.preventDefault();
    if (window.confirm('Bạn chắc chắn chưa?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('Vui lòng nhập ID');
      }
    }
  };

  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành công');
        this.apiGetProducts();
      } else {
        alert('Thất bại!');
      }
    });
  }
}

export default ProductDetail;
