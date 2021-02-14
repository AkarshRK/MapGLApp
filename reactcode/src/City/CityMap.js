import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import Aux from "../hoc/_Aux";
import axios from 'axios'

mapboxgl.accessToken = 'pk.eyJ1IjoiYWthcnNoa2hhdGFnYWxsaSIsImEiOiJja2w0bDc4bmcxY2FmMzBvNDRwM2hxa24xIn0.D9WWt3t-fYVOXSYpCCLLTg';


export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            geojson: { "type": "FeatureCollection", 
                       "features": []
                     },
            searchId: ''
        }
    }

    handleSearch = () => {
        const search_url = 'http://localhost:8000/searchCities/?city_id=' + 'BOM'
        axios.get(search_url)
            .then(resp => {
                console.log('Response', resp.data.data)
                const data = resp.data.data;

                this.setState({
                    geojson: data
                }, () => {
                    this.loadMarkers()
                })

            }).catch(err => {
                console.log('Error', err)
            });
    }

    loadMarkers = () => {
        console.log('loadedmarkers', this.state.geojson)
        this.map.getSource('points').setData(this.state.geojson);
    }



    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [77.412615, 23.259933],
            zoom: 4
        });

        this.map.on('load', () => {
            this.map.loadImage(
                'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                (error, image) => {
                    if (error) throw error;
                    this.map.addImage('custom-marker', image);
                    // Add a GeoJSON source with 2 points
                    this.map.addSource('points', {
                        'type': 'geojson',
                        'data': this.state.geojson
                    });

                    // Add a symbol layer
                    this.map.addLayer({
                        'id': 'points',
                        'type': 'symbol',
                        'source': 'points',
                        'layout': {
                            'icon-image': 'custom-marker',
                            // get the title name from the source's "title" property
                            'text-field': ['get', 'title'],
                            'text-font': [
                                'Open Sans Semibold',
                                'Arial Unicode MS Bold'
                            ],
                            'text-offset': [0, 1.25],
                            'text-anchor': 'top'
                        }
                    });
                }
            );

        });
    }

    componentWillUnmount() {
        this.map.remove();
    }

    render() {
        const style = {
            position: 'absolute',
            top: 500,
            bottom: 0,
            width: '100%',
            height: '300px'
        };
        const { searchId } = this.state;

        return (

            <Aux>
                <Row>
                    <Col >
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">City Search</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formBasicInput">
                                        <Form.Label>City ID (Example: BOM, IXD,...)</Form.Label>
                                        <Form.Control type="email" placeholder="Enter City ID" value={searchId} onChange={e => this.setState({ searchId: e.target.value })} />
                                        <Form.Text className="text-muted">
                                            Please enter the city ID above to search.
                                        </Form.Text>
                                    </Form.Group>
                                    <Button variant="primary" onClick={this.handleSearch} >
                                        Search
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Map</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div ref={el => this.mapContainer = el} style={{ height: '900px', width: '100%' }} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


            </Aux >);
    }
}