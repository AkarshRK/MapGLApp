import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Row, Col, Card, Table } from 'react-bootstrap';

import Aux from "../hoc/_Aux";
import './CityMap.scss';
import { map, get } from '../common-libraries'
import classNames from "classnames";
import axios from 'axios'

mapboxgl.accessToken = 'pk.eyJ1IjoiYWthcnNoa2hhdGFnYWxsaSIsImEiOiJja2w0bDc4bmcxY2FmMzBvNDRwM2hxa24xIn0.D9WWt3t-fYVOXSYpCCLLTg';


export default class Map extends React.Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-96, 37.8],
            zoom: 1
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
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [{
                                // feature for Mapbox DC
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [
                                        -77.03238901390978,
                                        38.913188059745586
                                    ]
                                },
                                'properties': {
                                    'title': 'Mapbox DC'
                                }
                            },
                            {
                                // feature for Mapbox SF
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [-122.414, 37.776]
                                },
                                'properties': {
                                    'title': 'Mapbox SF'
                                }
                            }
                            ]
                        }
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

        return (
            <Aux>
                <Row>
                    <Col>
                        <Table responsive hover className="text-center" bordered size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Table heading</th>
                                    <th>Table heading</th>
                                    <th>Table heading</th>
                                    <th>Table heading</th>
                                    <th>Table heading</th>
                                    <th>Table eading</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                </tr>
                            </tbody>
                        </Table>


                    </Col>

                </Row>
                <Row>
                <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Input</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div  style={{ height: '300px', width: '100%' }} >Hi</div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Map</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div ref={el => this.mapContainer = el} style={{ height: '300px', width: '100%' }} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


            </Aux >);
    }
}