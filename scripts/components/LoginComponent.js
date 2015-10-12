var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

module.exports = React.createClass({
    getInitialState: function() {
        return { error: null };
    },
    render: function() {
        var errorElement = null;
        if(this.state.error) {
            errorElement = (
                <p className="error-box">{this.state.error}</p>
            );
        }
        return (
            <div className="sign-in-page">
                <div className="register-box">
                    <form className="register-form" onSubmit={this.onRegister}>
                        <h1>Register</h1>
                        {errorElement}
                        <div className="email-input">
                            <input type="text" ref="email" className="validate" id="email" />
                            <label htmlFor="email">Email Address</label>
                        </div>
                        <div className="password-input">
                            <input type="password" ref="password" className="validate" id="password" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="button-container">
                            <button className="register-button">Register</button>
                        </div>
                    </form>
                </div>
                <div className="register-box">
                    <form className="login-form" onSubmit={this.onLogin}>
                        <h1>Login</h1>
                        {errorElement}
                        <div className="email-input">
                            <input type="text" ref="email" className="validate" id="email" />
                            <label htmlFor="email">Email Address</label>
                        </div>
                        <div className="password-input">
                            <input type="password" ref="password" className="validate" id="password" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="button-container">
                            <button className="register-button">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    },
    onRegister: function(e) {
        e.preventDefault();
        var user = new Parse.User();
        user.signUp(
            {
                username: this.refs.email.value,
                password: this.refs.password.value,
                email: this.refs.email.value
            },
            {
                success: (u) => {
                    this.props.router.navigate('write', {trigger: true});
                },
                error: (u, error) => {
                    this.setState({
                        error: error.message
                    });
                }
            }
        );
    },
    onLogin: function(e) {
        e.preventDefault();
        var user = new Parse.User();
        Parse.User.logIn(
            this.refs.email.value,
            this.refs.password.value,
            {
                success: (u) => {
                    this.props.router.navigate('write', {trigger: true});
                },
                error: (u, error) => {
                    this.setState({
                        error: error.message
                    });
                }
            }
        );
    }
});
