import React, { Component } from 'react'
import News from './news_fragment';

const BASE_API = 'https://hn.algolia.com/api/v1';
const SEARCH_PATH = '/search';
const SEARCH_PARAM = 'query=';

class Api extends Component {

    state = {
        searchQuery: '',
        result: {},
    };

    inputRef = React.createRef();

    componentDidMount() {
        const { searchQuery } = this.state;
        this.fetchData(searchQuery);
    }

    fetchData = searchQuery => {
        fetch(BASE_API + SEARCH_PATH + '?' + SEARCH_PARAM + searchQuery)
            .then( res => res.json() )
            .then( result => this.setNews(result))
            .catch( error => console.log(error))
    };

    inputChange = () => {
        this.setState({
            searchQuery: this.inputRef.current.value
        })
    };

    getSearch = ({key}) => {
        console.log('Key = ' + key );
        if (key === 'Enter') {
            const { searchQuery } = this.state;
            this.fetchData(searchQuery);
        }
    };

    setNews = result => {
        this.setState({ result })

    };

    render() {
        const { result } = this.state;
        const { hits = [] } = result;
        console.log( 'Length of hits ' + hits.length );
        return (
            <div>
                <input type="text" ref={this.inputRef} onChange={this.inputChange} onKeyPress={this.getSearch}/>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>author</th>
                            <th>created</th>
                            <th>number comments</th>
                            <th>title</th>
                            <th>points</th>
                            <th>url</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            hits.map(({ author, created_at, num_comments, objectID, title, points, url }, index) =>
                                <News
                                    key={index}
                                    id={objectID}
                                    author={author}
                                    created={created_at}
                                    num_comments={num_comments}
                                    title={title}
                                    points={points}
                                    url={url}
                                />
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}


export default Api