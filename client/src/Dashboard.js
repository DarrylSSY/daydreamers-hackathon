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
      economyScore : '',
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    } else {
      this.setState({ token: token }, () => {
        this.getUser();
        this.calculateEconomyScore();
      });
    }
  }

  getOverallRisk = () => {

      let riskPercent = (this.state.income*5+this.state.questionnaireScore*2+this.state.wealth*5+this.getMonthDifference(new Date(this.state.registrationDate), new Date())+this.state.economyScore)
      console.log(riskPercent)
      if (riskPercent > 79){
          return "You have a high tolerance for risk"
      }
      if (riskPercent > 59){
          return "You have a moderately high tolerance for risk"
      }
      if (riskPercent > 39){
          return "You have a moderate tolerance for risk"
      }
      if (riskPercent > 19){
          return "You have a moderately low tolerance for risk"
      }
      else{
          return "You have a low tolerance for risk"
      }
  }

  calculateEconomyScore = () => {
    this.setState({ loading: true});
    let data = '?';
    data = `${data}`;
    axios.get(`https://tablebuilder.singstat.gov.sg/api/table/tabledata/M015631?limit=1&sortBy=key desc`)
        .then((res) => {
        let GDPChange = res.data.Data.row[0].columns[0].value;
        let economyScore = 0;
        if (GDPChange < -80){
            economyScore = 0;
        }
        else if (GDPChange < -60){
            economyScore = 2;
        }
        else if (GDPChange < -40){
            economyScore = 4;
        }
        else if (GDPChange < -20){
            economyScore = 6;
        }
        else if (GDPChange < -9){
            economyScore = 8;
        }
        else if (GDPChange < 10){
            economyScore = 10;
        }
        else if (GDPChange < 21){
            economyScore = 12;
        }
        else if (GDPChange < 41){
            economyScore = 14;
        }
        else if (GDPChange < 61){
            economyScore = 16;
        }
        else if (GDPChange < 81){
            economyScore = 18;
        }
        else{
            economyScore = 20;
        }
        this.setState({economyScore: economyScore})

        }).catch((err) => {
          swal({
            text: err.response.data.errorMessage,
            icon: "error",
            type: "error"
          });
          this.setState({loading: false})
    });

  }


  getUser = () => {
    
    this.setState({ loading: true });

    let data = '?';
    data = `${data}`;
    axios.get(`http://localhost:2000/get-user`, {
      headers: {
        'token': this.state.token,
        'username': localStorage.getItem('user_id'),
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
      this.setState({ loading: false},()=>{});
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
          Welcome back!
          
          <div class="grid-container">
            <div class="grid-child">
              <table>
                <tr>
                  <th>Income Score:</th>
                  <th>Questionnaire Score:</th>
                </tr>
                <tr>
                  <td>
                    <p class="score">{this.state.income*5}</p>
                    /25
                  </td>
                  <td>
                    <p class="score">{this.state.questionnaireScore*2}</p>
                    /20 
                  </td>
                 </tr>
                 <tr>
                    <th>Wealth Score:</th>
                    <th>Duration Score:</th>
                </tr>
                <tr>
                  <td>
                    <p class="score">{this.state.wealth*5}</p>
                    /25
                  </td>
                  <td>
                    <p class="score">{this.getMonthDifference(new Date(this.state.registrationDate), new Date())}</p>
                    /10
                  </td>
                </tr>
                <tr>
                  <th colspan="2">Economy Score:</th>
                </tr>
                <tr>
                  <td colspan="2">
                    <p class="score">{this.state.economyScore}</p>
                    /20
                  </td>
                </tr>
               </table>
            </div>
 
            <div class="grid-child">
              <h2>{this.getOverallRisk()}</h2>
              <div class="pie animate no-round" style={{"--p":80, "--c":"orange", margin: "auto"}}> 80%</div>
            </div>
          </div>
          <br />
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
