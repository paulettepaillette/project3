import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const Pointer = ({ text }) => <div className="pointer"
>{text}</div>;

class SimpleMap extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { contactData } = this.props

        return (
            <div className="map-wrapper">
                {contactData.map(oneData =>
                    <div className="map" key={oneData.id}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: process.env.google_map_api }}
                            defaultCenter={{ lat: Number(oneData.acf.map.lat), lng: Number(oneData.acf.map.lng) }}
                            defaultZoom={15}
                        >
                            <Pointer
                                lat={Number(oneData.acf.map.lat)}
                                lng={Number(oneData.acf.map.lng)}
                                text={'The Shop'}
                            />
                        </GoogleMapReact>
                    </div>
                )}
            </div>
        )
    }
}

export default SimpleMap;