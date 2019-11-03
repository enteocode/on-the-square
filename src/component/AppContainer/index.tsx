import React, { Fragment, useEffect, useCallback } from 'react';
import Map from '../Map';
import Overlay from '../Overlay';
import { AnyAction } from 'redux'
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../../action/application';
import { setLocation } from '../../action/location';
import { setOrientation } from '../../action/orientation';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../reducer';

const { navigator : { geolocation } } = window;

// Definitions

type OrientationEvent = DeviceOrientationEvent & { webkitCompassHeading: number };

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
const AppContainer: React.FunctionComponent<Props> = () => {
    const dispatch = useDispatch();
    const state = useSelector(({ application : { message, error }, location, orientation, venues }: RootState) => ({
        message,
        error,
        location,
        venues,
        orientation
    }));

    const handleMapLoadedEvent = useCallback(() => {
        dispatch(setMessage(''));
    }, [
        dispatch
    ]);

    const handleOrientationChange = useCallback(({ alpha, beta, webkitCompassHeading }: OrientationEvent) => {
        if (alpha === null) {
            return;
        }
        requestAnimationFrame(() => {
            dispatch(setOrientation(webkitCompassHeading || alpha, beta));
        });
    }, [
        dispatch
    ]);

    const handleLocationChange = useCallback(({ coords : { latitude, longitude } }: Position) => {
        requestAnimationFrame(() => {
            dispatch(setLocation(latitude, longitude));
        });
    }, [
        dispatch
    ]);

    const handleLocationError = useCallback((e: PositionError) => {
        if (e.code === e.PERMISSION_DENIED) {
            dispatch(setMessage('Geolocation is denied, change your settings and reload the page', true));
        }
    }, [
        dispatch
    ]);

    // Mount / Dismount

    useEffect(() => {
        const eventName = getOrientationEventName();

        if (geolocation) {
            dispatch(setMessage('Requesting location'));

            geolocation.watchPosition(
                handleLocationChange,
                handleLocationError
            );
            if (eventName) {
                window.addEventListener(eventName, handleOrientationChange, false);
            }
        }
        else {
            dispatch(setMessage('Geolocation is not supported by your device', true));
        }
        return () => {
            eventName && window.removeEventListener(eventName, handleOrientationChange);
        };
    }, [
        dispatch,
        handleOrientationChange,
        handleLocationError,
        handleLocationChange,
        handleMapLoadedEvent,
    ]);

    return (
        <Fragment key="map">
            <Map
                location={ state.location }
                venues={ state.venues }
                orientation={ state.orientation }
                onLoaded={ handleMapLoadedEvent }
            />
            <Overlay
                message={ state.message }
                error={ state.error }
                isVisible={ ! (!! location && state.message === '') }
            />
        </Fragment>
    );
};

export default AppContainer;
