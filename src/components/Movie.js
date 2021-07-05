import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'

class Movie extends Component {

    render() {

        return (
            <>
                {
                    this.props.movieData.map((item) => {
                        return (<Card style={{ width: '300px' }}>
                            <h3>Movies :</h3>
                            <img variant="top" width={250} src={item.image_url} alt={item.title} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.overview} </Card.Text>
                                <Card.Text>Average Votes: {item.average_votes}</Card.Text>
                                <Card.Text>  Total Votes:{item.total_votes} </Card.Text>
                                <Card.Text>  Popularity: {item.popularity} </Card.Text>
                                <Card.Text>  Released On: {item.released_on} </Card.Text>
                                <br /> <br />
                            </Card.Body>
                        </Card>)
                    }
                    )
                }
            </>
        )
    }
}

export default Movie;