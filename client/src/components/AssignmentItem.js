import React, { Component } from "react";
import {
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
} from "reactstrap";
import Alert from "./Alert";
import { Link } from "react-router-dom";


class AssignmentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solution: this.props.solution,
            alert: false,
            alertText: null
        };
    }

    componentDidMount() {

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

        let solution;
        if (this.state.solution != null) {
            solution = <React.Fragment>
                <ListGroupItem className="text-left">
                    <ListGroupItemHeading>Solution</ListGroupItemHeading>
                    <ListGroupItemText
                        className="text-muted mt-2 my-0">Submitted: {this.state.solution.submitDate}</ListGroupItemText>
                    <ListGroupItemText className="text-muted mt-2 my-0">
                        <Link to={{ pathname: this.state.solution.attachment }} target="_blank">Download</Link>
                    </ListGroupItemText>
                </ListGroupItem>
            </React.Fragment>;
        }


        return (
            <React.Fragment>
                {solution}
                {alert}
            </React.Fragment>
        );
    }
}

export default AssignmentItem;
