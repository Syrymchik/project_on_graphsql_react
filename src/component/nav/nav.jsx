import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';


class Nav extends Component {

    state = {
        count: 20,
        value: 0,
        redirect: null
    };

    render = () => {
        return (
            <Fragment>
                <AppBar position="static" color={"transparent"}>
                    <Toolbar>
                        <Link to={'/'}>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <WhatshotIcon/>
                                <Typography variant="h6">
                                    Hot
                                </Typography>
                            </IconButton>
                        </Link>
                        <Link to={'/new'}>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <FiberNewIcon/>
                                <Typography variant="h6">

                                    New

                                </Typography>
                            </IconButton>
                        </Link>
                        <Link to={'/search'}>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <ImageSearchIcon/>
                                <Typography variant="h6">
                                    Search
                                </Typography>
                            </IconButton>
                        </Link>
                        <Link to={'/bookmark'}>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <ImageSearchIcon/>
                                <Typography variant="h6">
                                    Bookmark
                                </Typography>
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>
            </Fragment>
        )
    }
}

export default Nav;