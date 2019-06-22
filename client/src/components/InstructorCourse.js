import React, { Component } from "react";
import {
    Col, Row
} from "reactstrap";
import { Redirect } from "react-router-dom";
import Alert from "./Alert";
import AddAssignment from "./AddAssignment"

class InstructorCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: this.props.location.state.course,
            alert: false,
            alertText: null
        };
    }

    componentDidMount() {
        document.title = `UniHub | ${this.state.course.name}`;
    }

    resetAlert = () => {
        this.setState({
            alert: false,
            alertText: null
        });
    };

    render() {

        if (!this.props.session.isAuthenticated || this.props.session.type !== "instructor") return <Redirect to="/"/>;

        let alert = "";
        if (this.state.alert)
            alert = <Alert alertText={this.state.alertText} resetAlert={this.resetAlert}/>;

        return (
            <div className="container-fluid mx-0">
                <Row>
                    <Col md={12} className="container-fluid text-center">
                        <h1 className="mt-4 mb-2 text-success">{this.state.course.name}</h1>
                        <h4 className="text-muted">{this.state.course.code}</h4>
                        <p className="text-muted">No. of Students - {this.state.course.students.length}</p>
                        <hr/>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                    </Col>
                    <Col md={6}>
                        <AddAssignment course={this.state.course}/>
                    </Col>
                </Row>
                {alert}
            </div>
        );
    }
}

export default InstructorCourse;
