import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';

import { Form, Input, Select} from 'antd';

const {Option} = Select;

class Register extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeType = this.onChangeType.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            type: '',

        };
    }
    onChangeName(e) {
        this.setState({ name: e.target.value });
      }
    
      onChangeEmail(e) {
        this.setState({ email: e.target.value });
      }
    
      onChangePassword(e) {
        this.setState({ password: e.target.value });
      }
    
      onChangeType(e) {
 
        this.setState({ type: e })
        
      }
    
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
   
                const {
                    name, email, password, type
                  } = this.state;
                  const userObject = {
                    name,
                    email,
                    password,
                    type,
                  };
                  console.log(userObject);
                  axios.post('http://localhost:4000/users/new-user', userObject)
                    .then((res) => {
                      console.log(res);
                      if (res.data.name === "MongoError") {
   
                        var status = document.getElementById('statusMessage');
                        status.innerHTML = 'Unsuccessful signup; make sure email is unique';
                        status.style.display = "block";
                      } else {

                        var status = document.getElementById('statusMessage');
                        console.log(status);
                        status.innerHTML = 'Successful signup';
                        status.style.color = "green";
                        status.style.display = "block";
                      }
                    });
                  this.setState({
                    name: '', email: '', password: '', type: '',
                  });
                
                Router.push('/account/login');
            } else {
            }
        });
    }

    // handleSubmit = e => {
    //     e.preventDefault();

    // };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onSubmit={this.handleSubmit}>
                        <ul className="ps-tab-list">
                            <li>
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li className="active">
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <div id='statusMessage' style={{color: 'red', display:'none'}}>

                                </div>
                                <h5>Register An Account</h5>
                                <div className="form-group form-forgot">
                                    <Form.Item>
                                        {getFieldDecorator('name', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your name!',
                                                },
                                            ],
                                        })(
                                            <Input
                                                className="form-control"
                                                type="Name"
                                                onChange={this.onChangeName}
                                                placeholder="Name"
                                            />
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item>
                                        {getFieldDecorator('email', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your username!',
                                                },
                                            ],
                                        })(
                                            <Input
                                                className="form-control"
                                                type="email"
                                                onChange={this.onChangeEmail}
                                                placeholder="Email address"
                                            />
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your password!',
                                                },
                                            ],
                                        })(
                                            <Input
                                                className="form-control"
                                                type="password"
                                                onChange={this.onChangePassword}
                                                placeholder="Password..."
                                            />
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item>
                                        {getFieldDecorator('type', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                    'Account Type Required!',
                                                },
                                            ],
                                        })(
                                        <Select placeholder = "Select Account Type" onChange={this.onChangeType}>
                                            <Option value="Customer">Customer</Option>
                                            <Option value="Seller">Seller</Option>
                                            
                                        </Select>
        
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        // onSubmit={this.onSubmit}
                                        className="ps-btn ps-btn--fullwidth">
                                        Register
                                    </button>
                                </div>
                            </div>
                            <div className="ps-form__footer">
                                {/* <p>Connect with:</p>
                                <ul className="ps-list--social">
                                    <li>
                                        <a className="facebook" href="#">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="google" href="#">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="twitter" href="#">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="instagram" href="#">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul> */}
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
const WrapFormRegister = Form.create()(Register);

export default WrapFormRegister;
