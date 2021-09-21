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
        fetch("https://api.example.com/items")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        error: false,
                        isLoaded: true,
                        items: result.items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: true
                    });
                }
            )
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