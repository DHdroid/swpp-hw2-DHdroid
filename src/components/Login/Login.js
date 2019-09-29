import React, {Component} from 'react';

class Login extends Component {
    render() {
        return (
            <div className = "Login">
                Email <input id = "email-input"></input>
                <p/>
                PW <input id = "pw-input"></input>
                <p/>
                <button id = "login-button">login</button>
            </div>
        );
    }
}

export default Login