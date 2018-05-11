import type { LatLngObject, VenueObject } from 'lib/defs';

/**
 * @type {Object} Foursquare API Access Tokens
 */
const AUTHENTICATION = { client_id : '5S11GGEZ2A5JZPISTD4CPMQN5CL0NYKNF0AHJUK4AAOLVV1L', client_secret: 'RFAWFOP4KERR3XESXVM3VI5K0UKR42TEP2XQW5IPTIZYJNK4' };

/**
 * @type {number} API version to request
 */
const API_VERSION = 20180503;

/**
 * @type {RegExp} Filter expression for Venue types
 */
const VENUE_TYPES = /[hm]otel|atm|bank|bar|beer|bistro|breakfast|brewery|café|club|distillery|food|hostel|house|joint|lounge|marijuana|market|night|place|pub|restaurant|shop|smoke|store|taxi/iu;

/**
 * @type {Object} Query extension for all Explore type requests
 */
const QUERY_EXPLORE = {
    section: 'topPicks',
    openNow: 1,
    sortByDistance: 1
};

/**
 * Builds a request query-string
 *
 * @private
 * @param {Object} query
 * @return {string}
 */
const buildRequestQuery = (query: Object): string => {
    const keys = Object.keys(query);
    const data = keys.reduce(
        (acc: string[], key: string): string[] => acc.concat(`${key}=${encodeURIComponent(query[key])}`),
        []
    );
    return data.join('&');
};

/**
 * Builds a Foursquare API requests
 *
 * @private
 * @param {string} id
 * @param {Object} query
 * @return {string}
 */
const buildRequest = (id: string, query: Object = {}): string => {
    return `https://api.foursquare.com/v2/venues/${id}?${buildRequestQuery(Object.assign({ v: API_VERSION },
        AUTHENTICATION, 
        query
    ))}`;
};

/**
 * Flattens items of complex groups
 *
 * @private
 * @param {Object[]} groups
 * @return {Object[]}
 */
const getItemsByGroups = ({ groups }: Object): Object[] => {
    return groups.reduce((accumulated: Object[], group: Object): Object[] => accumulated.concat(group.items), []);
};

/**
 * Extracts important venue data into a flat Object list
 *
 * @private
 * @param {Object} meta
 * @param {Object} response
 * @return {Object[]}
 */
const getVenuesByResponse = ({ meta, response }: Object): VenueObject[] => {
    if (meta.code !== 200) {
        throw new Error(meta.errorDetail, meta.code);
    }
    const items = getItemsByGroups(response).reduce((accumulated: Object[], { venue }: Object): Object[] => {
        return accumulated.concat([{
            guid : venue.id,
            lat  : venue.location.lat,
            lng  : venue.location.lng,
            name : venue.name,
            type : venue.categories[0].name
        }])
    },
        []
    );
    return items.filter((venue: Object): boolean => VENUE_TYPES.test(venue.type));
};

/**
 * Returns the list of open interesting places nearby
 *
 * @public
 * @param {number} lat
 * @param {number} lng
 * @return {Promise}
 */
export const getVenues = async ({ lat, lng }: LatLngObject): void => {
    const request: string = buildRequest('explore', Object.assign({ ll: [lat, lng].join(',') }, QUERY_EXPLORE));
    const response: Response = await fetch(request);

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return getVenuesByResponse(await response.json());
};
