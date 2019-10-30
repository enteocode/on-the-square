import * as React from 'react';
import Map from '../Map';
import Overlay from '../Overlay';
import { AnyAction } from 'redux'
import { connect } from 'react-redux';
import { setMessage } from '../../action/application';
import { setLocation } from '../../action/location';
import { setOrientation } from '../../action/orientation';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../reducer';

const { navigator : { geolocation } } = window;

// Definitions

export type Props = {
    dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
    error: boolean,
    location: LocationCoordinates,
    message: string,
    orientation: Orientation,
    venues: Venue[]
};

// Helpers

/**
 * @private
 * @see https://developers.google.com/web/fundamentals/native-hardware/device-orientation
 */
const getOrientationEventName = (): string => {
    if ('ondeviceorientationabsolute' in window) {
        return 'deviceorientationabsolute';
    }
    if ('ondeviceorientation' in window) {
        return 'deviceorientation';
    }
    return '';
};

/**
 * @public
 */
class AppContainer extends React.PureComponent<Props>
{
    componentDidMount() {
        const { dispatch } = this.props;
        const eventName = getOrientationEventName();

        dispatch(setMessage('Geolocation support is essential to run the application', true));

        if (geolocation) {
            dispatch(setMessage('Requesting location'));

            geolocation.watchPosition(this.handleLocationChange, this.handleLocationError);

            if (eventName) {
                window.addEventListener(eventName, this.handleOrientationChange, false);
            }
        }
        else {
            dispatch(setMessage('Geolocation is not supported by your device', true));
        }
    }

    handleOrientationChange = ({ alpha, beta, webkitCompassHeading }: DeviceOrientationEvent & { webkitCompassHeading: number }) => {
        const { dispatch } = this.props;

        if (alpha === null) {
            return;
        }
        requestAnimationFrame(() => {
            dispatch(setOrientation(webkitCompassHeading || alpha, beta));
        });
    };

    handleLocationChange = ({ coords : { latitude, longitude } }: Position) => {
        const { dispatch } = this.props;

        requestAnimationFrame(() => {
            dispatch(setLocation(latitude, longitude));
        });
    };

    handleLocationError = (e: PositionError) => {
        const { dispatch } = this.props;

        // If the user denied the permission request or no secure (HTTPS) connection
        // with the server

        if (e.code === e.PERMISSION_DENIED) {
            dispatch(setMessage('Geolocation is denied, change your settings and reload the page', true));
        }
    };

    onMapLoaded = () => {
        this.props.dispatch(setMessage(''));
    };

    render() {
        const { message, error, location, orientation, venues } = this.props;

        return (
            <React.Fragment>
                { location && <Map
                    location={ location }
                    venues={ venues }
                    orientation={ orientation }
                    onLoaded={ this.onMapLoaded }
                /> }
                <Overlay
                    message={ message }
                    error={ error }
                    isVisible={ ! (!! location && message === '') }
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ application : { message, error }, location, orientation, venues }) => ({
    message,
    error,
    location,
    orientation,
    venues
});

export default connect(mapStateToProps)(AppContainer);
