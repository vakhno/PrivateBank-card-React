import React from 'react'
import './Footer.sass'
import github from './github.svg'

class Footer extends React.Component {
	render() {
		return (
			<footer className="footer">
				<div className="footer__author title-roboto-16-700">Created by <span>Vakhno</span></div>
				<a href="https://github.com/vakhno" className='footer__github link-default'>
					<object className='footer__github-object' data={github} type="">arrows</object>
				</a>
			</footer>
		)
	}
}

export default Footer