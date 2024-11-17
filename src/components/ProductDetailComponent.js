import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import "./stylecume.css";
import "../boottrap/bootstrap-5.3.2-dist/css/bootstrap.min.css";
import "../boottrap/bootstrap-5.3.2-dist/js/bootstrap.bundle.min.js";
class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }
  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div id='top_product' >
          <h2 className="text-center">THÔNG TIN SẢN PHẨM </h2>
          <figure className="caption-right align-center ">
            <img src={"data:image/jpg;base64," + prod.image} width="500px" height="500px" alt="" />
            <figcaption>
              <form>
                <table>
                  <tbody className='khung_pr_name'>
                    <tr className='info_pr'>
                      <td className='id_pr' align="right">Mã Sản Phẩm:</td>
                      <td className='id_pr'>{prod._id}</td>
                    </tr>
                    <tr className='info_pr'>
                      <td className='id_name' align="right">Tên Sản Phẩm:</td>
                      <td className='id_name'>{prod.name}</td>
                    </tr>
                    <tr className='info_pr'>
                      <td className='id_price' align="right">Gía Sản Phẩm:</td>
                      <td className='id_price'>{prod.price}</td>
                      <td className='id_caretogy phanloai' align="right">Phân Loại:</td>
                      <td className='id_caretogy'>{prod.category.name}</td>
                    </tr>
                    <tr className='info_pr'>
                      <td className='quantity' align="right">Số Lượng:</td>
                      <td className='quantity'><input placeholder='0' type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} /></td>
                    </tr>
                    <tr className='info_pr info_pr2'>
                      <td><input class="addgio_hang" type="submit" value="Thêm Vào Giỏ hàng" onClick={(e) => this.btnAdd2CartClick(e)} /></td>
                      <td><input class="buy_hang" type="submit" value="Mua Hàng" onClick={(e) => this.btnAdd2CartClick(e)} /></td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </figcaption>
          </figure>

          {/* phần mô tả  */}
          <div id='khung_mota'>
            <div className='tt'>
              <div class="width">
                <span className='namept'>  CAM KẾT CHẤT LƯỢNG</span> <br></br>
                <div className='tbct'>
                  <span >
                    Minh Phúc Sport cam kết cung cấp các sản phẩm cầu lông chính hãng từ các thương hiệu uy tín như Yonex, Victor, Lining, Adidas,... đảm bảo nguồn gốc xuất xứ rõ ràng và đạt tiêu chuẩn chất lượng cao nhất.
                  </span>  <br></br>
                  <span>* Mỗi sản phẩm trước khi đến tay khách hàng đều được kiểm tra kỹ lưỡng về chất lượng, độ bền và hiệu suất. Minh Phúc Sport sẵn sàng đổi trả nếu khách hàng phát hiện lỗi sản xuất.</span><br></br>
                  <span>* Với đội ngũ nhân viên giàu kinh nghiệm, chúng tôi cam kết mang lại sự tư vấn tận tình, hỗ trợ khách hàng chọn sản phẩm phù hợp với nhu cầu và kỹ năng chơi cầu lông.</span><br></br>
                  <span>* Minh Phúc Sport luôn nỗ lực mang đến giá cả cạnh tranh nhất trên thị trường, đi kèm với các chương trình khuyến mãi và ưu đãi hấp dẫn dành cho khách hàng thân thiết.</span><br></br>
                  <span>* Hỗ trợ bảo hành sản phẩm chính hãng theo quy định của nhà sản xuất, cùng với các dịch vụ như đan vợt, sửa chữa và bảo dưỡng thiết bị cầu lông chuyên nghiệp.</span>
                </div>
              </div>
              <div class="width">
                <span className='namept'>  HƯỚNG DẪN MUA HÀNG</span> <br></br>
                <div className='tbct'>

                  <span>Đặt hàng qua website: Quý khách vui lòng đăng nhập, chọn sản phẩm, truy cập giỏ hàng và đặt đơn thanh toán</span><br></br>
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
          </div>
          <div class="footer_item">
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
        </div >

      );
    }
    return (<div />);
  }
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }
  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id);
      if (index === -1) {
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else {
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('Thành công');
    } else {
      alert('Vui lòng nhập số lượng');
    }
  }
}
export default withRouter(ProductDetail);