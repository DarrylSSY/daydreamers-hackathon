import React, { Component } from 'react';
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import swal from 'sweetalert';
const axios = require('axios');

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      income: '',
      questionnaireScore: '',
      wealth: '',
      registrationDate: '',
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    } else {
      this.setState({ token: token }, () => {
        this.getUser();
      });
    }
  }

  getUser = () => {
    
    this.setState({ loading: true });

    let data = '?';
    data = `${data}`;
    axios.get(`http://localhost:2000/get-user`, {
      username: this.state.username,
      headers: {
        'token': this.state.token
      }

    }).then((res) => {
      this.setState({ loading: false, wealth: res.data.userdata[0].wealth, income: res.data.userdata[0].income, questionnaireScore: res.data.userdata[0].questionnaireScore, registrationDate: res.data.userdata[0].registrationDate});
      this.setState({wealth: res.data.userdata[0].wealth})
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.setState({ loading: false, products: []},()=>{});
    });
  }


  logOut = () => {
    localStorage.setItem('token', null);
    this.props.history.push('/');
  }

  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name }, () => { });
    }
    this.setState({ [e.target.name]: e.target.value }, () => { });
    if (e.target.name == 'search') {
      this.setState({ page: 1 }, () => {
        this.getUser();
      });
    }
  };
  getMonthDifference = (startDate, endDate) => {
      let months = endDate.getMonth() - startDate.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear())
      if (months > 9){
        months = 10
      }
      return months;
  }



  render() {
    return (
      <div>
        {this.state.loading && <LinearProgress size={40} />}
        <div>
          <h2>Dashboard</h2>
          Income Score: {this.state.income*5}/25 <br/>
          Questionnaire Score: {this.state.questionnaireScore*2}/20 <br/>
          Wealth Score: {this.state.wealth*5}/25 <br/>
          Duration Score: {this.getMonthDifference(new Date(this.state.registrationDate), new Date())}/10 <br/>
          <h1>Your risk level is {100-(this.state.income*5+this.state.questionnaireScore*2+this.state.wealth*5+this.getMonthDifference(new Date(this.state.registrationDate), new Date()))}%</h1>
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
        </div>
      </div>
    );
  }
}