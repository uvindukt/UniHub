import React, { Component } from "react";
import {
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
} from "reactstrap";
import Alert from "./Alert";
import { Link } from "react-router-dom";


class AssignmentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {},
            solution: this.props.solution,
            alert: false,
            alertText: null
        };
    }

    componentDidMount() {
        fetch(`/api/student/${this.state.solution.student}`)
            .then(response => response.json())
            .then(result => this.setState({student: result.student}))
            .catch(err => console.log(err))
    }

    resetAlert = () => {
        this.setState({
            alert: false,
            alertText: null
        });
    };

    render() {

        let alert = "";
        if (this.state.alert)
            alert = <Alert alertText={this.state.alertText} resetAlert={this.resetAlert}/>;

        let marks;
        if (!this.state.solution.marks) {
            marks = <React.Fragment>
                <ListGroupItemText
                    className="text-muted mt-2 my-0">Not graded yet.</ListGroupItemText>
            </React.Fragment>;
        } else {
            marks = <React.Fragment>
                <ListGroupItemText
                    className="text-muted mt-2 my-0">Marks: {this.state.solution.marks}</ListGroupItemText>
            </React.Fragment>;
        }

        let solution;
        solution = <React.Fragment>
            <ListGroupItem className="text-left">
                <ListGroupItemHeading>{this.state.student.name}</ListGroupItemHeading>
                <ListGroupItemText
                    className="text-muted mt-2 my-0">{this.state.student.email}</ListGroupItemText>
                <hr/>
                <ListGroupItemText
                    className="text-muted mt-2 my-0">Submitted: {this.state.solution.submitDate}</ListGroupItemText>
                {marks}
                <ListGroupItemText className="text-muted mt-2 my-0">
                    <Link to={{ pathname: this.state.solution.attachment }} target="_blank">Download</Link>
                </ListGroupItemText>
            </ListGroupItem>
        </React.Fragment>;


        return (
            <React.Fragment>
                {solution}
                {alert}
            </React.Fragment>
        );
    }
}

export default AssignmentItem;
