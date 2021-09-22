import React from "react";
import Login from "../components/Login"
import IssueDetails from "../components/IssueDetails"
import ReposManager from "../components/ReposManager"

class GitHubContainer extends React.Component<{}, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoggedIn: false,
            item: null
        };
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }

    onSelectItem(item: any) {
        this.setState({ item: item });
    }

    onItemClosed() {
        this.setState({ item: null });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (!isLoggedIn) {
            button = <Login onLogin={this.handleLoginClick.bind(this)} />;
        } else {
            button = <ReposManager onSelectItem={this.onSelectItem.bind(this)}/>
        }
        if (this.state.item) {
            button = <IssueDetails item={this.state.item} onItemClosed={this.onItemClosed.bind(this)}/>
        }
        return (
            <div>
                {button}
            </div>
        );
    }
}
export default GitHubContainer;