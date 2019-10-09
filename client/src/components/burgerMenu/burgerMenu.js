import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import mobiscroll from "@mobiscroll/react";
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import './burgerMenu.css';

// setup the React Router with Mobiscroll
mobiscroll.setupReactRouter(Route, withRouter);

class BurgerMenu extends React.Component {
    render() {
        return (
            <div>
                <mobiscroll.FormGroup>
                    <div className="md-hamb mbsc-padding">
                        <mobiscroll.HamburgerNav theme="ios" type="hamburger">
                            <mobiscroll.NavItem
                                to="/"
                                type="submit"
                                value="Go to Title Screen"
                                onClick={this.props.titleScreen}
                                icon="home">Home</mobiscroll.NavItem>
                            <mobiscroll.NavItem
                                to="signup"
                                icon="user4">Create</mobiscroll.NavItem>
                            <mobiscroll.NavItem
                                to="login"
                                icon="arrow-right2">Login</mobiscroll.NavItem>
                        </mobiscroll.HamburgerNav>
                    </div>
                </mobiscroll.FormGroup>
            </div>
        );
    }
}

export default BurgerMenu;