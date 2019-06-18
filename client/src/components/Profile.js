import React, { Component } from "react";
import {
    Col,
    Button,
    Table
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faKey,
    faPhone,
    faUser,
    faEdit,
    faUserEdit
} from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";
import ProfilePrompt from "./ProfilePrompt";
import { read_cookie } from "sfcookies";
import {
    promptName,
    promptEmail,
    promptTelephone,
    promptPassword
} from "../resources/ProfilePrompts";

class Profile extends Component {
    constructor(props) {
        super(props);
        if (this.props.session.user) {
            const { name, email, telephone, _id } = this.props.session.user;
            this.state = {
                prompt: false,
                promptText: null,
                URI: `/api/student/${_id}`,
                type: this.props.session.type,
                token: this.props.session.token,
                name,
                email,
                telephone
            };
        }
    }

    componentDidMount() {
        document.title = "UniHub | Profile";
    }

    resetPrompt = () => {
        const cookie = read_cookie("session");
        this.setState({
            id: cookie.user._id,
            name: cookie.user.name,
            email: cookie.user.email,
            telephone: cookie.user.telephone,
            token: cookie.token,
            type: cookie.type,
            prompt: false,
            promptText: null
        });
    };

    renderPrompt = content => {
        this.setState({
            prompt: true,
            promptText: content
        });
    };

    render() {
        if (!this.props.session.isAuthenticated) return <Redirect to="/"/>;

        let { name, email, telephone } = this.state;

        let prompt = "";
        if (this.state.prompt)
            prompt = <ProfilePrompt promptText={this.state.promptText} type={this.state.type} login={this.props.login}
                                    URI={this.state.URI} token={this.state.token}
                                    resetPrompt={this.resetPrompt}/>;

        let tel = "";
        if (this.props.session.type !== 'admin')
            tel = <tr>
                <td><FontAwesomeIcon icon={faPhone}/>&emsp;Telephone</td>
                <td>{`0${telephone}`}</td>
                <td><Button onClick={() => this.renderPrompt(promptTelephone)}
                            className="button m-0 py-1"><FontAwesomeIcon icon={faEdit}/></Button></td>
            </tr>;

        return (
            <div className="container-fluid row mx-0 text-center">
                <Col md={2}/>
                <Col md={8}>
                    <h1 className="mt-4 mb-4 text-success"><FontAwesomeIcon icon={faUserEdit}/>&ensp;Profile</h1>
                    <hr className="mb-4"/>
                    <Table responsive className="text-left profileTable">
                        <tbody>
                        <tr>
                            <td><FontAwesomeIcon icon={faUser}/>&emsp;Name
                            </td>
                            <td>{name}</td>
                            <td><Button
                                onClick={() => this.renderPrompt(promptName)}
                                className="button m-0 py-1"><FontAwesomeIcon
                                icon={faEdit}/></Button></td>
                        </tr>
                        <tr>
                            <td><FontAwesomeIcon icon={faEnvelope}/>&emsp;E-Mail</td>
                            <td>{email}</td>
                            <td><Button onClick={() => this.renderPrompt(promptEmail)}
                                        className="button m-0 py-1"><FontAwesomeIcon icon={faEdit}/></Button></td>
                        </tr>
                        {tel}
                        <tr>
                            <td><FontAwesomeIcon icon={faKey}/>&emsp;Password
                            </td>
                            <td>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</td>
                            <td><Button
                                onClick={() => this.renderPrompt(promptPassword)}
                                className="button m-0 py-1"><FontAwesomeIcon icon={faEdit}/></Button></td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col md={2}/>
                {prompt}
            </div>
        );
    }
}

export default Profile;
