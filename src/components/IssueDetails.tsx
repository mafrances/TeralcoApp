import React from "react";
import ReactDOM from "react-dom";

class IssueDetails extends React.Component<any, any>{
    constructor(props: any) {
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
            }).then((result: any) => {
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
            <div>
                <div>
                    {this.props.item.title} - {this.props.item.body}
                </div>
                {comments}
                <div>
                    <button onClick={this.onItemClosed.bind(this)}>Close</button>
                </div>
            </div>
            
        );
    }

    createListElement(item: any) {
        return (
            <div key={item.id} id={item.id}>
                {item.body} - {item.user.login} - {item.created_at}
            </div>
        );
    }

    onItemClosed() {
        this.props.onItemClosed();
    }
}
export default IssueDetails;