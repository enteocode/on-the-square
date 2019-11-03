import React, { useState, useEffect, useRef } from 'react';
import Information from './Information';
import { toLngLatLike } from '../../lib/transformer';
import mapbox, { Map as Mapbox, Marker, LngLatLike, Layer } from 'mapbox-gl';
import style from './style.scss';

/**
 * @global
 */
mapbox.accessToken = process.env.MAPBOX_TOKEN;

// Definitions

export interface Props {
    location: LocationCoordinates,
    orientation: Orientation,
    venues: Venue[],
    onLoaded: Function
}

/**
 * @private
 */
const LAYER_EXTRUSION: Layer = {
    'id' : '3d-buildings',
    'source' : 'composite',
    'source-layer' : 'building',
    'minzoom' : 15,
    'filter' : [
        '==',
        'extrude',
        'true'
    ],
    'type': 'fill-extrusion',
    'paint': {
        'fill-extrusion-color': '#fff',
        'fill-extrusion-height': 9,
        'fill-extrusion-base': 0,
        'fill-extrusion-opacity': 0.15
    }
};

// Helpers

/**
 * @private
 */
const getSymbolLayer = (map: Mapbox) => {
    return map.getStyle().layers.find(({ type, layout }): boolean => type === 'symbol' && layout['text-field']);
};

/**
 * @private
 */
const createElement = (className: string = style.marker, html: string = ''): HTMLDivElement => {
    return Object.assign(document.createElement('div'), { className, innerHTML : html });
};

/**
 * @private
 */
const createElementForVenue = ({ name, type }: Venue): HTMLElement => {
    return createElement(style.venue, [
        `<div>${name}</div>`,
        `<div class="${style.type}">${type}</div>`
    ].join(''));
};

/**
 * @private
 */
const createMap = (container: HTMLElement, center: LngLatLike): Mapbox => {
    return new Mapbox({
        antialias : true,
        center,
        container,
        style : 'mapbox://styles/mapbox/dark-v9?optimize=true',
        minZoom : 15,
        maxZoom : 16,
        zoom : 15,
        bearing : 0,
        pitch : 60,
        keyboard : false,
        boxZoom : false,
        doubleClickZoom : false,
        scrollZoom : false,
        dragPan : false,
        dragRotate : false,
        localIdeographFontFamily : 'Roboto'
    });
};

/**
 * @private
 */
const createMarker = (position: LngLatLike, element: HTMLElement): Marker => {
    const marker = new Marker(element);

    marker.setLngLat(position);

    return marker;
};

/**
 * @public
 */
const Map: React.FunctionComponent<Props> = ({ location, venues, orientation, onLoaded }) => {
    const [ markers, setMarkers ]= useState<Marker[]>([]);
    const [ map, setMap ] = useState<Mapbox>();
    const [ you, setYouMarker ] = useState<Marker>();
    const [ rendered, setRendered ] = useState<boolean>(false);

    const container = useRef<HTMLDivElement>();

    // Handle orientation change

    useEffect(() => {
        map && orientation && map.setBearing(360 - orientation.alpha).setPitch(orientation.beta);
    }, [
        orientation,
        map
    ]);

    // Handle map center

    useEffect(() => {
        if (! map || ! you) {
            return;
        }
        const center = toLngLatLike(location);

        you.setLngLat(center);
        map.setCenter(center);
    }, [
        location,
        map,
        you
    ]);

    // Handle venue change (trigger Marker redraw)

    useEffect(() => {
        venues && setRendered(false);
    }, [
        venues
    ]);

    // Handle Markers

    useEffect(() => {
        if (! map || ! venues || rendered) {
            return;
        }
        setRendered(true);

        markers.forEach((marker: Marker) => {
            marker.remove();
        });
        setMarkers(venues.map((venue: Venue): Marker => {
            return createMarker(venue, createElementForVenue(venue)).addTo(map);
        }));
    }, [
        venues,
        map,
        markers,
        rendered
    ]);

    // Handle Mapbox

    useEffect(() => {
        if (map || ! container || ! location) {
            return;
        }
        const coordinates = toLngLatLike(location);
        const mapbox = createMap(container.current, coordinates);
        const marker = createMarker(coordinates, createElement(style.marker)).addTo(mapbox);

        mapbox.on('load', () => {
            mapbox.addLayer(LAYER_EXTRUSION, getSymbolLayer(mapbox).id);
            onLoaded && onLoaded();
        });
        mapbox.touchZoomRotate.disableRotation();

        setMap(mapbox);
        setYouMarker(marker);

    }, [
        container,
        map,
        location,
        onLoaded
    ]);

    useEffect(() => {
        return () => {
            map && map.remove();
        };
    }, [
        map
    ]);

    return (
        <section className={ style.container } role="presentation">
            <div ref={ container } className={ style.map }/>
            <Information/>
        </section>
    );
};

export default Map;
