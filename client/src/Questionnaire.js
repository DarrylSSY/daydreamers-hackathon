import React, { Component } from 'react';
import swal from 'sweetalert';
import {Button, TextField, Link, Select, MenuItem, InputLabel, FormControl, Typography} from '@material-ui/core';
const axios = require('axios');

export default class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      username: '',
      questionnaireScore: '',
      wealth1: '',
      wealth2: '',
      wealth3: '',
      wealth4: '',
      wealth5: '',
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
    let questionnaireScore = Math.round((this.state.wealth1 + this.state.wealth2 + this.state.wealth3 + this.state.wealth4 + this.state.wealth5)/4.5)

    axios.post('http://localhost:2000/complete-questionnaire', {
      headers: {
        'token': this.state.token
      },
      username: localStorage.getItem('user_id'),
      questionnaireScore: questionnaireScore,
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
            <FormControl variant="standard" style={{maxWidth: "30%", minWidth: "30%", textAlign: "left"}}>
              <Typography>Depending on the investment, the value of your assets can remain relatively stable (generally
                increasing slowly but steadily) or may fluctuate (rising and falling in response to market
                movements). In general, investments that fluctuate have the potential to grow faster; however,
                they are more risky than stable investments. How much fluctuation are you willing to accept for
                your savings?
              </Typography>
              <Select
                  id="select-basic"
                  type="wealth1"
                  name="wealth1"
                  value={this.state.wealth1}
                  onChange={this.onChange}
                  required
              >
                <MenuItem value={1}>I do not want to experience any falls, even if it means my investment returns are relatively
                  small.</MenuItem>
                <MenuItem value={5}>I would be willing to accept occasional falls as long as my savings are in sound, high-quality
                  investments that could be expected to grow over time.</MenuItem>
                <MenuItem value={9}>I am willing to take substantial risk in exchange for significantly higher potential returns</MenuItem>
              </Select>
            </FormControl>
            <br /><br /><br /><br />
            <FormControl variant="standard" style={{maxWidth: "30%", minWidth: "30%", textAlign: "left"}}>
              <Typography id="select-basic" >Some investments may keep your money “safe”, but may not earn a high return. (Consider
                what S$100 would purchase both 10 years ago and today.) Choose the statement that is most
                accurate for your investment savings goal.</Typography>
              <Select
                  id="select-basic"
                  type="wealth2"
                  name="wealth2"
                  value={this.state.wealth2}
                  onChange={this.onChange}
                  required
              >
                <MenuItem value={1}>My savings should be 100% safe, even if it means my investment returns do not keep up with inflation.</MenuItem>
                <MenuItem value={5}>It is important that the value of my investments keep pace with inflation. I am willing to risk an occasional fall in the value of my original investment (my principal) so my investments may grow at about the same rate as inflation over time</MenuItem>
                <MenuItem value={9}>It is important that my investments grow faster than inflation. I am willing to accept a fair amount of risk to try to achieve this.</MenuItem>
              </Select>
            </FormControl>
            <br /><br /><br /><br />
            <FormControl variant="standard" style={{maxWidth: "30%", minWidth: "30%", textAlign: "left"}}>
              <Typography>You understand the value of your investment portfolio will fluctuate over time. This means it will
                rise and fall in response to market movements. What is the maximum loss of value you could
                accept in any one-year period?
              </Typography>
              <Select
                  id="select-basic"
                  type="wealth3"
                  name="wealth3"
                  value={this.state.wealth3}
                  onChange={this.onChange}
                  required
              >
                <MenuItem value={1}>0%</MenuItem>
                <MenuItem value={3}>5%</MenuItem>
                <MenuItem value={5}>10%</MenuItem>
                <MenuItem value={7}>20%</MenuItem>
                <MenuItem value={9}>30%</MenuItem>
              </Select>
            </FormControl>
            <br /><br /><br /><br />
            <FormControl variant="standard" style={{maxWidth: "30%", minWidth: "30%", textAlign: "left"}}>
              <Typography>Consider two hypothetical investments, A and B:
                <br/>- Investment A provides an average annual return of 3% with a minimal potential fall in
                the value of the original investment (the principal).
                <br/>- Investment B provides an average annual return of 7% but the value of the original
                investment (the principal) may decline 20% or more in any year.
                <br/>How would you choose to invest your retirement savings in these two investments?</Typography>
              <Select
                  id="select-basic"
                  type="wealth4"
                  name="wealth4"
                  value={this.state.wealth4}
                  onChange={this.onChange}
                  required
              >
                <MenuItem value={1}>100% in Investment A and 0% in Investment B</MenuItem>
                <MenuItem value={3}>75% in Investment A and 25% in Investment B</MenuItem>
                <MenuItem value={5}>50% in Investment A and 50% in Investment B</MenuItem>
                <MenuItem value={7}>25% in Investment A and 75% in Investment B</MenuItem>
                <MenuItem value={9}>0% in Investment A and 100% in Investment B</MenuItem>
              </Select>
            </FormControl>
            <br /><br /><br /><br />
            <FormControl variant="standard" style={{maxWidth: "30%", minWidth: "30%", textAlign: "left"}}>
              <Typography >This question gauges your ability to take risk. The proceeds of the investment will be used to
                fund your financial goal. If there is a shortfall in your investment proceeds, to what extent are
                you able to reduce or eliminate the expense that will be incurred in pursuing that financial goal?</Typography>
              <Select
                  id="select-basic"
                  type="wealth5"
                  name="wealth5"
                  value={this.state.wealth5}
                  onChange={this.onChange}
                  required
              >
                <MenuItem value={1}>Expense cannot be reduced at all.
                  (E.g. the proceeds will be used to fund my basic subsistence needs during retirement.)</MenuItem>
                <MenuItem value={3}>Expense can be reduced by one-third.</MenuItem>
                <MenuItem value={7}>Expense can be reduced by two-third.</MenuItem>
                <MenuItem value={9}>Expense can be totally eliminated.
                  (E.g. the proceeds will be used to fund a holiday which I am willing to give up.)</MenuItem>
              </Select>
            </FormControl>
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
