import React, { useState, useEffect, useRef } from 'react';
import { toLngLatLike } from '../../lib/transformer';
import mapbox, { Map as Mapbox, Marker, LngLatLike, Layer } from 'mapbox-gl';
import style from './style.scss';

/**
 * @public
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
const createMarker = (className: string = style.marker, html: string = ''): HTMLDivElement => {
    return Object.assign(document.createElement('div'), { className, innerHTML : html });
};

/**
 * @private
 */
const createMarkerForVenue = ({ name, type }: Venue): HTMLElement => {
    return createMarker(style.venue, [
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
const addMarker = (position: LngLatLike, map: Mapbox, element: HTMLElement): Marker => {
    const marker = new Marker(element);

    marker.setLngLat(position);
    marker.addTo(map);

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
        setMarkers(venues.map((venue: Venue): Marker => addMarker(venue, map, createMarkerForVenue(venue))));
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
        const marker = addMarker(coordinates, mapbox, createMarker(style.marker));

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

            <footer className={ style.info }>
                <svg viewBox="0 0 503.84 503.84" className={ style.icon }>
                    <path d="M412.624 113.576c4.273-52.847-35.104-99.152-87.951-103.424-49.76-4.023-94.3 30.763-102.449 80.016a91.881 91.881 0 0 0-.736 11.792 95.887 95.887 0 0 0 38.224 76.416l-15.712 128-12.8-19.92c.192-2.4.448-4.8.448-7.2.344-48.6-38.775-88.277-87.375-88.621-44.956-.318-82.924 33.301-88.049 77.965a86.459 86.459 0 0 0-.656 10.704c.046 44.402 33.163 81.815 77.232 87.248a83.489 83.489 0 0 0 24-.368l53.536 83.056-3.2 26.016 31.76 3.904 4.624-37.52-85.008-131.872c-6.164-9.592-3.493-22.356 6-28.672 9.748-6.184 22.647-3.489 29.104 6.08l23.488 36.448c9.575 14.854 29.38 19.134 44.234 9.559A32.001 32.001 0 0 0 275.76 310.2l21.856-178.464c1.113-8.766 9.122-14.97 17.888-13.857a16 16 0 0 1 13.984 15.745 19.94 19.94 0 0 1-.112 2L316.24 242.728l42.08 18.48 12.8-29.296-20.304-8.928 4.032-32.96a95.312 95.312 0 0 0 57.776-76.448zM175.952 245.592c-29.205.001-52.88 23.676-52.879 52.881a52.881 52.881 0 0 0 8.479 28.719l4.896 7.6c-27.901-3.576-48.819-27.295-48.88-55.424.005-2.289.143-4.575.416-6.848 3.645-30.606 31.41-52.462 62.016-48.817a55.807 55.807 0 0 1 39.296 23.665 52.783 52.783 0 0 0-13.344-1.776zM319.36 85.864v.16c-26.222-3.308-50.161 15.268-53.469 41.491l-.035.285-1.232 10a63.68 63.68 0 0 1-11.2-35.856c.005-2.674.171-5.346.496-8 4.648-35.039 36.821-59.676 71.86-55.028 31.537 4.184 55.214 30.897 55.58 62.708a69.01 69.01 0 0 1-.496 8 63.347 63.347 0 0 1-20.992 40l1.264-10.32c3.2-26.287-15.493-50.2-41.776-53.44zM459.104 270.488l-12.864 29.296 22.944 10.08-11.552 94.064-55.44 57.68-4.544 37.04 31.744 3.904 3.264-26.464 55.44-57.68 15.744-128.272zM400.508 244.784l29.306 12.854-12.848 29.29-29.305-12.854zM187.312 60.6h-25.376l36.688-36.688L176 1.288l-36.688 36.688V12.6h-32v80h80zM59.312 188.6h32v-80h-80v32h25.376L0 177.288l22.624 22.624 36.688-36.688z"/>
                </svg>
                <small className={ style.text }>
                    { `The compass works on Earth's magnetic field, so strong electrical interferences around you may affect it's operation` }
                </small>
            </footer>

        </section>
    );
};

export default Map;
