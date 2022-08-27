import React, { Component } from 'react';
import swal from 'sweetalert';
import {Button, TextField, Link, Select, MenuItem, InputLabel, FormControl} from '@material-ui/core';
const axios = require('axios');

export default class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      username: '',
      questionnaireScore: '',
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  submit = () => {

    axios.post('http://localhost:2000/complete-questionnaire', {
      headers: {
        'token': this.state.token
      },
      username: localStorage.getItem('user_id'),
      questionnaireScore: this.state.questionnaireScore,
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      this.props.history.push('/dashboard');
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
            <h2>Questionnaire</h2>
          </div>

          <div>
            <TextField
                id="standard-basic"
                type="text"
                autoComplete="off"
                name="questionnaireScore"
                value={this.state.questionnaireScore}
                onChange={this.onChange}
                placeholder="Score"
                required
            />
            <br /><br />
            <Button
                className="button_style"
                variant="contained"
                color="primary"
                size="small"
                onClick={this.submit}
            >
              Submit
            </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
    );
  }
}
