import React, {Component} from 'react';

class Login extends Component {
    state = {
        email: '',
        pw: ''
    }
    ehandleChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    phandleChange = (p) => {
        this.setState({
            pw: p.target.value
        })
    }
    bhandleClick = () => {
        if(this.state.pw === "iluvswpp"&&this.state.email ==="swpp@snu.ac.kr") {
            window.location+="articles"
        } else {
            alert("Email or password is wrong");
        }
    }
    render() {
        return (
            <div className = "Login">
                <h1>SWPP HW2</h1>
                Email <input id = "email-input" onChange = {this.ehandleChange}></input>
                <p/>
                PW <input id = "pw-input" onChange = {this.phandleChange} type="password"></input>
                <p/>
                <button id = "login-button" onClick = {this.bhandleClick}>login</button>
            </div>
        );
    }
}

export default Login