import React, {Component, Fragment} from 'react';
import TableComponent from '../table/table';
import Pagination from '../pagination/pagination';
import withHocs from './hotHoc';
import PropTypes from "prop-types";


class Hot extends Component {

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
    componentWillUnmount(): void {}

    render() {
        const { data = {}} = this.props;
        const { hot = {} } = data;
        const { topics, after, before } = hot;
        return (
            <Fragment>
                {/*<Button variant="contained" color="primary" >*/}
                {/*    Primary*/}
                {/*</Button>*/}
                <Pagination before={before} after={after} />
                <TableComponent list={topics}/>
                <Pagination before={before} after={after} />
            </Fragment>
        )
    }
}

export default withHocs(Hot);