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
			cashMachines: {},
			terminals: {},
			cities: [],
		}
	}

	componentDidMount() {
		this.getRate();

		this.getCashMachines();
		this.getSelfServiceTerminals();
	}

	getRate = () => {
		fetch(`https://cors-anywhere.herokuapp.com/https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`, {
			method: 'GET',
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors',
		})
			.then(data => {
				return data.json();
			})
			.then(data => {
				console.log(data)
				let allCurrency = {};
				for (let curr in data) {
					allCurrency[data[curr].ccy] = [+data[curr].buy, +data[curr].sale];
				}

				this.setState({
					currencyRate: allCurrency,
				})
				console.log(this.state.currencyRate)
			});
	}

	getCashMachines = (city) => {
		fetch(`https://cors-anywhere.herokuapp.com/https://api.privatbank.ua/p24api/infrastructure?json&atm&address=&city=${city}`, {
			method: 'GET',
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors',
		})
			.then(data => {
				return data.json();
			})
			.then(data => {
				return data;
			});
	}

	getCashMachines = (city) => {
		fetch(`https://cors-anywhere.herokuapp.com/https://api.privatbank.ua/p24api/infrastructure?json&tso&address=&city=${city}`, {
			method: 'GET',
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors',
		})
			.then(data => {
				return data.json();
			})
			.then(data => {
				return data;
			});
	}

	getSelfServiceTerminals = (e) => {
		fetch(`https://cors-anywhere.herokuapp.com/https://api.privatbank.ua/p24api/infrastructure?json&atm&address=&city=`, {
			method: 'GET',
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors',
		})
			.then(data => {
				return data.json();
			})
			.then(data => {
				let allCities = new Set();

				data.devices.forEach((elem, index) => {
					allCities.add(elem.cityRU)
				});

				allCities = Array.from(allCities).sort((a, b) => {
					const firstCity = a.trim();
					const secondCity = b.trim();

					if (firstCity < secondCity) {
						return -1;
					}
					if (firstCity > secondCity) {
						return 1;
					}
					return 0;
				})
				this.setState({
					cities: allCities,
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