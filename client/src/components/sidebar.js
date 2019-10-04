import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import App from '../App';

class Sidebar extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }

    render() {
        // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
            <Menu width={'200px'}>
                <a id="create" className="menu-item" href="/">Create</a>
                <a id="login" className="menu-item" href="/Login">Login</a>
            </Menu>
        );
    }
}


export default Sidebar;