import React, { Component, Fragment } from 'react'
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { DataContext } from '../app/app'
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";


class Pagination extends Component {

    state = {};

    static propTypes = {
        after: PropTypes.string,
        before: PropTypes.string
    };

    static defaultProps = {
        after: '',
        before: ''
    };

    componentDidMount(): void {}
    componentWillUnmount(): void {}


    render () {
        const { after, before } = this.props;

        return (

            <DataContext.Consumer>
                {({ changeAfterAndBefore, limit, changeLimit }) => (
                    <Fragment>
                        <Grid container
                              direction="row"
                              justify="space-between"
                              alignItems="center" spacing={3}>
                            <Grid item xs={12} md={1}>
                                <FormControl variant="outlined" margin={"normal"}>
                                    <InputLabel htmlFor="outlined-age-native-simple">Limit</InputLabel>
                                    <Select
                                        native
                                        value={limit}
                                        onChange={ changeLimit }
                                        label="Age"
                                        inputProps={{
                                            name: 'age',
                                            id: 'outlined-age-native-simple',
                                        }}
                                    >
                                        <option aria-label="None" value=""/>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <ButtonGroup variant="contained" color="primary">
                                    <Button onClick={changeAfterAndBefore(before, null)}>Back</Button>
                                    <Button onClick={changeAfterAndBefore(null, after)}>Next</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </Fragment>
                )}
            </DataContext.Consumer>

        )
    }


}

export default Pagination;