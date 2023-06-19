import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./ProductList.css";

import "bootstrap/dist/css/bootstrap.css";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onDelete = (id) => {
    // Gửi một yêu cầu DELETE đến điểm cuối API để xóa sản phẩm với id đã chỉ định
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then((response) => {
        // Nếu yêu cầu thành công (mã trạng thái 200), tiếp tục các bước sau đây
        // Xóa sản phẩm thành công, cập nhật danh sách sản phẩm

        // Hiển thị một thông báo để thông báo cho người dùng về việc xóa thành công
        window.alert("Xóa sản phẩm thành công");

        // Tải lại trang hiện tại để cập nhật danh sách sản phẩm
        window.location.reload();

        // Gọi phương thức fetchProducts() để cập nhật danh sách sản phẩm sau khi xóa thành công
        this.fetchProducts();
      })
      .catch((error) => {
        // Nếu xảy ra lỗi trong quá trình yêu cầu, ghi log lỗi ra console để kiểm tra và sửa lỗi
        console.log(error);
      });
  };

  render() {
    const { products } = this.state;

    return (
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Manage <b>Product</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <a
                    href="./Add"
                    className="btn btn-success"
                    data-toggle="modal"
                  >
                    <span>Add New Product</span>
                  </a>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Color</th>
                  <th>Category</th>
                  <th>Material</th>
                  <th>Expiry Date</th>
                  <th>Origin</th>
                  <th>Description</th>
                  <th>Tình trạng hàng</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <img
                        src={product.image}
                        alt="Product"
                        style={{ width: "80px", height: "80px" }}
                      />
                    </td>
                    <td>{product.color}</td>
                    <td>{product.name_category}</td>
                    <td>{product.material}</td>
                    <td>{product.expiry_date}</td>
                    <td>{product.origin}</td>
                    <td>{product.description}</td>
                    <td>{product.tinhtranghang}</td>
                    <td>
                      <a href={`/Edit/${product.id}`} className="edit">
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Edit"
                        >
                          
                        </i>
                      </a>

                      <a
                        onClick={() => this.onDelete(product.id)}
                        className="delete"
                        data-toggle="modal"
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Delete"
                        >
                          delete
                        </i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductList;
