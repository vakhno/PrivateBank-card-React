import React, { useState } from 'react';
import './Places.sass';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import * as Coordinates from '../machines.json';

function Map() {
    const [selectedMachine, setSelectedMachine] = useState(null);
    const workTime = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье', 'В праздники'];

    return (
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{ lat: 46.468835, lng: 30.740809 }}
        >
            {Coordinates.devices.map(machine => (
                <Marker
                    key={machine.id}
                    position={{
                        lat: +machine.latitude,
                        lng: +machine.longitude,
                    }}
                    onClick={() => {
                        setSelectedMachine(machine);
                    }}
                >
                    {selectedMachine && selectedMachine.id === machine.id && (
                        <InfoWindow
                            onCloseClick={() => {
                                setSelectedMachine(null);
                            }}
                        >
                            <div>
                                <h2 style={{ fontWeight: '600', fontSize: '14px' }} >{machine.fullAddressRu}</h2>
                                <div style={{ fontWeight: '600', fontSize: '12px', textAlign: 'center' }} >Время работы:</div>
                                <div className='machine__dates'>
                                    {Object.values(machine.tw).map((elem, index) => (
                                        <div>{workTime[index]}: {elem}</div>
                                    ))}
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            ))}
        </GoogleMap>
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

class Places extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'AIzaSyDHsBvb0Wq3AaQV-vYjxdeSM_16enhTrTk',
        }
    }

    // componentDidMount(prevProps) {

    // }

    render() {
        return (
            <div>
                <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${this.state.key}`}
                    loadingElement={<div style={{ height: '100%' }}></div>}
                    containerElement={<div style={{ height: '100%' }}></div>}
                    mapElement={<div style={{ height: '100%' }}></div>}
                />
            </div>
        );
    }
}

export default Places;
