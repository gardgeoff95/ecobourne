import React, { Component } from "react";
import LoginForm from '../../components/login/login';

import mobiscroll from "@mobiscroll/react";
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

class Login extends Component {
    render() {
        return (
            <div className="container-fluid">
                <LoginForm />
            </div>
        );
    }
}

export default Login;
