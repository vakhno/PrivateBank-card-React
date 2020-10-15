import React from 'react'
import './App.sass'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Main from './Main/Main'
import Calculator from './Calculator/Calculator'
import Places from './Places/Places'
import Currency from './Currency/Currency'
const apiCurrencyURL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currencyRate: {},
		}
	}

	componentDidMount() {
		this.getRate()
	}

	// Передаем в "Калькулятор" и "Курс" через props
	// ????????Делать get-запрос отдельно в каждом компоненте(без передачи через props)????????
	getRate = () => {
		fetch(`https://cors-anywhere.herokuapp.com/${apiCurrencyURL}`, {
			method: 'GET',
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Access-Control-Allow-Origin': '*',
			},
			mode: 'cors',
		})
			.then(data => {
				return data.json()
			})
			.then(data => {
				let allCurrency = {}
				for (let curr in data) {
					allCurrency[data[curr].ccy] = [+data[curr].buy, +data[curr].sale]
				}

				this.setState({
					currencyRate: allCurrency,
				})
			})
	}

	render() {
		return (
			<Router>
				<div className="card" >
					<Header />
					<Switch>
						<Route path='/' exact
							render={props => <Main />}
						/>
						<Route path='/places'
							render={props => <Places />}
						/>
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
		)
	}
}

export default App