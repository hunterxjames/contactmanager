import React, { Component } from "react";
import { Consumer } from "../../context";
import { v4 as uuidv4 } from "uuid";
import TextInputGroup from "../layout/TextInputGroup";

class AddContact extends Component {
    state = {
        name: "",
        email: "",
        phone: "",
        errors: {},
    };

    onSubmit = (dispatch, e) => {
        const { name, email, phone } = this.state;
        e.preventDefault();

        //Validation
        if (name === "") {
            this.setState({ errors: { name: "Name is required" } });
            return;
        }
        if (email === "") {
            this.setState({ errors: { email: "Email is required" } });
            return;
        }
        if (phone === "") {
            this.setState({ errors: { phone: "Phone is required" } });
            return;
        }
        const contact = {
            id: uuidv4,
            name,
            email,
            phone,
        };
        console.log(this.contact);
        dispatch({ type: "ADD_CONTACT", payload: contact });
        this.setState({
            name: "",
            email: "",
            phone: "",
            errors: {},
        });
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { name, email, phone, errors } = this.state;
        return (
            <Consumer>
                {(value) => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-3">
                            <div className="card-header">Add Contact</div>
                            <div className="card-body">
                                <form
                                    onSubmit={this.onSubmit.bind(
                                        this,
                                        dispatch
                                    )}
                                >
                                    <TextInputGroup
                                        label="Name"
                                        name="name"
                                        value={name}
                                        placeholder="Enter name..."
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />
                                    <TextInputGroup
                                        type="email"
                                        label="Email"
                                        name="email"
                                        value={email}
                                        placeholder="Enter email..."
                                        onChange={this.onChange}
                                        error={errors.email}
                                    />
                                    <TextInputGroup
                                        label="Phone"
                                        name="phone"
                                        className="form-control form-control-lg"
                                        value={phone}
                                        placeholder="Enter phone..."
                                        onChange={this.onChange}
                                        error={errors.phone}
                                    />
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
