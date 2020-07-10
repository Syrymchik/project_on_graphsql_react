import React, { Component, Fragment } from 'react';
import './fragment.css'

const style = {color:'green', textTransform: 'uppercase' };

const Columns = () => (
    <Fragment>
        <td style={style} key="1">Hello</td>
        <td className="title text-uppercase" key="2">world</td>
    </Fragment>
);

class FragmentAndCss extends Component {

    state = {

    };

    render(){
        return (
            <table>
                <thead>
                    <tr>
                        <td>
                            text1
                        </td>
                        <td>
                            text2
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <Columns/>
                    </tr>
                </tbody>
            </table>
        )
    }

}

export default FragmentAndCss;