import React from 'react';
import './Main.sass';
import bankSvg from './museum.svg';
import loanSvg from './profit.svg';
import bankingSvg from './online-banking.svg';
import iphone from './iphone.png';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date().toLocaleString().split(',')[0],
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            currencyRate: props.currencyRate,
        }
    }

    render() {
        return (
            <div className='main'>
                <div className='main__content'>
                    <div className='main__info'>
                        <div className='main__losung'>
                            <div className='main__title title-roboto-26-700'>ПриватБанк API</div>
                            <div className='main__subtitle text-roboto-12-600'>Публичные данные</div>
                        </div>
                        <div className='main__feature'>
                            <div className='main__feature-info'>
                                <div className='main__feature-losung title-roboto-20-600'>Геоданные</div>
                                <div className='main__feature-descr text-roboto-14-400'>Местоположения банкоматов</div>
                            </div>
                            <object className='main__feature-icon' data={bankSvg}>bank</object>
                        </div>

                        <div className='main__feature'>
                            <div className='main__feature-info'>
                                <div className='main__feature-losung title-roboto-20-600'>Конвертер валюты</div>
                                <div className='main__feature-descr text-roboto-14-400'>Конвертация валюты</div>
                            </div>
                            <object className='main__feature-icon' data={loanSvg}>loan</object>
                        </div>

                        <div className='main__feature'>
                            <div className='main__feature-info'>
                                <div className='main__feature-losung title-roboto-20-600'>Курс валюты</div>
                                <div className='main__feature-descr text-roboto-14-400'>Курс гривны к валютам</div>
                            </div>
                            <object className='main__feature-icon' data={bankingSvg}>banking</object>
                        </div>

                    </div>
                    <div className='main__bg-image' style={{ backgroundImage: `url(${iphone})` }}></div>
                </div>
            </div>
        );
    }
}

export default Main;
