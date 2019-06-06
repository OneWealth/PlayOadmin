import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./revenue.css";
class Revenue extends Component {
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
                <div className="col-md-3">
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
                </div>

                <div className="col-md-3">
                    <Card bg="warning" text="white" style={{ width: "18rem" }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Secondary Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up
                                the bulk of the card's content.
              </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-3">
                    <Card bg="success" text="white" style={{ width: "18rem" }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Success Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up
                                the bulk of the card's content.
              </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-3">
                    <Card bg="danger" text="white" style={{ width: "18rem" }}>
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Danger Card Title</Card.Title>
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

export default Revenue;
