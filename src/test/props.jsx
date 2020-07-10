import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

export const Button = () => {
    return <button>Simple button</button>
};

export const Counter = ({ counter = 0, func, number, string }) => {
    return <h1>{'Counter component. Counter value is: ' + counter}</h1>;
};

Counter.propTypes = {
  counter: PropTypes.number,
  func: PropTypes.func,
  number: PropTypes.number,
  string: PropTypes.string,
};

Counter.defaultProps = {
    func: () => {},
    number: 0,
    string: '',
};



export class Props extends Component {

    static propTypes = {
        children: PropTypes.node
    };

    static defaultProps = {
        children: null
    };

    state = {
        counter: 0,
    };

    handleClick = () => {
        this.setState(({ counter }) => ({
            counter: ++counter,
        }))
    };

    render = () => {
        const { counter } = this.state;
        const { children, child } = this.props;
        return (
            <Fragment>
                { child }
                <div>

                    { React.cloneElement(children, { counter: counter }) }
                    <div>{ counter }</div>
                    <button onClick={this.handleClick}> +1 </button>
                </div>
                <br/>
            </Fragment>
        )
    }
}

export default Props;