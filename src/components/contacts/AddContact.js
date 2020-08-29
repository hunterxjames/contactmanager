import React, { Component } from "react";
import { Consumer } from "../../context";
import { v4 as uuidv4 } from "uuid";

class AddContact extends Component {
    state = {
        name: "",
        email: "",
        phone: "",
    };

    onSubmit = (dispatch, e) => {
        const { name, email, phone } = this.state;
        const contact = {
            id: uuidv4,
            name,
            email,
            phone,
        };
        e.preventDefault();
        console.log(this.contact);
        dispatch({ type: "ADD_CONTACT", payload: contact });
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { name, email, phone } = this.state;
        return (
            <Consumer>
                {(value) => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-3">
                            <div className="card-header">Add Header</div>
                            <div className="card-body">
                                <form
                                    onSubmit={this.onSubmit.bind(
                                        this,
                                        dispatch
                                    )}
                                >
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control form-control-lg"
                                            value={name}
                                            placeholder="Enter name..."
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            value={email}
                                            placeholder="Enter email..."
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            className="form-control form-control-lg"
                                            value="phone"
                                            placeholder="Enter phone..."
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        value="Add Contact"
                                        className="btn btn-light btn-block"
                                    />
                                </form>
                            </div>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

export default AddContact;
