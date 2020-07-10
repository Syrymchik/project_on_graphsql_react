import React, {Component, Fragment} from 'react';



class Posts extends Component {

    state = {
        count: 20,
        value: 0,
        list: []
    };

    changeItemOfMenu = ( vl ) => {
        this.setState({
            value: vl
        });
        alert(vl);

    };

    a11yProps = (index) => {
        return {
            id: `wrapped-tab-${index}`,
            'aria-controls': `wrapped-tabpanel-${index}`,
        };
    };



    render () {
        const { value } = this.state;
        console.log(this.props.data);
        return (
            <Fragment>
                <div>
                </div>
            </Fragment>
        )
    }

}



export default Posts;