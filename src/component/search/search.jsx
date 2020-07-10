import React, {Component, Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import TableComponent from "../table/table";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withHoc from './searchHoc';
import Pagination from "../pagination/pagination";

class Search extends Component {

    state = {};

    static propTypes = {
        limit: PropTypes.number,
        after: PropTypes.string,
        before: PropTypes.string,
        searchText: PropTypes.string,
        changeSearchText: PropTypes.func,
    };

    static defaultProps = {
        limit: 100,
        after: '',
        before: '',
        searchText: '',
        changeSearchText: () => {},
    };

    componentDidMount(): void {}
    componentWillUnmount(): void {
        this.props.changeAfterAndBefore(null, null);
    }

    searchTextChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.props.changeSearchText(event.target.value);
    };

    render() {
        const { data = {}, searchText} = this.props;
        const { search = {} } = data;
        const { topics, after, before } = search;

        return (
            <Fragment>
                <Grid container spacing={3} >
                    <Grid item xs={12} md={12}>
                        <TextField
                            value={ searchText }
                            onChange={this.searchTextChange}
                            fullWidth={true}
                            id="outlined-number"
                            label="Search"
                            type="text"
                            autoFocus={true}
                            margin={"normal"}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <Pagination before={before} after={after} />
                <TableComponent list={topics}/>
                <Pagination before={before} after={after} />
            </Fragment>
        );
    }

}

export default withHoc(Search);