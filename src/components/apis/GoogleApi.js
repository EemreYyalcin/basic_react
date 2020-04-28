import React from "react";
import {connect} from 'react-redux';
import {signState} from '../../actions'

class GoogleApi extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '107196056797-aceeuebaa02blos47cr1c4q63dj6t2ms.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                // this.onAuthChange(this.auth);
                this.onAuthObject(this.auth);
                // this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthObject = (auth) => {
        console.log(auth);
        console.log("click a " + auth);
        this.props.signState(auth);
    };

    // onAuthChange = (auth) => {
    //     console.log("click 0 " + auth);
    //     // if (auth) {
    //     //     this.props.signState(true, auth.currentUser);
    //     //     return;
    //     // }
    //     this.props.signState(auth);
    // };

    onSignInClick = () => {
        console.log("click 1");
        this.auth.signIn();
    };

    onSignOutClick = () => {
        console.log("click 2");
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.loginGoogle === null || this.props.loginGoogle.auth === undefined || this.props.loginGoogle.auth.isSignedIn === undefined) {
            return (<button className="p-link" onClick={this.onSignInClick}>
                <span className="layout-topbar-item-text">User</span>
                <span className="layout-topbar-icon pi pi-sign-in"/>
            </button>);
        }
        console.log("renderAuthButton " + "ss " + JSON.stringify(this.props.loginGoogle.auth.currentUser));
        console.log("renderAuthButton " + "ss " + JSON.stringify(this.props.loginGoogle.auth.isSignedIn));
        console.log("renderAuthButton " + "ss " + JSON.stringify(this.props.loginGoogle.auth.isSignedIn.ie));
        if (this.props.loginGoogle.auth.isSignedIn.ie) {
            return (<button className="p-link" onClick={this.onSignOutClick}>
                <span className="layout-topbar-item-text">User</span>
                <span className="layout-topbar-icon pi pi-sign-out"/>
            </button>);
        }
        return (<button className="p-link" onClick={this.onSignInClick}>
            <span className="layout-topbar-item-text">User</span>
            <span className="layout-topbar-icon pi pi-sign-in"/>
        </button>);
    }

    render() {
        return this.renderAuthButton();
    }
}

const mapStateToProps = (state) => {
    return {loginGoogle: state.loginGoogle}
};

export default connect(
    mapStateToProps,
    {signState}
)(GoogleApi);