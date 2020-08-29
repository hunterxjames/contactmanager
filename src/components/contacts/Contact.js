import React, { Component } from "react";
import PropTypes from "prop-types";
// import css file
// import './Contact.css';
import { Consumer } from "../../context";
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
        const { contact } = this.props;
        const { showContactInfo } = this.state;

        return (
            <Consumer>
                {(value) => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-3">
                            <h4>
                                {contact.name}{" "}
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
                                        contact.id,
                                        dispatch
                                    )}
                                ></i>
                            </h4>
                            {showContactInfo ? (
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        Email: {contact.email}
                                    </li>
                                    <li className="list-group-item">
                                        Phone: {contact.phone}
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
