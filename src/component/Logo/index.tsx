import * as React from 'react';
import style from './style.scss';

/**
 * It is better to store as an inline asset, because appears only once and
 * no need of additional HTTP request
 *
 * @public
 */
const Logo: React.FunctionComponent = () => (
    <svg
        className={ style.logo }
        width={ 250 }
        height={ 40 }
        viewBox="0 0 250 36.269"
        preserveAspectRatio="xMinYMid meet"
    >
        <path d="M18.239,34.783q0,3.306-3.282,3.306H3.213Q0,38.088,0,34.783V5.24Q0,1.912,3.213,1.912H14.956q3.282,0,3.282,3.329V34.783Zm-5.409-1.341V6.558H5.409V33.442h7.42Z" transform="translate(0 -1.865)" fill="#fff"/>
        <path d="M40.915,38.088H36.177L27.508,15.319a13.665,13.665,0,0,1,.347,2.612V38.088h-5.27V1.912h4.739l8.669,22.307a13.663,13.663,0,0,1-.347-2.612V1.912h5.27V38.088Z" transform="translate(0 -1.865)" fill="#fff"/>
        <path d="M70.735,6.7H64.771V38.088H59.385V6.7H53.421V1.912H70.735V6.7Z" transform="translate(0 -1.865)" fill="#fff"/>
        <path d="M91.678,38.088H86.223V21.861H78.9V38.088H73.486V1.912H78.9v14.91h7.328V1.912h5.455V38.088Z" transform="translate(0 -1.865)" fill="#fff"/>
        <path d="M110.98,38.088h-15V1.912h14.864V6.7h-9.454V17.261h8.137v4.693h-8.137V33.3h9.593v4.785Z" transform="translate(0 -1.865)" fill="#fff"/>
        <path d="M141.771,34.783q0,3.306-3.282,3.306H127.6q-3.259,0-3.259-3.306V26.16h5.409v7.374h6.611v-7.1L125.52,16.174a3.833,3.833,0,0,1-1.179-2.89V5.24q0-3.329,3.259-3.329h10.888q3.282,0,3.282,3.282v8.091h-5.409V6.466H129.75v6.542l10.841,10.217a3.843,3.843,0,0,1,1.179,2.936v8.622Z" transform="translate(0 -1.865)" fill="#fff"/>
        <path d="M166.759,38.135h-0.37l-2.427-1.849a2.769,2.769,0,0,1-2.936,1.8H149.283q-3.214,0-3.213-3.306V5.24q0-3.329,3.282-3.329h11.674q3.282,0,3.282,3.329V31.408l2.45,1.757v4.97ZM158.9,33.442V32.171l-3.167-2.4V24.843h0.324l2.843,2.127V6.558h-7.42V33.442h7.42Z" transform="translate(0 -1.865)" fill="#fff"/>
        <path d="M187.471,34.783q0,3.306-3.329,3.306H172.654q-3.283,0-3.282-3.306V1.912h5.409v31.53h7.282V1.912h5.409V34.783Z" transform="translate(0 -1.865)" fill="#fff"/>
        <path d="M210.148,38.088h-5.363L203.7,31.223h-6.773l-1.086,6.865H190.5V38l7-36.13h5.687Zm-7.212-11.512L200.3,10.257l-2.658,16.32h5.294Z" transform="translate(0 -1.865)" fill="#fff"/>
        <path d="M231.692,38.088h-5.64l-5.964-16.805V18.024H225.4V6.558h-6.819v31.53h-5.409V1.912h14.355q3.259,0,3.259,3.329V18.393q0,2.288-1.549,2.959a11.136,11.136,0,0,1-3.514.347Z" transform="translate(0 -1.865)" fill="#fff"/>
        <path d="M250,38.088H235V1.912h14.864V6.7h-9.454V17.261h8.137v4.693h-8.137V33.3H250v4.785Z" transform="translate(0 -1.865)" fill="#fff"/>
    </svg>
);

export default React.memo(Logo);
