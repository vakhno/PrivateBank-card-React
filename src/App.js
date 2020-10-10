import React from 'react';
import './App.sass';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Main from './Main/Main';
import Calculator from './Calculator/Calculator';
import Places from './Places/Places';
import Currency from './Currency/Currency';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyRate: {},
    }
  }

  componentDidMount() {
    this.getRate();
  }

  getRate = () => {
    fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`, {
      method: 'GET',
      mode: 'cors',
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        let allCurrency = {};
        for (let curr in data) {
          allCurrency[data[curr].ccy] = [+data[curr].buy, +data[curr].sale];
        }

        this.setState({
          currencyRate: allCurrency,
        })
      });
  }

  render() {
    return (
      <Router>
        <div className="card" >
          <Header />
          <Switch>
            <Route
              path='/' exact
              render={props => <Main currencyRate={this.state.currencyRate} />}
            />
            <Route path='/places' component={Places} />
            <Route
              path='/currency'
              render={props => <Currency currencyRate={this.state.currencyRate} />}
            />
            <Route
              path='/calculator'
              render={props => <Calculator currencyRate={this.state.currencyRate} />}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;