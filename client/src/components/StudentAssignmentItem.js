import React, { Component } from "react";
import {
    Col,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Row
} from "reactstrap";
import Alert from "./Alert";
import { Link } from "react-router-dom";
import AddSolution from "./AddSolution";


class StudentAssignmentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solution: null,
            deadline: "",
            assignment: {},
            alert: false,
            alertText: null
        };
    }

    componentDidMount() {
        this.setState({
            assignment: this.props.assignment
        }, () => {
            fetch(`/api/solution/assignment/${this.state.assignment._id}/course/${this.props.course._id}/student/${this.props.session.user._id}`)
                .then(response => response.json())
                .then(result => {
                    if (result.solution)
                        this.setState({ solution: result.solution });
                    return result;
                })
                .catch(err => console.error(err));
        });
    }

    resetAlert = () => {
        this.setState({
            alert: false,
            alertText: null
        });
    };

    handleSubmit = event => {

        event.preventDefault();

        const packet = {
            method: "PUT",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                deadline: this.state.deadline,
                currentDeadline: this.state.assignment.deadline
            })
        };

        fetch(`/api/assignment/${this.state.assignment._id}`, packet)
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

        let alert = "";
        if (this.state.alert)
            alert = <Alert alertText={this.state.alertText} resetAlert={this.resetAlert}/>;

        let solution;
        if (this.state.solution != null) {
            solution = <React.Fragment>
                <ListGroupItemHeading>Solution</ListGroupItemHeading>
                <ListGroupItemText
                    className="text-muted mt-2 my-0">Submitted: {this.state.solution.submitDate}</ListGroupItemText>
                <ListGroupItemText className="text-muted mt-2 my-0">
                    <Link to={{ pathname: this.state.solution.attachment }} target="_blank">Download</Link>
                </ListGroupItemText>
            </React.Fragment>;
        }

        let course = <ListGroupItem key={this.state.assignment._id} className="text-left">
            <Row>
                <Col md={4}>
                    <ListGroupItemHeading>{this.state.assignment.name}</ListGroupItemHeading>
                    <ListGroupItemText
                        className="text-muted mt-2 my-0">Deadline: {this.state.assignment.deadline}</ListGroupItemText>
                    <ListGroupItemText className="text-muted mt-2 my-0">
                        <Link to={{ pathname: this.state.assignment.attachment }} target="_blank">Download</Link>
                    </ListGroupItemText>
                </Col>
                <Col md={4}>
                    {solution}
                </Col>
                <Col md={4}>
                    <AddSolution
                        key={this.state.assignment._id}
                        session={this.props.session}
                        course={this.props.course}
                        assignment={this.state.assignment}
                        reload={this.props.reload}
                    />
                </Col>
            </Row>
        </ListGroupItem>;


        return (
            <React.Fragment>
                {course}
                {alert}
            </React.Fragment>
        );
    }
}

export default StudentAssignmentItem;
