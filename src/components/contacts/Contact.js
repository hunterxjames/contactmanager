import React, { Component } from "react";
import PropTypes from "prop-types";
// import css file
// import './Contact.css';
import { Consumer } from "../../context";
import { Link } from "react-router-dom";

import Axios from "axios";

class Contact extends Component {
    //state is a special variable to store component's state
    state = { showContactInfo: false };

    //propTypes is used for validation in React
    //This can also be added outside of the class below; as Contact.propTypes
    static propTypes = {
        // contact: PropTypes.object.isRequired,
        // deleteClickHandler: PropTypes.func.isRequired,
        // email: PropTypes.string.isRequired,
        // phone: PropTypes.string.isRequired,
    };

    //trick to workaround closure like this.showOnClick.bind(this)
    onShowClick = () => {
        //Use setState to change component state
        this.setState({ showContactInfo: !this.state.showContactInfo });
    };

    //synchronous
    // onDeleteClick = (id, dispatch) => {
    //     console.log("delete clicked");
    //     Axios.delete(
    //         `https://jsonplaceholder.typicode.com/users/${id}`
    //     ).then((res) => dispatch({ type: "DELETE_CONTACT", payload: id }));
    // };

    onDeleteClick = async (id, dispatch) => {
        console.log("delete clicked");
        const res = await Axios.delete(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        dispatch({ type: "DELETE_CONTACT", payload: id });
    };

    render() {
        //Desctructuring
        const { id, name, email, phone } = this.props.contact;
        const { showContactInfo } = this.state;

        return (
            <Consumer>
                {(value) => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-3">
                            <h4>
                                {name}{" "}
                                <i
                                    onClick={() =>
                                        this.setState({
                                            showContactInfo: !this.state
                                                .showContactInfo,
                                        })
                                    }
                                    className="fas fa-sort-down"
                                    style={{ cursor: "pointer" }}
                                ></i>
                                <i
                                    className="fas fa-times"
                                    style={{
                                        cursor: "pointer",
                                        float: "right",
                                        color: "red",
                                    }}
                                    onClick={this.onDeleteClick.bind(
                                        this,
                                        id,
                                        dispatch
                                    )}
                                ></i>
                                <Link to={`/contact/edit/${id}`}>
                                    <i
                                        className="fas fa-pencil-alt"
                                        style={{
                                            cursor: "pointer",
                                            float: "right",
                                            color: "black",
                                            marginRight: "1rem",
                                        }}
                                    ></i>
                                </Link>
                            </h4>
                            {showContactInfo ? (
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        Email: {email}
                                    </li>
                                    <li className="list-group-item">
                                        Phone: {phone}
                                    </li>
                                </ul>
                            ) : null}
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

Contact.propTypes = {
    // name: PropTypes.string.isRequired,
    // email: PropTypes.string.isRequired,
    // phone: PropTypes.string.isRequired,
};

export default Contact;
