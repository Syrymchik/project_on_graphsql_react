import React, { Component, Fragment } from 'react';
import TableComponent from "../table/table";
import withHocs from './newHoc';
import Pagination from "../pagination/pagination";
import PropTypes from "prop-types";


class New extends Component {

    state = {};

    static propTypes = {
        limit: PropTypes.number,
        after: PropTypes.string,
        before: PropTypes.string,
        changeAfterAndBefore: PropTypes.func
    };

    static defaultProps = {
        limit: 100,
        after: '',
        before: '',
        changeAfterAndBefore: () => {}
    };

    componentDidMount(): void {}
    componentWillUnmount(): void {
        this.props.changeAfterAndBefore(null, null);
    }

    render() {
        const { data = {}} = this.props;
        const { news = {} } = data;
        const { topics, after, before } = news;

        return (
            <Fragment>
                <Pagination before={before} after={after} />
                <TableComponent list={topics}/>
                <Pagination before={before} after={after} />
            </Fragment>
        );
    }

}

export default withHocs(New);