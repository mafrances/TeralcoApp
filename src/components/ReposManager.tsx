import React from "react";
import ReactDOM from "react-dom";

class ReposManager extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        this.getRepo();        
    }

    getRepo() {
        fetch("https://api.github.com/repos/mafrances/TeralcoApp")
            .then((response: any) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }).then((result: any) => {
                this.getRepoIssues();
            }).catch(function (error) {
                console.log(error);
            });
    }

    getRepoIssues() {
        fetch("https://api.github.com/repos/mafrances/TeralcoApp/issues")
            .then((response: any) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }).then((result: any) => {
                this.setState({
                    error: false,
                    isLoaded: true,
                    items: result
                });
            }).catch(function (error) {
                console.log(error);
            });
    }

    handleLoginClick() {
        this.props.onLogin();
    }

    render() {
        let items = [];
        for (let item of this.state.items) {
            items.push(this.createListElement(item));
        }
        return (
            <div>
                {items}
            </div>
        );
    }

    createListElement(item: any) {
        let type: string;
        if (item.pull_request) {
            type = "Pull Request";
        } else {
            type = "Issue";
        }
        return (
            <div key={item.id} id={item.id} onClick={this.openIssue.bind(this)}>
                {item.title} - {item.user.login} - {item.created_at} - {item.comments} - {item.labels} - {type}
            </div>
        );
    }

    openIssue(ev: any) {
        let item = this.state.items.find(function (arrayItem: any) {
            return arrayItem.id == ev.currentTarget.id
        });
        this.props.onSelectItem(item);
    }
}
export default ReposManager;