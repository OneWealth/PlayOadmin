import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./rightbar.css";
class RightBar extends Component {
    state = {};

    async  componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push({
                pathname: '/',
            });
        }

    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12 rightsec">
                    <Card bg="info" text="white" style={{ width: "18rem" }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Primary Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up
                                the bulk of the card's content.
              </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card bg="primary" text="white" style={{ width: "18rem" }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Primary Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up
                                the bulk of the card's content.
              </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default RightBar;
