import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const AppLink = ({ to, children }) => ({
        render: () => (
            <Link to={to}>
                { children }
            </Link>
        )

});

class Hoc extends Component {
    render() {
        return(
            <Router>
                <nav>
                    <AppLink to="/" activeClassName="active"> Home </AppLink>
                    <AppLink to="/portfolio" activeClassName="active"> Portfolio </AppLink>
                    <AppLink to="/contacts" activeClassName="active"> Contacts </AppLink>
                </nav>
            </Router>

        )
    }
}

export default Hoc