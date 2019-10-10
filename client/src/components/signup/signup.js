import React from 'react';
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

class SignupForm extends React.Component {
    render() {
        return (
            <mobiscroll.Form
                action='/'
                method='post'
                theme="ios"
                className="md-create-account"
            >
                <div className="md-chart-pic"></div>

                <div className="md-cac-title mbsc-padding">
                    <h4>Continue by creating a new account</h4>
                </div>
                <div className="md-cac-cont">
                    <mobiscroll.FormGroup inset>
                        <mobiscroll.Input name="username" placeholder="Name" />
                        <mobiscroll.Input name="login" type="text" placeholder="Login" />
                        <mobiscroll.Input name="password" type="password" placeholder="Password" passwordToggle={true} />
                        <mobiscroll.Input name="passwordConf" type="password" placeholder="confirmPassword" passwordToggle={true} />
                    </mobiscroll.FormGroup>
                    <mobiscroll.FormGroup inset className="md-cac-btn">
                        <mobiscroll.Button type='submit' block={true}>Create account</mobiscroll.Button>
                        <mobiscroll.Button block={true} flat={true}>I'll do it later</mobiscroll.Button>
                    </mobiscroll.FormGroup>
                </div>
            </mobiscroll.Form>
        );
    }
}
export default SignupForm;