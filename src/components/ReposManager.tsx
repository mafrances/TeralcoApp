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
                /*this.setState({
                    error: false,
                    isLoaded: true,
                    items: result.items
                });*/
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
                    items: result.items
                });
            }).catch(function (error) {
                console.log(error);
            });
    }

    handleLoginClick() {
        this.props.onLogin();
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}
export default ReposManager;