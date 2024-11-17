import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import '../componentsStyleCSS/style.css'
import '../componentsStyleCSS/fontawesome-free-6.4.2-web/css/all.min.css'
class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (

      <div className="float-righ">
        <h2 id="as" className="text-center ason">Chi tiết phân loại</h2>
        <form className="float-righ">
          <table className="as">
            <tbody className="category_table ">
              <tr>
                <td className="dislay_inline">ID</td>
                <td><input className="input_id_name" type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} /></td>
              </tr>
              <tr>
                <td className="dislay_inline ">Name</td>
                <td><input className="input_id_name" type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td className="item_btn">
                  <input className="btn btn_submit" type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)} />
                  <input className="btn btn-update" type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} />
                  <input className="btn btn-delet" type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>


    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Vui lòng nhập tên!');
    }
  }
  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành công');
        this.apiGetCategories();
      } else {
        alert('Thất bại!');
      }
    });
  }
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Vui lòng nhập id và tên');
    }
  }
  // apis
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành công');
        this.apiGetCategories();
      } else {
        alert('Thất bại!');
      }
    });
  }

  // event-handlers
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Bạn chắc chắn chưa?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Vui lòng nhập ID');
      }
    }
  }
  // apis
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành công');
        this.apiGetCategories();
      } else {
        alert('Thất bại');
      }
    });
  }
}
export default CategoryDetail;