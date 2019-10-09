import React from 'react';
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

class SignupForm extends React.Component {
    render() {
        return (
            <mobiscroll.Form
                theme="ios"
                className="md-create-account"
            >
                <div className="md-chart-pic"></div>

                <div className="md-cac-title mbsc-padding">
                    <h4>Great news, your traffic <br /> is already being tracked</h4>
                    <h4>Continue by creating a new account</h4>
                </div>
                <div className="md-cac-cont">
                    <mobiscroll.FormGroup inset>
                        <mobiscroll.Input name="username" placeholder="Name" />
                        <mobiscroll.Input name="email" type="email" placeholder="Email address" />
                        <mobiscroll.Input name="password" type="password" placeholder="Password" passwordToggle={true} />
                    </mobiscroll.FormGroup>
                    <mobiscroll.FormGroup inset className="md-cac-btn">
                        <mobiscroll.Button block={true}>Create account</mobiscroll.Button>
                        <mobiscroll.Button block={true} flat={true}>I'll do it later</mobiscroll.Button>
                    </mobiscroll.FormGroup>
                </div>
            </mobiscroll.Form>
        );
    }
}
export default SignupForm;