import React, { Component, Fragment } from 'react';
import TableComponent from "../table/table";
import withHocs from './bookmarkHoc';


class BookMark extends Component {

    state = {};

    static propTypes = {
    };

    static defaultProps = {
    };

    componentDidMount(): void {}
    componentWillUnmount(): void {}

    render() {
        const { data = {}} = this.props;
        const { bookmark = [] } = data;

        return (
            <Fragment>
                <TableComponent list={bookmark} isBookmark={true}/>
            </Fragment>
        );
    }
}

export default withHocs(BookMark);