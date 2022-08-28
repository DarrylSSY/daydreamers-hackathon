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
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder="Confirm Password"
            required
          />
          <br /><br />
          <FormControl variant="standard" style={{minWidth: 182, textAlign: "left"}}>
            <InputLabel id="select-basic" >Total Net Worth</InputLabel>
            <Select
                id="select-basic"
                type="wealth"
                name="wealth"
                value={this.state.wealth}
                onChange={this.onChange}
                required
            >
              <MenuItem value={0}>Less than $1000</MenuItem>
              <MenuItem value={1}>$1000 to $11999</MenuItem>
              <MenuItem value={2}>$12000 to $35999</MenuItem>
              <MenuItem value={3}>$36000 to $59999</MenuItem>
              <MenuItem value={4}>$60000 and $83999</MenuItem>
              <MenuItem value={5}>$84000 and above</MenuItem>
            </Select>
          </FormControl>
          <br /><br />
          <FormControl variant="standard" style={{minWidth: 182, textAlign: "left"}}>
            <InputLabel id="select-basic" >Monthly income</InputLabel>
            <Select
              id="select-basic"
              type="income"
              name="income"
              value={this.state.income}
              onChange={this.onChange}
              required
            >
              <MenuItem value={0}>No Income</MenuItem>
              <MenuItem value={1}>Less than $1000</MenuItem>
              <MenuItem value={2}>$1000 to $2999</MenuItem>
              <MenuItem value={3}>$3000 to $4999</MenuItem>
              <MenuItem value={4}>$5000 to $6999</MenuItem>
              <MenuItem value={5}>$7000 and above</MenuItem>
            </Select>
          </FormControl>
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username == '' && this.state.password == ''}
            onClick={this.register}
          >
            Register
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <br/><br/>
          <div style={{textAlign: "center"}}>
              If you have an account,&nbsp;
          <Link href="/">
            login here
          </Link>
          </div>
        </div>
      </div>
    );
  }
}
