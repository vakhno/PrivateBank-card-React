import React from 'react';
import './Footer.sass';
import github from './github.svg'

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer__author title-roboto-16-700">Created by <span>Vakhno</span></div>
                <a href="http://gearmobile.github.io/css/compass-color-functions/" className='footer__github'>
                    <span className='footer__github-wrapper'>
                        <object className='footer__github-object' data={github} type="">arrows</object>
                    </span>
                </a>
            </footer>
        );
    }
}

export default Footer;