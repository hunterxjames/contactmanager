import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import Axios from "axios";

class EditContact extends Component {
    state = {
        name: "",
        email: "",
        phone: "",
        errors: {},
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        const res = await Axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );
        const contact = res.data;
        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            id: contact.id,
        });
    }

    onSubmit = async (dispatch, e) => {
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

        this.setState({
            name: "",
            email: "",
            phone: "",
            errors: {},
        });

        this.props.history.push("/");
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
                            <div className="card-header">Edit Contact</div>
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
                                        value="Update Contact"
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

export default EditContact;
