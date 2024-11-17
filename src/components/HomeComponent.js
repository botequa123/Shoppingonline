import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./stylecume.css";
import "../boottrap/bootstrap-5.3.2-dist/css/bootstrap.min.css";
import "../boottrap/bootstrap-5.3.2-dist/js/bootstrap.bundle.min.js";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],

    };
  }
  render() {

    const newprods = this.state.newprods.map((item) => {
      if (!item) return null; // Kiểm tra nếu item là null hoặc undefined
      return (
        <div key={item._id} className="inline">
          <figure id='item_product_dep item_product_dep2'>
            <Link to={'/product/' + item._id}>
              <img src={"data:image/jpg;base64," + item.image} width="170" height="150px" alt="" />
            </Link>
            <figcaption className="text-center">
              <span className="name_product">{item.name}</span><br />
              <span className="price_product">{item.price} VNĐ</span>
            </figcaption>
          </figure>
        </div>
      );
    });

    const hotprods = this.state.hotprods.map((item) => {
      if (!item) return null; // Kiểm tra nếu item là null hoặc undefined
      return (
        <div key={item._id} className="inline">
          <figure id='item_product_dep'>
            <Link to={'/product/' + item._id}>
              <img src={"data:image/jpg;base64," + item.image} width="200px" height="200px" alt="" />
            </Link>
            <figcaption className="text-center">
              <span className="name_product">{item.name}</span><br />
              <span className="price_product">{item.price}</span>
            </figcaption>
          </figure>
        </div>
      );
    });

    return (
      <div>
        <div id='img_slider' className="align-center">
          <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://cdn.shopvnb.com/img/1920x640/uploads/slider/banner-sale-12_1695182579.webp" class="d-block w-100" alt="Cửa hàng cầu lông - Hình ảnh 1" />
              </div>
              <div class="carousel-item">
                <img src="https://fwbbadminton.com/wp-content/uploads/2024/09/thiet-ke-chua-co-ten-12_1727137763.webp" class="d-block w-100" alt="Cửa hàng cầu lông - Hình ảnh 2" />
              </div>
              <div class="carousel-item">
                <img src="https://cdn.shopvnb.com/img/1920x640/uploads/slider/ynx-eclp-banner_1695178004.webp" class="d-block w-100" alt="Cửa hàng cầu lông - Hình ảnh 3" />
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Trước</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Sau</span>
            </button>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </div>

        {/* phần 4 item img - Các sản phẩm cầu lông */}
        <div class="row">
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6">
            <div class="snip_banner">
              <img width="400" height="400" class="lazyload loaded" src="https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/1.1.webp" alt="Vợt Cầu Lông" data-was-processed="true" />
              <div class="content_banner">
                <p>Vợt Cầu Lông</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6">
            <div class="snip_banner">
              <img width="400" height="400" class="lazyload loaded" src="https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/2_1.webp" alt="Giày Cầu Lông" data-was-processed="true" />
              <div class="content_banner">
                <p>Giày Cầu Lông</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6">
            <div class="snip_banner">
              <img width="400" height="400" class="lazyload loaded" src="https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/3_1.webp" alt="Áo Cầu Lông" data-was-processed="true" />

              <div class="content_banner">
                <p>Áo Cầu Lông</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6">
            <div class="snip_banner">
              <img width="400" height="400" class="lazyload loaded" src="https://cdn.shopvnb.com/img/400x400/uploads/danh_muc/thumb/4.webp" alt="Quần Cầu Lông" data-was-processed="true" />

              <div class="content_banner">
                <p>Quần Cầu Lông</p>
              </div>
            </div>

          </div>
        </div>

        {/* phần new product */}
        <h2 className="text-center new">Sản phẩm mới</h2>
        <div id='new_product' className="align-center ">
          {newprods}   {newprods}
        </div>
        <div class='view_add_product'> <span class='xemthem'>Xem Thêm </span> </div>
        {/* phần hình ảnh  */}
        <div className='img_slide_prodcy'>
          <img src='https://cdn.shopvnb.com/img/600x360/uploads/tin_tuc/vot-cau-long-victor-khuyen-mai.webp' width="1000px" />
        </div>
        <div class="row promo-box">
          <div class="col-lg-3 col-md-3 col-sm-6 col-6">
            <div class="promo-item">
              <div class="icon">
                <img width="50" height="50" class="lazyload loaded" src="https://cdn.shopvnb.com/themes/images/policy_image_2.svg" alt="Vận chuyển toàn quốc" data-was-processed="true" />
              </div>
              <div class="info">
                Vận chuyển <span>TOÀN QUỐC</span> Thanh toán khi nhận hàng
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-6">
            <div class="promo-item">
              <div class="icon">
                <img width="50" height="50" class="lazyload loaded" src="https://cdn.shopvnb.com/themes/images/policy_image_1.svg" alt="" data-was-processed="true" />
              </div>
              <div class="info">
                <span>Bảo đảm chất lượng</span> Sản phẩm bảo đảm chất lượng.
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-6">
            <div class="promo-item">
              <div class="icon">
                <img width="50" height="50" class="lazyload loaded" src="https://cdn.shopvnb.com/themes/images/thanh_toan.svg" alt="" data-was-processed="true" />
              </div>
              <div class="info">
                Tiến hành <span>THANH TOÁN</span> Với nhiều <span>PHƯƠNG THỨC</span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-6">
            <div class="promo-item">
              <div class="icon">
                <img width="50" height="50" class="lazyload loaded" src="https://cdn.shopvnb.com/themes/images/doi_san_pham.svg" alt="" data-was-processed="true" />
              </div>
              <div class="info">
                <span>Đổi sản phẩm mới</span> nếu sản phẩm lỗi
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
      </div>

    );
    // slider 
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();


  }

  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }

}

export default Home;
