import React from 'react'
import logo from './logo.png'
import { Link } from 'react-router-dom'
import './Header.sass'
import Nav from '../Nav/Nav'

class Header extends React.Component {
	componentDidMount() {
		const burger = this.burgerMenu
		burger.addEventListener('click', (e) => {
			document.querySelector('.burger-menu').classList.toggle('active-menu')
			document.querySelector('.menu').classList.toggle('menu-open')
		})
	}

	render() {
		return (
			<header className='header'>
				<Link className='header__logo' to='/'>
					<img className='logo' src={logo} alt='' />
				</Link>
				<div className="burger-menu" ref={(ref) => this.burgerMenu = ref}>
					<span></span>
				</div>
				<Nav />
			</header>
		)
	}
}

export default Header