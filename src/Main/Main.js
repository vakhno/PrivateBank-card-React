import React from 'react'
import './Main.sass'
import { Link } from 'react-router-dom'
import bankSvg from './museum.svg'
import loanSvg from './profit.svg'
import bankingSvg from './online-banking.svg'
import iphone from './iphone.png'
const cardItems = [{
	path: "/places",
	title: "Геоданные",
	subtitle: "Местоположения банкоматов",
	icon: bankSvg
}, {
	path: "/calculator",
	title: "Конвертер валюты",
	subtitle: "Конвертация валюты",
	icon: loanSvg
}, {
	path: "/currency",
	title: "Курс валюты",
	subtitle: "Курс гривны к валютам",
	icon: bankingSvg
}]

class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
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
						{cardItems.map(elem => {
							return <Link to={`${elem.path}`} className='main__feature link-default'>
								<div className='main__feature-info'>
									<div className='main__feature-losung title-roboto-20-600'>{`${elem.title}`}</div>
									<div className='main__feature-descr text-roboto-14-400'>{elem.subtitle}</div>
								</div>
								<object className='main__feature-icon' data={`${elem.icon}`}>bank</object>
							</Link>
						})}
					</div>
					<div className='main__bg-image' style={{ backgroundImage: `url(${iphone})` }}></div>
				</div>
			</div>
		)
	}
}

export default Main