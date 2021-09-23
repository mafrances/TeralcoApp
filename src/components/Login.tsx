import React from "react";

interface ILoginProps {
    onLogin(user: string, repository: string): void;
}

class Login extends React.Component<ILoginProps>{
    constructor(props: ILoginProps) {
        super(props);
    }

    handleLoginClick() {
        let user: string = (document.getElementsByClassName("user")[0] as HTMLInputElement).value;
        let repository: string = (document.getElementsByClassName("repository")[0] as HTMLInputElement).value;
        this.props.onLogin(user, repository);
    }

    render() {
        return (
            <div className="container max-w-screen-lg mx-auto">
                <h2 className="font-semibold text-xl text-gray-600">Login Form</h2>
                <p className="text-gray-500 mb-6">Introduce the user and the repository to connect</p>
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    User: <input className="user h-10 border mt-1 rounded px-4 w-full bg-gray-50" type="text" />
                    Repository: <input className="repository h-10 border mt-1 rounded px-4 w-full bg-gray-50" type="text" />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  mt-2" onClick={this.handleLoginClick.bind(this)}>Send</button>
                </div>
            </div>
        );
    }
}
export default Login;