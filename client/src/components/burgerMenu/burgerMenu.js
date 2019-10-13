import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import { slide as Menu } from 'react-burger-menu'
import './burgerMenu.css';


class BurgerMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false
        }
    }

    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen })
    }

    closeMenu() {
        this.setState({ menuOpen: false })
    }

    toggleMenu() {
        this.setState(state => ({ menuOpen: !state.menuOpen }))
    }


    render() {
        return (
            <div>
                <Menu
                    width={'33%'}
                    right
                    isOpen={this.state.menuOpen}
                    onStateChange={(state) => this.handleStateChange(state)}
                >
                    <a onClick={this.props.goToHome} id="home" className="menu-item">Home</a>
                    <a onClick={this.props.goToLogin} id="about" className="menu-item">Login</a>
                    <a onClick={this.props.goToSignUp} id="contact" className="menu-item">Create</a>
                    {/* <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a> */}
                </Menu>
            </div>
        );
    }
}

export default BurgerMenu;