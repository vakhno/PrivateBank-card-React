import React from 'react'
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';

class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			key: 'AIzaSyDHsBvb0Wq3AaQV-vYjxdeSM_16enhTrTk',
			workTime: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье', 'В праздники'],
			mapCenter: {
				lat: 48.125835,
				lng: 31.740809
			},
			defaultZoom: 4,
			selectedMarker: null,
		}
	}

	static getDerivedStateFromProps(props, state) {
		return {
			data: props.dataForMarkers
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.dataForMarkers !== prevProps.dataForMarkers) {
			this.getMarkers()
		}
	}

	getMarkers = () => {
		if (this.state.data) {
			return this.state.data.map((machine, index) => (
				<Marker
					key={index}
					position={{
						lat: +machine.longitude,
						lng: +machine.latitude,
					}}
					onClick={() => {
						this.setState({
							selectedMarker: machine
						})
					}}
				>
					{this.state.selectedMarker && this.state.selectedMarker.latitude === machine.latitude && (
						<InfoWindow
							onCloseClick={() => {
								this.setState({
									selectedMarker: null
								})
							}}
						>
							<div>
								<h2 style={{ fontWeight: '600', fontSize: '14px' }} >{machine.fullAddressRu}</h2>
								<div style={{ fontWeight: '600', fontSize: '12px', textAlign: 'center' }} >Время работы:</div>
								<div className='machine__dates'>
									{Object.values(machine.tw).map((elem, index) => (
										<div>{this.state.workTime[index]}: {elem}</div>
									))}
								</div>
							</div>
						</InfoWindow>
					)}
				</Marker>
			))
		}
	}

	render() {
		return (
			<GoogleMap
				defaultZoom={this.state.defaultZoom}
				defaultCenter={this.state.mapCenter}
			>
				{this.getMarkers()}
			</GoogleMap>
		);
	}
}

export default Map
