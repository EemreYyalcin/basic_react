import React from "react";
import {connect} from 'react-redux';
import {signState} from '../../actions'

class GoogleApi extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: 'OAUTH_API_KEY',
                scope: 'email https://www.googleapis.com/auth/youtube.readonly'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                // this.onAuthChange(this.auth);
                this.onAuthObject(this.auth);
                // this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthObject = (auth) => {
        this.props.signState(auth);
    };


    onSignInClick = () => {
        this.auth.signIn();
        this.props.signState(this.auth);
    };

    onSignOutClick = () => {
        this.auth.signOut();
        this.props.signState(this.auth);
    };

    renderAuthButton() {
        if (this.props.loginGoogle === null || this.props.loginGoogle.auth === undefined || this.props.loginGoogle.auth.isSignedIn === undefined) {
            return (<button className="p-link" onClick={this.onSignInClick}>
                <span className="layout-topbar-item-text">User</span>
                <span className="layout-topbar-icon pi pi-sign-in"/>
            </button>);
        }
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