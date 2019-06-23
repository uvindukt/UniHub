import React, { Component } from "react";
import {
    Col, ListGroup, Spinner
} from "reactstrap";
import { Redirect } from "react-router-dom";
import Alert from "./Alert";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import ListGroupItemText from "reactstrap/es/ListGroupItemText";
import Button from "reactstrap/es/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Row from "reactstrap/es/Row";

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            alert: false,
            alertText: null
        };
    }

    componentDidMount() {
        document.title = "UniHub | Notifications";
        fetch(`/api/notification/${this.props.session.user._id}`)
            .then(response => response.json())
            .then(result => {
                result.notifications.length > 0
                    ? this.setState({ notifications: result.notifications })
                    : this.setState({ notifications: null });
            })
            .catch(err => console.log(err));
    }

    handleClick = notificationId => {
        fetch(`/api/notification/${notificationId}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        }).then(() => {

            fetch(`/api/notification/${this.props.session.user._id}`)
                .then(response => response.json())
                .then(result => {
                    result.notifications.length > 0
                        ? this.setState({ notifications: result.notifications })
                        : this.setState({ notifications: null });
                })
                .catch(err => console.log(err));

        }).catch(err => console.error(err));
    };

    resetAlert = () => {
        this.setState({
            alert: false,
            alertText: null
        });
    };

    render() {

        if (!this.props.session.isAuthenticated) return <Redirect to="/"/>;

        let alert = "";
        if (this.state.alert)
            alert = <Alert alertText={this.state.alertText} resetAlert={this.resetAlert}/>;

        let notifications;

        if (this.state.notifications === null) {

            notifications = <div className="mt-4 text-success">
                <span style={{ fontSize: "2rem" }}>No Notifications</span>
            </div>;

        } else if (this.state.notifications.length > 0) {

            notifications = this.state.notifications.map(notification => {
                return <React.Fragment key={notification._id}>
                    <ListGroupItem>
                        <Row>
                            <Col md={10}>
                                <ListGroupItemText className="text-muted text-left">
                                    {notification.message}
                                </ListGroupItemText>
                            </Col>
                            <Col md={2}>
                                <form>
                                    <Button className="mt-2 button" onClick={() => this.handleClick(notification._id)}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                        &ensp;Delete
                                    </Button>
                                </form>
                            </Col>
                        </Row>
                    </ListGroupItem>
                </React.Fragment>;
            });

        } else {

            notifications = <div className="mt-4 text-success">
                <span style={{ fontSize: "2rem" }}>Loading</span>&emsp;
                <Spinner size="lg"/>
            </div>;

        }

        return (
            <div className="container-fluid row mx-0">
                <Col md={12} className="container-fluid text-center">
                    <h1 className="mt-4 mb-4 text-success">Notifications</h1>
                    <hr/>
                    <ListGroup>
                        {notifications}
                    </ListGroup>
                </Col>
                {alert}
            </div>
        );
    }
}

export default Notifications;
