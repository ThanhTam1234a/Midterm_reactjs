import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [], // Mảng chứa các sản phẩm
            id: '',
            name: '',
            price: '',
            image: '',
            color: '',
            name_category: '',
            material: '',
            expiry_date: '',
            origin: '',
            description: '',
            tinhtranghang: true,
        };
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            axios({
                method: 'GET',
                url: `http://localhost:3000/products/${id}`,
                data: null
            })
                .then(res => {
                    var data = res.data;
                    this.setState(prevState => ({
                        product: [...prevState.products, data===data.id], // Thêm sản phẩm vào mảng products
                        id: data.id,
                        name: data.name,
                        price: data.price,
                        image: data.image,
                        color: data.color,
                        name_category: data.name_category,
                        material: data.material,
                        expiry_date: data.expiry_date,
                        origin: data.origin,
                        description: data.description,
                        tinhtranghang: data.tinhtranghang
                    }));
                })

                .catch(err => {
                    console.error(err);
                });
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

        onChange = event => {
            var target = event.target;
            var name = target.name;
            var type = target.type;
            var value = target.value;
            if (name === 'tinhtranghang') {
                value = target.value === 'true' ? true : false;
            }
            if (type === 'file') {
                value = this.image.value.replace(/C:\\fakepath\\/i, '/images/');
            }

            this.setState({
                [name]: value
            });
        };

    onSave = e => {
        e.preventDefault();
        var {
            id,
            name,
            price,
            image,
            name_category,
            color,
            material,
            expiry_date,
            origin,
            description,
            tinhtranghang
        } = this.state;
        var { history } = this.props;
        if (id) {
            axios({
                method: 'PUT',
                url: `http://localhost:3000/products/${id}`,
                data: {
                    name: name,
                    price: price,
                    image: image,
                    color: color,
                    name_category: name_category,
                    material: material,
                    expiry_date: expiry_date,
                    origin: origin,
                    description: description,
                    tinhtranghang: tinhtranghang
                }
            })
                .then(res => {
                    toast.success('Cập nhật sản phẩm thành công');
                    history.goBack();
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            if (
                name === '' &&
                price === '' &&
                image === '' &&
                material === '' &&
                expiry_date === ''
            ) {
                toast.warn('Vui lòng nhập đủ nội dung');
            } else {
                axios({
                    method: 'POST',
                    url: 'http://localhost:3000/products',
                    data: {
                        name: name,
                        price: price,
                        image: image,
                        color: color,
                        name_category: name_category,
                        material: material,
                        expiry_date: expiry_date,
                        origin: origin,
                        description: description,
                        tinhtranghang: tinhtranghang
                    }
                })
                    .then(res => {
                        alert('Thêm sản phẩm thành công');

                        window.location.href = '/'; // Navigate to the product list page
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    };

    onClear = () => {
        this.setState({
            name: '',
            price: '',
            image: '',
            color: '',
            name_category: '',
            material: '',
            expiry_date: '',
            origin: '',
            description: '',
            tinhtranghang: true
        });
    };

    render() {

        var { product } = this.state;
        return (
            <React.Fragment>
                <div id="wrapper">
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <div className="panel panel-warning col-md-8 ml">
                                <div className="container">
                                    <div className="panel-body mt-4">
                                        <form onSubmit={this.onSave}>
                                            <div className="form-group">
                                                <label>Tên Sản phẩm :</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={product.name}
                                                    onChange={this.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Giá Sản phẩm ($) :</label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={product.price}
                                                    onChange={this.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Chọn Ảnh :</label>
                                                <input
                                                    type="file"
                                                    name="image"
                                                    ref={input => {
                                                        this.image = input;
                                                    }}
                                                    onChange={this.onChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <label>Loại sản phẩm:</label>
                                            <select
                                                className="form-control"
                                                name="name_category"
                                                value={product.name_category}
                                                onChange={this.handleChange}
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
                                                    onChange={this.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Nguyên liệu :</label>
                                                <input
                                                    type="text"
                                                    name="material"
                                                    value={product.material}
                                                    onChange={this.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Hạn sữ dụng :</label>
                                                <input
                                                    type="date"
                                                    name="expiry_date"
                                                    value={product.expiry_date}
                                                    onChange={this.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Xuất xứ :</label>
                                                <input
                                                    type="text"
                                                    name="origin"
                                                    value={product.origin}
                                                    onChange={this.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <label>Tình trạng hàng :</label>
                                            <select
                                                className="form-control"
                                                name="tinhtranghang"
                                                value={product.tinhtranghang}
                                                onChange={this.onChange}
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
                                                    onChange={this.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <br />
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary">
                                                    Lưu
                                                </button>
                                                &nbsp;
                                                <button
                                                    type="button"
                                                    onClick={this.onClear}
                                                    className="btn btn-primary"
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Add;
