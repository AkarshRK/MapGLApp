// ES6
import ReactMapboxGl, { Layer, Feature, Source, GeoJSONLayer } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

import Aux from "../hoc/_Aux";
//import './City.scss';
import { map, get } from '../common-libraries'
import classNames from "classnames";
import axios from 'axios'


const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiYWthcnNoa2hhdGFnYWxsaSIsImEiOiJja2w0bDc4bmcxY2FmMzBvNDRwM2hxa24xIn0.D9WWt3t-fYVOXSYpCCLLTg'
});


const data = {
    'type': 'geojson',
    'data': {
        'type': 'FeatureCollection',
        'features': [
            {
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
}

const layout_data = {
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


class City extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: "100%",
            height: 900,
            latitude: 0,
            longitude: 0,
            zoom: 2
        };
    }

    componentDidMount() {


    }

    _onViewportChange = viewport => this.setState({ ...viewport, transitionDuration: 3000 })




    render() {


        return (
            <div className="pcoded-wrapper">
                <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                        <Aux>
                            <Row>
                                <Col>

                                    <Table responsive="xl">
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
                                            <tr>
                                                <td>2</td>
                                                <td>Table cell</td>
                                                <td>Table cell</td>
                                                <td>Table cell</td>
                                                <td>Table cell</td>
                                                <td>Table cell</td>
                                                <td>Table cell</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
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
                                <Col>
                                    <Map

                                        style='mapbox://styles/mapbox/light-v10'
                                        center={[-96, 37.8]}
                                        zoom={[3]}
                                        container='map'
                                        containerStyle={{
                                            height: '100vh',
                                            width: '100vw'
                                        }}
                                    >
                                        <Layer
                                            type="symbol"
                                            id="marker"
                                            layout={layout_data} geoJSONSourceOptions={data}
                                            source={"points"}
                                            images={['https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png']}>
                                            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} type={'Point'}
                                                properties={{
                                                    'title': 'Mapbox DC'
                                                }} />
                                        </Layer>
                                    </Map>;
                    </Col>

                            </Row>

                        </Aux >
                    </div>
                </div>
            </div >
        );
    }
}

export default City;