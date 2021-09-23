import React from "react";
import { IRepository } from "../containers/GitHubContainer";

export interface IIssueItem {
    comments_url: string;
    body: string;
    title: string;
    labels: IIssueItemLabel[];
    pull_request: string;
    id: string;
    created_at: string;
    comments: number;
    user: IIssueItemUser;
}

interface IIssueItemUser {
    login: string;
}

export interface IIssueItemLabel {
    color: string;
    name: string;
}

interface IReposManagerProps {
    onSelectItem(item: IIssueItem): void;
    repository: IRepository;
}

interface IReposManagerState {
    items: IIssueItem[]
}

class ReposManager extends React.Component<IReposManagerProps, IReposManagerState>{
    constructor(props: IReposManagerProps) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.getRepo();        
    }

    getRepo() {
        fetch("https://api.github.com/repos/" + this.props.repository.user + "/" + this.props.repository.repository)
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
        fetch("https://api.github.com/repos/" + this.props.repository.user + "/" + this.props.repository.repository + "/issues")
            .then((response: any) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }).then((result: IIssueItem[]) => {
                this.setState({
                    items: result
                });
            }).catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let items = [];
        for (let item of this.state.items) {
            items.push(this.createListElement(item));
        }
        return (
            <div className="container max-w-screen-lg mx-auto">
                <h2 className="font-semibold text-xl text-gray-600">Issue/Pull Request List</h2>
                <p className="text-gray-500 mb-6">Select an element to see more details</p>
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    {items}
                </div>
            </div>
        );
    }

    createListElement(item: IIssueItem) {
        let type: string;
        let labels = [];
        for (let label of item.labels) {
            labels.push(
                <div className="rounded px-1 mr-2" style={{ backgroundColor: label.color }}>{ label.name }</div>
            );
        }
        if (item.pull_request) {
            type = "Pull Request";
        } else {
            type = "Issue";
        }
        return (
            <div key={item.id} id={item.id} onClick={this.openIssue.bind(this)} className="bg-gray-100 rounded shadow-lg p-4 mb-6 flex hover:bg-blue-100 cursor-pointer flex-wrap">
                <div className="pr-4"><span className="italic underline">{type}</span></div>
                <div className="pr-4"><span className="font-bold">title:</span> {item.title}</div>
                <div className="pr-4"><span className="font-bold">user:</span> {item.user.login}</div>
                <div className="pr-4"><span className="font-bold">creation time:</span> {item.created_at}</div>
                <div className="pr-4"><span className="font-bold">number of comments:</span> {item.comments}</div>
                <div className="flex">
                    <span className="font-bold">labels:</span> {labels}
                </div>
            </div>
        );
    }

    openIssue(ev: any) {
        let item: IIssueItem = this.state.items.find(function (arrayItem: IIssueItem) {
            return arrayItem.id == ev.currentTarget.id
        })!;
        this.props.onSelectItem(item);
    }
}
export default ReposManager;