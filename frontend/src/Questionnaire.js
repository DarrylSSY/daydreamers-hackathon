import React, { Component } from 'react';
import swal from 'sweetalert';
import {Button, TextField, Link, Select, MenuItem, InputLabel, FormControl} from '@material-ui/core';
const axios = require('axios');

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm_password: '',
      wealth: '',
      income: '',
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {

    axios.post('http://localhost:2000/register', {
      username: this.state.username,
      password: this.state.password,
      wealth: this.state.wealth,
      income: this.state.income,
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      this.props.history.push('/');
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  render() {
    return (
        <div style={{ marginTop: '200px' }}>
          <div>
            <h2>Sign Up</h2>
          </div>

          <div>
            <TextField
                id="standard-basic"
                type="text"
                autoComplete="off"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                placeholder="Mobile No"
                required
            />
            <br /><br />
            <Button
                className="button_style"
                variant="contained"
                color="primary"
                size="small"
                disabled={this.state.username == ''}
                onClick={this.register}
            >
              Register
            </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/">
              Login
            </Link>
          </div>
        </div>
    );
  }
}
