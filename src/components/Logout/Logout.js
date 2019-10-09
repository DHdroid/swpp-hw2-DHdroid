import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/action/index'
const mapStateToProps = state => {
    return {
        iflogin:state.lr.login
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionCreators.logout())
    }
}
class Logout extends Component {
    logouthandleClick = () => {
        this.props.onLogout();
        window.location.assign('/login');
    }
    render() {
        return (
            <div className = "Logout">
                <button id = 'logout-button' onClick={this.logouthandleClick}>log out</button>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Logout)