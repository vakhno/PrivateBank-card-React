import React from 'react';
import './Currency.sass';

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            currencyRate: props.currencyRate
        }
    }

    render() {
        return (
            <div className="main-values">
                {Object.keys(this.state.currencyRate).map((elem, index) => (
                    <div className="main-values__value title-roboto-26-700" key={elem}>
                        <div className="main-values__name">{elem}</div>
                        <div className="main-values__count-buy title-roboto-18-700">Породажа: <span>{this.state.currencyRate[elem][0].toFixed(2)}</span></div>
                        <div className="main-values__count-sale title-roboto-18-700">Покупка: <span>{this.state.currencyRate[elem][1].toFixed(2)}</span></div>
                    </div>
                ))
                }
            </div>
        );
    }
}

export default Contacts;
