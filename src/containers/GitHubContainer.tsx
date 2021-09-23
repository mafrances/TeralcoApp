import React from "react";
import Login from "../components/Login"
import IssueDetails from "../components/IssueDetails"
import ReposManager from "../components/ReposManager"
import { IIssueItem } from "../components/ReposManager";

interface IReposManagerState {
    isLoggedIn: boolean;
    item?: IIssueItem;
    repository?: IRepository;
}

export interface IRepository {
    user: string;
    repository: string;
}

class GitHubContainer extends React.Component<{}, IReposManagerState>  {
    constructor(props: {}) {
        super(props);
        this.state = {
            isLoggedIn: false,
            item: undefined,
            repository: undefined
        };
    }

    handleLoginClick(user: string, repository: string) {
        this.setState({
            isLoggedIn: true,
            repository: {
                user,
                repository
            }
        });
    }

    onSelectItem(item: IIssueItem) {
        this.setState({ item: item });
    }

    onItemClosed() {
        this.setState({
            item: undefined,
            isLoggedIn: true
        });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (!isLoggedIn) {
            button = <Login onLogin={this.handleLoginClick.bind(this)} />;
        } else {
            if (this.state.repository) {
                button = <ReposManager onSelectItem={this.onSelectItem.bind(this)} repository={this.state.repository} />
            }
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