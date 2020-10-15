import React from 'react';
import arrows from './arrows.svg';
import './Calculator.sass';

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startValue: '',
			currentCurrency: '',
			finalValue: '',
		};
	}

	static getDerivedStateFromProps(props, state) {
		return {
			currencyRate: props.currencyRate
		}
	}

	calculateValue = (e) => {
		e.preventDefault();
		let saleOrBuy = (e.target.elements['buy-radio'].checked === true) ? 0 : 1;
		let value = e.target.elements['input-value'].value;
		let multiply = this.state.currencyRate[e.target.elements['select-currency'].value][saleOrBuy];
		let calcValue = Number(value * multiply).toFixed(2);

		this.setState({
			startValue: value,
			currentCurrency: multiply,
			finalValue: calcValue ? calcValue : 'Ошибка',
		})
	}

	render() {
		return (
			<div className="calculator">
				<form className="calculator__form" onSubmit={this.calculateValue}>
					<div className="calculator__btns-wrapper radio-btns title-roboto-16-700">
						<input type="radio" id="buy-radio" defaultChecked name="choose-method" />
						<label htmlFor="buy-radio">Покупка</label>
						<input type="radio" id="sale-radio" name="choose-method" />
						<label htmlFor="sale-radio">Продажа</label>
					</div>
					<select className='calculator__currency drop-list-default title-roboto-16-700' name="select-currency">
						{Object.keys(this.state.currencyRate).map((elem, index) => (
							<option key={elem} value={elem}>{elem}</option>
						))}
					</select>
					<input className='calculator__value-currency input__dark-light title-roboto-16-700' type="number" placeholder="Сумма" step='any' name='input-value' />
					<div className='calculator__default-currency title-roboto-16-700'>UAH</div>
					<button type='submit' className='calculator__convert button__default title-roboto-16-700'>Конвертация</button>
				</form>
				<div className='calculator__start-value title-roboto-18-700'>{this.state.startValue}</div>
				<object className='calculator__arrows' data={arrows} type="">arrows</object>
				<div className='calculator__final-value title-roboto-18-700'>{this.state.finalValue}</div>
			</div >
		);
	}
}


export default Calculator;
