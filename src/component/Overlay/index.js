import React, { PureComponent } from 'react';
import Logo from 'component/Logo';
import classNames from 'classnames';
import * as style from './style.scss';

import type { Component } from 'react';

// Definitions

export type Props = {
    message: string,
    error: boolean,
    isVisible: boolean
};

/**
 * Overlay
 *
 * Display user and error messages.
 *
 * @public
 */
class Overlay extends PureComponent<Props>
{
    render(): Component {
        const { message, error, isVisible } = this.props;

        return (
            <section className={classNames(style.container, isVisible && style.visible)}>
                <div className={style.wrapper}>
                    <header className={style.header}>
                        <Logo/>
                    </header>
                    <small className={classNames(style.status, error && style.error)}>
                        {message}
                    </small>
                </div>
            </section>
        );
    }
}

export default Overlay;
