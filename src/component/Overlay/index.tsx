import * as React from 'react';
import Logo from '../Logo';
import classNames from 'classnames';
import style from './style.scss';

// Definitions

export interface Props {
    message: string,
    error: boolean,
    isVisible: boolean
}

/**
 * @public
 */
class Overlay extends React.PureComponent<Props>
{
    render() {
        const { message, error, isVisible } = this.props;

        return (
            <section className={ classNames(style.container, isVisible && style.visible) }>
                <div className={ style.wrapper }>
                    <header className={ style.header }>
                        <Logo/>
                    </header>
                    <small className={ classNames(style.status, error && style.error) }>
                        { message }
                    </small>
                </div>
            </section>
        );
    }
}

export default Overlay;
