import React, { PureComponent } from 'react';
import Map from 'component/Map';
import Overlay from 'component/Overlay';
import { connect } from 'react-redux';
import { setMessage } from 'action/application';
import { setLocation } from 'action/location';
import { setOrientation } from 'action/orientation';

import type { Component } from 'react';
import type { Dispatch } from 'redux';
import type { LatLngObject, OrientationObject, VenuesObject } from 'lib/defs';

const { navigator : { geolocation }, DeviceOrientationEvent } = global;

// Definitions

export type Props = {
    dispatch: Dispatch,
    error: boolean,
    location: LatLngObject,
    message: string,
    orientation: OrientationObject,
    venues: VenuesObject[]
};

// Helpers

/**
 * Returns the event name for orientation-listener
 *
 * @private
 * @return {string}
 */
const getOrientationEvent = (): string => {
    const name = 'deviceorientation';

    // Instead of relative orientation, we can use the Earth's magnetic field
    // for heading calculation in some devices

    if (global.ondeviceorientationabsolute) {
        return name.concat('absolute');
    }
    return name;
};

/**
 * AppContainer
 *
 * Container to handle business-logic.
 *
 * @public
 */
class AppContainer extends PureComponent<Props>
{
    componentDidMount() {
        const { dispatch } = this.props;

        if (! (geolocation && DeviceOrientationEvent)) {
            dispatch(setMessage('Try with mobile device', true));
        }
        else {
            dispatch(setMessage('Requesting location based on GPS coordinates'));

            // Setting up listener for the changes of device-orientation

            global.addEventListener(getOrientationEvent(), this.handleOrientationChange);

            // Setting up watcher for the GPS coordinates to achieve continuous
            // updates on location

            geolocation.watchPosition(this.handleLocationChange, this.handleLocationError, {
                enableHighAccuracy: true
            });
        }
    }

    handleOrientationChange = ({ alpha, beta, webkitCompassHeading }: DeviceOrientationEvent) => {
        if (alpha === null) {
            return;
        }
        this.props.dispatch(setOrientation(
            webkitCompassHeading || alpha,
            beta
        ));
    };

    handleLocationChange = ({ coords : { latitude, longitude } }: Position) => {
        this.props.dispatch(setLocation(
            latitude,
            longitude
        ));
    };

    handleLocationError = (e: PositionError) => {
        const { dispatch } = this.props;

        // If the user denied the permission request or there is no secure (HTTPS) connection with the server

        if (e.code === e.PERMISSION_DENIED) {
            dispatch(setMessage('Location is unavailable, make it work and reload the page', true));
        }

        // Internal device errors

        else if (e.code === e.POSITION_UNAVAILABLE) {
            dispatch(setMessage('Position is unavailable', true));
        }
    };

    onMapLoaded = () => {
        this.props.dispatch(setMessage(''));
    };

    render(): Component[] {
        const { message, error, location, orientation, venues } = this.props;

        return [
            location && <Map
                key={0}
                location={location}
                venues={venues}
                orientation={orientation}
                onLoaded={this.onMapLoaded}
            />,
            <Overlay
                key={1}
                message={message}
                error={error}
                isVisible={! (!! location && message === '')}
            />
        ];
    }
}

const mapStateToProps = ({ application : { message, error }, location, orientation, venues }: Props): Props => ({
    message,
    error,
    location,
    orientation,
    venues
});

export default connect(mapStateToProps)(AppContainer);
