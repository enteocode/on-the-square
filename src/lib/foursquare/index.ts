import { stringify } from 'querystringify';

/**
 * @type {RegExp} Filter expression for Venue types
 */
const VENUE_TYPES: RegExp = /[hm]otel|atm|bank|bar|beer|bistro|breakfast|brewery|café|club|distillery|food|hostel|house|joint|lounge|marijuana|market|night|place|pub|restaurant|shop|smoke|store|taxi/iu;

/**
 * @private Builds a Foursquare API requests
 */
const createApiRequestUrl = (id: string, coordinates: string = ''): string => {
    return `https://api.foursquare.com/v2/venues/${id}${stringify({
        client_id : process.env.FOURSQUARE_ID, 
        client_secret : process.env.FOURSQUARE_SECRET,
        ll : coordinates,
        openNow : 1,
        section : 'topPicks',
        sortByDistance : 1,
        v : 20180503
    }, true)}`;
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
    const request = createApiRequestUrl('explore', coordinates);
    const response = await fetch(request);

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return getVenuesByResponse(await response.json());
};
