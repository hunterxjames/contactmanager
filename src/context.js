import React, { Component } from "react";
import Axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "DELETE_CONTACT":
            return {
                ...state,
                contacts: state.contacts.filter(
                    (contact) => contact.id !== action.payload
                ),
            };
        case "ADD_CONTACT":
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
            };
    }
};

// /Used for sharing states across components
export class Provider extends Component {
    state = {
        contacts: [],
        dispatch: (action) => {
            this.setState((state) => reducer(state, action));
        },
    };

    //synchronous
    componentDidMount() {
        Axios.get("https://jsonplaceholder.typicode.com/users").then((res) =>
            this.setState({ contacts: res.data })
        );
    }

    //asynchronous
    async componentDidMount() {
        const res = await Axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );

        this.setState({ contacts: res.data });
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
