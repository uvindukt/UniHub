import React, { Component } from "react";
import { Link } from "react-router-dom";

class InstructorAssignments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            assignments: []
        };
    }

    componentDidMount() {
        fetch(`/api/assignment/course/${this.props.course._id}`)
            .then(response => response.json())
            .then(result => {
                result
                    ? this.setState({ assignments: result.assignments })
                    : this.setState({ assignments: [] });
            })
            .catch(err => console.log(err));
    }

    render() {

        return <React.Fragment>
            {
                this.state.assignments.map(assignment => {
                    return <Link to={{ pathname: assignment.attachment }} key={assignment._id}>{assignment.name}</Link>;
                })
            }
        </React.Fragment>;

    }

}

export default InstructorAssignments;