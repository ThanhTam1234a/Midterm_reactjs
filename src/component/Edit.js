import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

  const Edit = ({ history }) => {
  const { id } = useParams(); // Để lấy id từ url
  const [product, setProduct] = useState(null); // khới tạo product null để lấy lưu giá trị của product và cập nhập lại dữ liệu lên setproduct

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);
  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      setProduct(prevProduct => ({
        ...prevProduct,
        image: "/images/" +file.name,
      }));
    }
  };
  // dùng để xóa tên ảnh khi đã lỡ chọn tên ảnh và k ấn nút lưu rồi thoát ra
  useEffect(() => {
    return () => {
      setProduct(prevProduct => ({
        ...prevProduct,
        image: '',
      }));
    };
  }, []);

const handleChange = event => {
    const { name, value } = event.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const onSave = async e => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`http://localhost:3000/products/${id}`, product);

        alert('Cập nhật sản phẩm thành công');

        window.location.href = '/'; // Navigate to the product list page
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wrapper">
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="panel panel-warning col-md-8 ml">
            <div className="container">
              <div className="panel-body mt-4">
                <form onSubmit={onSave}>
                  <div className="form-group">
                    <label>Tên Sản phẩm :</label>
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Giá Sản phẩm ($) :</label>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Chọn Ảnh :</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      className="form-control"
                    />
                  </div>
                  <label>Loại sản phẩm:</label>
                  <select
                    className="form-control"
                    name="name_category"
                    value={product.name_category}
                    onChange={handleChange}
                    required
                  >
                    <option value="sản phẩm mới">mới</option>
                    <option value="sản phẩm hot">hot</option>
                    <option value="sản phẩm khuyến mãi">khuyến mãi</option>
                  </select>
                  <div className="form-group">
                    <label>Màu bánh :</label>
                    <input
                      type="text"
                      name="color"
                      value={product.color}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Nguyên liệu :</label>
                    <input
                      type="text"
                      name="material"
                      value={product.material}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Hạn sử dụng :</label>
                    <input
                      type="date"
                      name="expiry_date"
                      value={product.expiry_date}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Xuất xứ :</label>
                    <input
                      type="text"
                      name="origin"
                      value={product.origin}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <label>Tình trạng hàng :</label>
                  <select
                    className="form-control"
                    name="tinhtranghang"
                    value={product.tinhtranghang}
                    onChange={handleChange}
                    required="required"
                  >
                    <option value={true}>Còn hàng</option>
                    <option value={false}>Hết hàng</option>
                  </select>
                  <div className="form-group">
                    <label>Mô tả :</label>
                    <input
                      type="text"
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <br />
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Lưu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
