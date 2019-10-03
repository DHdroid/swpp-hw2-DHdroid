import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/action/index'
const mapDispatchToProps = dispatch => {
    return {
        onLogin: () => dispatch(actionCreators.login())
    }
}
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
            this.props.onLogin();
            //window.location="/articles"
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

export default connect(null,mapDispatchToProps)(Login)