import React, { Component } from 'react'
import {Card,Col,Row} from 'react-bootstrap'

class Movie extends Component {

    render() {

        return (
            <>
                {
                    this.props.movieData.map((item) => {
                        
                        return (
                            <Row>
                            <Col xs={12} md={6} sm={9} xl={4} style={{ paddingTop: "10vh", paddingLeft: "10vh" }} >
                            <Card style={{ width: "80%", height: "100%" }} bg={'warning'}>
                                <Card.Img width={200}
                                    height={280} onClick={this.addVote0} variant="top" src={item.image_url} alt={item.title} />
                                <Card.Body>
                                    <Card.Title style={{ alignItems: 'center' }} >{item.title}</Card.Title>
                                    <Card.Text>
                                         {item.overview}
                                    </Card.Text>
                                </Card.Body>

                            </Card>
                            </Col>
                            </Row>)}
)
                }
            </>
        )
    }
}
{/* <Col xs={12} md={6} sm={9} xl={4} style={{ paddingTop: "10vh", paddingLeft: "10vh" }} >
                <Card style={{ width: "80%", height: "100%" }} bg={'warning'}>
                    <Card.Img width={200}
                        height={280} onClick={this.addVote0} variant="top" src={item.image_url} alt={item.title} />
                    <Card.Body>
                        <Card.Title style={{ alignItems: 'center' }} >{item.title}</Card.Title>
                        <Card.Text>
                             {item.overview}
                        </Card.Text>
                    </Card.Body>
                    
                        

                </Card> */}
export default Movie;