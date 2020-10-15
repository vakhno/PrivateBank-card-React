import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.sass'
const navLinks = [{
	link: '/',
	title: 'Главная',
}, {
	link: '/calculator',
	title: 'Калькулятор',
}, {
	link: '/places',
	title: 'Банкоматы',
}, {
	link: '/currency',
	title: 'Курс',
}]

class Nav extends React.Component {
	componentDidMount() {
		const items = this.menuItems
		items.addEventListener('click', (e) => {
			document.querySelector('.burger-menu').classList.remove('active-menu')
			document.querySelector('.menu').classList.remove('menu-open')
		})
	}

	render() {
		return (
			<nav className="menu">
				<ul className="menu__items" ref={(ref) => this.menuItems = ref}>
					{
						navLinks.map(elem => {
							return <li className="menu__item">
								<Link className='menu__item-link' to={elem.link}>
									{elem.title}
								</Link>
							</li>
						})
					}
				</ul >
			</nav >
		)
	}
}

export default Nav