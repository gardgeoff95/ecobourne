import React from 'react';
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { withRouter } from 'react-router-dom';
import './login.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: false,
            btnText: 'Sign in',
            signup: "Don't have an account yet? Sign up.",
            email: '',
            emailValid: false,
            emailError: '',
            pass: '',
            passValid: false,
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
            if (pass.length < 1) {
                return 'At least 1 character required';
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
        event.preventDefault();
        console.log('click')
        this.setState({ page: "TitleScreen" });
        const state = this.state;
        console.log("Email",this.state.email);
        console.log("Pass",this.state.pass);
   
        if (state.submitted && state.emailValid && state.passValid) {
            mobiscroll.toast({ message: (state.isLogin ? 'Login' : 'Signup') + ' success!' });
            console.log("everything was valid")
        } else {
            console.log("everything was salad")
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
            action='/'
            method='post'
            theme="ios"
            className="md-login-form"
        >
            <div className="md-chart-pic"></div>

            <div className="md-cac-title mbsc-padding">
                <h4>Log Into Your Account</h4>
            </div>
            <div className="md-cac-cont">
                <mobiscroll.FormGroup inset>
                    <mobiscroll.Input name="logEmail" type="email" placeholder="Email" />
                    <mobiscroll.Input name="pword" type="password" placeholder="Password" passwordToggle={true} />
                </mobiscroll.FormGroup>
                <mobiscroll.FormGroup inset className="md-cac-btn">
                    <mobiscroll.Button type='submit' block={true}>Log In</mobiscroll.Button>
                </mobiscroll.FormGroup>
            </div>
        </mobiscroll.Form>
        );
    }
}
export default withRouter(LoginForm);