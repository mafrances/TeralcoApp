import React from "react";
import Login from "../components/Login"
import ReposManager from "../components/ReposManager"

class GitHubContainer extends React.Component<{}, any>  {
    constructor(props: any) {
        super(props);
        this.state = { isLoggedIn: false };
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (!isLoggedIn) {
            button = <Login onLogin={this.handleLoginClick.bind(this)} />;
        } else {
            button = <ReposManager />
        }
        return (
            <div>
                {button}
            </div>
        );
    }
}
export default GitHubContainer;