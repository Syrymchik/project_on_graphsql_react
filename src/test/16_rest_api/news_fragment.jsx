import React, { Component } from 'react'
import PropTypes from "prop-types";


class News extends Component {

    state = {

    };

    static propTypes = {
        id: PropTypes.string,
        author: PropTypes.string,
        created: PropTypes.string,
        num_comments: PropTypes.number,
        title: PropTypes.string,
        points: PropTypes.number,
        url: PropTypes.string,
    };

    static defaultProps = {
        id: '',
        author: 'no content',
        created: "no content",
        num_comments: 0,
        title: "no content",
        points: 0,
        url: "",
    };

    render() {
        const { id, author, created, num_comments, title, points, url } = this.props;
        return (
            <tr>
                <td>{ id }</td>
                <td>{ author }</td>
                <td>{ created }</td>
                <td>{ num_comments }</td>
                <td>{ title }</td>
                <td>{ points }</td>
                <td>{ url }</td>
            </tr>
        )
    }

}


export default News;