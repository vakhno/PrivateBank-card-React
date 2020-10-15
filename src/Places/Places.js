import React, { useState } from 'react';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import * as Cities from '../cities.json';
import Map from '../Map/Map.js';
import './Places.sass';
const WrappedMap = withScriptjs(withGoogleMap(Map));

class Places extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			key: 'AIzaSyDHsBvb0Wq3AaQV-vYjxdeSM_16enhTrTk',
			city: '',
			machineType: '',
			data: [],
		}
	}

	getPlacesOfMachines = () => {
		const urlMachine = (this.state.machineType === 'selfTerminal') ? 'json&tso' : 'json&atm';
		fetch(`https://cors-anywhere.herokuapp.com/https://api.privatbank.ua/p24api/infrastructure?${urlMachine}&address=&city=${this.state.city}`, {
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
				this.setState({
					data: data
				})
				return data;
			});
	}

	getCityMachinesInfo = (e) => {
		e.preventDefault();
		let userMachineType = (e.target.elements['self-terminal'].checked === true) ? 'selfTerminal' : 'cashMachine';
		let userCity = e.target.elements['city-input'].value;
		if (Object.values(Cities.default).includes(userCity)) {
			this.setState({
				city: userCity,
				machineType: userMachineType,
			}, () => {
				this.getPlacesOfMachines()
			})
		} else {
		}
	}

	render() {
		return (
			<div className="machines">
				<form className="machines__form" action="" onSubmit={this.getCityMachinesInfo}>
					<input className='machines__city-input input__dark-light title-roboto-16-700' list="city-selector" id='city-input' name="select-city" placeholder="Введите город..." />
					<datalist id="city-selector" className="drop-list-default">
						{Object.values(Cities.default).map((elem, index) => (
							<option key={index} value={elem} />
						))}
					</datalist>
					<div className="machines__btns-wrapper radio-btns title-roboto-16-700">
						<input type="radio" id="self-terminal" defaultChecked name="choose-machine" />
						<label htmlFor="self-terminal">Терминал</label>
						<input type="radio" id="cash-machines" name="choose-machine" />
						<label htmlFor="cash-machines">Банкомат</label>
					</div>
					<button type='submit' className='machines__finder button__default title-roboto-16-700'>Найти</button>
				</form>
				<WrappedMap
					googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${this.state.key}`}
					loadingElement={<div style={{ height: '100%' }}></div>}
					containerElement={<div style={{ height: '100%' }}></div>}
					mapElement={<div style={{ height: '100%' }}></div>}
					dataForMarkers={this.state.data.devices}
				/>
			</div>
		);
	}
}

export default Places;
