import React from "react";
import { IIssueItem }  from "./ReposManager";

interface IIssueDetailsProps {
    onItemClosed(): void;
    item: IIssueItem;
}

interface IIssueDetailsState {
    comments: IComment[];
}

interface IComment {
    id: string;
    body: string;
    user: IUser;
    created_at: string;
}

interface IUser {
    login: string;
}

class IssueDetails extends React.Component<IIssueDetailsProps, IIssueDetailsState>{
    constructor(props: IIssueDetailsProps) {
        super(props);
        this.state = {
            comments: []
        };
    }

    componentDidMount() {
        this.getIssueComments();
    }

    getIssueComments() {
        fetch(this.props.item.comments_url)
            .then((response: any) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }).then((result: IComment[]) => {
                this.setState({
                    comments: result
                });
            }).catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let comments = [];
        for (let item of this.state.comments) {
            comments.push(this.createListElement(item));
        }
        return (
            <div className="container max-w-screen-lg mx-auto">
                <h2 className="font-semibold text-xl text-gray-600">Issue/Pull Request Details</h2>
                <p className="text-gray-500 mb-6">Close to get back to the list</p>
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-600">{this.props.item.title}</h2>
                        {this.props.item.body}
                    </div>
                    {comments}
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={this.onItemClosed.bind(this)}>Close</button>
                    </div>
                </div>
            </div>
        );
    }

    createListElement(item: IComment) {
        return (
            <div key={item.id} id={item.id} className="bg-gray-100 rounded shadow-lg p-4 mb-6 flex">
                <div className="pr-4 flex-grow">{item.body}</div>
                <div className="pr-4">{item.user.login}</div>
                <div className="pr-4">{item.created_at}</div>
            </div>
        );
    }

    onItemClosed() {
        this.props.onItemClosed();
    }
}
export default IssueDetails;