/**
 * @type {Object} Foursquare API Access Tokens
 */
const AUTHENTICATION: Object = {client_id : '5S11GGEZ2A5JZPISTD4CPMQN5CL0NYKNF0AHJUK4AAOLVV1L', client_secret: 'RFAWFOP4KERR3XESXVM3VI5K0UKR42TEP2XQW5IPTIZYJNK4' };

/**
 * @type {number} API version to request
 */
const API_VERSION: number = 20180503;

/**
 * @type {RegExp} Filter expression for Venue types
 */
const VENUE_TYPES: RegExp = /[hm]otel|atm|bank|bar|beer|bistro|breakfast|brewery|café|club|distillery|food|hostel|house|joint|lounge|marijuana|market|night|place|pub|restaurant|shop|smoke|store|taxi/iu;

/**
 * @type {Object} Query extension for all Explore type requests
 */
const QUERY_EXPLORE: Object = {
    section: 'topPicks',
    openNow: 1,
    sortByDistance: 1
};

/**
 * @private Builds a request query-string
 * @todo Use querystringify
 */
const buildQuery = (query: Object): string => {
    const keys = Object.keys(query);
    const data = keys.reduce((acc: string[], key: string): string[] => acc.concat(`${key}=${encodeURIComponent(query[key])}`),
        []
    );
    return data.join('&');
};

/**
 * @private Builds a Foursquare API requests
 */
const buildRequest = (id: string, query: Object = {}): string => {
    return `https://api.foursquare.com/v2/venues/${id}?${buildQuery({ v: API_VERSION, ... AUTHENTICATION, ... query })}`;
};

/**
 * @private Flattens items of complex groups
 */
const getItemsByGroups = ({ groups }) => {
    return groups.reduce((accumulated: Venue[], group: any) => accumulated.concat(group.items), []);
};

/**
 * @private Extracts important venue data into a flat Object list
 */
const getVenuesByResponse = ({ meta, response }): Venue[] => {
    if (meta.code !== 200) {
        throw new Error(meta.errorDetail);
    }
    const items = getItemsByGroups(response).reduce((accumulated: Venue[], { venue }) => {
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
    return items.filter((venue: Venue): boolean => VENUE_TYPES.test(venue.type));
};

/**
 * @public Returns the list of open interesting places nearby
 */
export const getVenues = async ({ lat, lng }: LocationCoordinates): Promise<Venue[]> => {
    const coordinates = [ lat, lng ].join(',');
    const request = buildRequest('explore', { ll : coordinates, ... QUERY_EXPLORE });
    const response = await fetch(request);

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return getVenuesByResponse(await response.json());
};
