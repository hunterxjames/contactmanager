import React, { Component } from "react";

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
        contacts: [
            {
                id: 1,
                name: "Fred Domingo",
                email: "fredrikjames@gmail.com",
                phone: "96473300",
            },
            {
                id: 2,
                name: "Alex Domingo",
                email: "alex.fredrik@gmail.com",
                phone: "81614425",
            },
            {
                id: 3,
                name: "Albus Domingo",
                email: "superalbus@gmail.com",
                phone: "94806702",
            },
        ],
        dispatch: (action) => {
            this.setState((state) => reducer(state, action));
        },
    };

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
