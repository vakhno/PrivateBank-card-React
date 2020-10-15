import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.sass';

class Nav extends React.Component {
	componentDidMount() {
		const items = this.menuItems;
		items.addEventListener('click', (e) => {
			document.querySelector('.burger-menu').classList.remove('active-menu');
			document.querySelector('.menu').classList.remove('menu-open');
		});
	}

	render() {
		return (
			<nav className="menu">
				<ul className="menu__items" ref={(ref) => this.menuItems = ref}>
					<li className="menu__item">
						<Link className='menu__item-link' to='/'>
							Главная
                    </Link>
					</li>
					<li className="menu__item">
						<Link className='menu__item-link' to='/calculator'>
							Калькулятор
                    </Link>
					</li>
					<li className="menu__item">
						<Link className='menu__item-link' to='/places'>
							Банкоматы
                    </Link>
					</li>
					<li className="menu__item">
						<Link className='menu__item-link' to='/currency'>
							Курс
                    </Link>
					</li>
				</ul >
			</nav >
		);
	}
}


export default Nav;
