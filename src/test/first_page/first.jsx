import React, { Component, Fragment } from 'react';


const ValidationMsg = ({ val }) => {
    if (val => 10 ) return <h2>Grate thn 10</h2>;
    else return <h3>Less than <em>10</em></h3>;
};


const TAB1 = () => (
    <h1>Text of tab 1</h1>
);

const TAB2 = () => (
    <h1>Text of tab 2</h1>
);

const TAB3 = () => (
    <h1>Text of tab 3</h1>
);

const people = [
    'John', 'Mike', 'Nick'
];

const tabs_BTN = [
    {
        dataName: 1,
        title: 'Tab1'
    },
    {
        dataName: 2,
        title: 'Tab2'
    },
    {
        dataName: 3,
        title: 'Tab3'
    },
];

class First extends Component {

    state = {
        activeTab: 1,
    };

    handleTab = (e) => {
        this.setState({
            activeTab: + e.target.getAttribute('data-name')
        })
    };

    render(){
        const { activeTab } = this.state;
        return (
            <Fragment>
                {
                    tabs_BTN.map(
                        (obj, index) => (
                            <button key={index} data-name={obj.dataName} onClick={this.handleTab}>{obj.title}</button>
                        ))
                }
                { activeTab === 1 ? <TAB1/> : activeTab === 2 ? <TAB2/> : <TAB3/> }
                <ul>
                    {people.map(
                        (persone, index) => (
                            <li key={ index }>{ persone }</li>
                        ))}
                </ul>
            </Fragment>
        )
    }

}


export default First;