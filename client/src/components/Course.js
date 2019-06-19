import React, { Component } from "react";
import {
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
    FormGroup,
    FormText
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHashtag,
    faBook,
    faUserTie,
    faFolderPlus
} from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";
import Alert from "./Alert";


class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            code: "",
            instructor: "",
            instructors: [],
            alert: false,
            alertText: null
        };
    }

    componentDidMount() {
        document.title = "UniHub | Course";
        fetch("/api/instructor")
            .then(response => response.json())
            .then(instructors =>
                this.setState({ instructors },
                    () =>
                        this.setState({ instructor: instructors[0]._id })
                )
            )
            .catch(err => console.log(err));
    }

    resetAlert = () => {
        this.setState({
            alert: false,
            alertText: null
        });
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {

        event.preventDefault();

        const packet = {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                code: this.state.code,
                instructor: this.state.instructor
            })
        };

        fetch("/api/course", packet)
            .then(result => result.json())
            .then(data => {
                data.success
                    ? this.setState({ alert: true, alertText: data.success })
                    : this.setState({ alert: true, alertText: data.msg });
                return data;
            })
            .catch(err => console.error(err));
    };

    render() {

        if (!this.props.session.isAuthenticated || this.props.session.type !== "admin") return <Redirect to="/"/>;

        let alert = "";
        if (this.state.alert)
            alert = <Alert alertText={this.state.alertText} resetAlert={this.resetAlert}/>;

        return (
            <div className="container-fluid row mx-0">
                <Col md={6} className="container-fluid text-center">

                </Col>
                <Col md={6} className="container-fluid text-center">
                    <h1 className="mt-4 mb-4 text-success">Add New Course</h1>
                    <hr/>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mr-0">
                            <div className="row container-fluid mr-0 pr-0">
                                <Col md={12} className="mb-4">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="adTextBox">
                                                <FontAwesomeIcon icon={faBook}/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            autoComplete="off"
                                            required
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                            className="textBox"
                                            type="text"
                                            name="name"
                                            placeholder="Course Name"
                                        />
                                    </InputGroup>
                                </Col>
                            </div>
                            <div className="row container-fluid mr-0 pr-0">
                                <Col md={12} className="mb-0">
                                    <FormGroup className="text-left">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="adTextBox">
                                                    <FontAwesomeIcon icon={faHashtag}/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                autoComplete="off"
                                                required
                                                value={this.state.code}
                                                onChange={this.handleChange}
                                                className="textBox"
                                                type="text"
                                                name="code"
                                                placeholder="Code"
                                            />
                                        </InputGroup>
                                        <FormText className="ml-3">Course code should be unique.</FormText>
                                    </FormGroup>
                                </Col>
                            </div>
                            <div className="row container-fluid mr-0 pr-0">
                                <Col md={12} className="mb-0">
                                    <FormGroup className="text-left">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="adTextBox">
                                                    <FontAwesomeIcon icon={faUserTie}/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                value={this.state.instructor}
                                                onChange={this.handleChange}
                                                className="select"
                                                type="select"
                                                name="instructor"
                                            >
                                                <option value="hello">Hello</option>
                                                <option value="asd">asdasd</option>
                                                <option value="dasds">sddsdbd</option>
                                            </Input>
                                        </InputGroup>
                                        <FormText className="ml-3">Please select an instructor.</FormText>
                                    </FormGroup>
                                </Col>
                            </div>
                            <div className="row container-fluid mr-0 pr-0">
                                <Col md={12} className="mb-4 text-center">
                                    <Button className="button">
                                        <FontAwesomeIcon icon={faFolderPlus}/>
                                        &ensp;Add Course
                                    </Button>
                                </Col>
                            </div>
                        </div>
                    </form>
                </Col>
                {alert}
            </div>
        );
    }
}

export default Course;
