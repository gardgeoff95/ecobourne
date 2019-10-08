import React from 'react';
import mobiscroll from "@mobiscroll/react";
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

import './burgerMenu.css';

class BurgerMenu extends React.Component {
    render() {
        return (
            <div>
                <mobiscroll.FormGroup>
                    <div className="md-hamb mbsc-padding">
                        <mobiscroll.HamburgerNav
                            theme="ios"
                            type="hamburger"
                        >
                            <mobiscroll.NavItem icon="user4">Create</mobiscroll.NavItem>
                            {/* <mobiscroll.NavItem icon="arrow-right2">Login</mobiscroll.NavItem> */}
                        </mobiscroll.HamburgerNav>
                    </div>
                </mobiscroll.FormGroup>
            </div>
        );
    }
}

export default BurgerMenu;