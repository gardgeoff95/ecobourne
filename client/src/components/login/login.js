import React from 'react';
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

import './login.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: false,
            btnText: 'Sign in',
            signup: "Don't have an account yet? Sign up.",
            email: '',
            emailValid: true,
            emailError: '',
            pass: '',
            passValid: true,
            passError: '',
            submitted: false
        };
    }

    emailChange = (event) => {
        const invalid = this.validateEmail(event.target.value);
        this.setState({
            email: event.target.value,
            emailValid: !this.state.submitted || !invalid,
            emailError: invalid || ''
        });
    }

    validateEmail = (email) => {
        if (email) {
            if (/[a-z]+@[a-z]+\.[a-z]+/.test(email)) {
                return null;
            } else {
                return "Invalid email";
            }
        } else {
            return "Email required";
        }
    }

    passChange = (event) => {
        const invalid = this.validatePass(event.target.value);
        this.setState({
            pass: event.target.value,
            passValid: !this.state.submitted || !invalid,
            passError: invalid || ''
        });
    }

    validatePass = (pass) => {
        if (pass) {
            if (pass.length < 6) {
                return 'At least 6 characters required';
            } else {
                return null;
            }
        } else {
            return 'Password required';
        }
    }

    signUp = (event) => {
        const login = this.state.isLogin;
        event.preventDefault();
        this.setState({
            signup: login ? "Don't have an account yet? Sign up." : "Already have an account?",
            btnText: login ? "Sign in" : "Sign up",
            isLogin: !login
        });
    }

    password = (event) => {
        event.preventDefault();
    }

    submit = (event) => {
        const state = this.state;
        event.preventDefault();
        if (state.submitted && state.emailValid && state.passValid) {
            mobiscroll.toast({ message: (state.isLogin ? 'Login' : 'Signup') + ' success!' });
        } else {
            const emailInvalid = this.validateEmail(state.email);
            const passInvalid = this.validatePass(state.pass);
            this.setState({
                submitted: true,
                emailValid: !emailInvalid,
                emailError: emailInvalid || '',
                passValid: !passInvalid,
                passError: passInvalid || ''
            });
        }
    }

    render() {
        return (
            <mobiscroll.Form
                theme="ios"
                className="md-login-form"
                action="/login"
                method='POST'
                onSubmit={this.submit}
                novalidate
            >
                <div className="md-logo micons icon-mbsc-logo"></div>
                <mobiscroll.FormGroup inset>
                    <mobiscroll.Input type="email" name="Email" placeholder="Email" value={this.state.email} onChange={this.emailChange} valid={this.state.emailValid} errorMessage={this.state.emailError} />
                    <mobiscroll.Input type="password" name="Password" placeholder="Password" passwordToggle={true} icon="none" iconAlign="right" value={this.state.pass} onChange={this.passChange} valid={this.state.passValid} errorMessage={this.state.passError} />
                </mobiscroll.FormGroup>
                <mobiscroll.FormGroup inset className="mbsc-padding mbsc-align-center">
                    <a href="#" onClick={this.signUp}>{this.state.signup}</a>
                    <br /><br />
                    <a href="#" onClick={this.password}>Forgot password?</a>
                </mobiscroll.FormGroup>
                <mobiscroll.FormGroup inset className="mbsc-padding">
                    <mobiscroll.Button type="submit" block={true}>{this.state.btnText}</mobiscroll.Button>
                </mobiscroll.FormGroup>
            </mobiscroll.Form>
        );
    }
}
export default LoginForm;