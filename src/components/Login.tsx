import React from "react";
import ReactDOM from "react-dom";

class Login extends React.Component<any>{
    constructor(props: any) {
        super(props);
    }

    handleLoginClick() {
        this.props.onLogin();
    }

    render() {
        return (
            <div>
                User: 
                <input type="text" />
                Repository:
                <input type="text" />
                <button onClick={this.handleLoginClick.bind(this)}>Send</button>
            </div>
        );
    }
}
export default Login;