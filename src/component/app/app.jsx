import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import Hot from '../hot/hot'
import BookMark from '../bookmark/bookmark'
import New from '../new/new'
import Search from '../search/search'
import Nav from '../nav/nav'
import Topic from '../topic/topic'
import Container from '@material-ui/core/Container';
import { Switch, Route } from "react-router-dom";


const client = new ApolloClient({
    uri: 'http://localhost:3005/api'
});

const style = {
  marginTop: '20px'
};

export const DataContext = React.createContext();

class App extends Component {

    state = {
        limit: 5,
        commentLimit: 3,
        repliesLimit: 5,
        after: '',
        before: '',
        searchText: '',
        permalink: '',
    };

    changeLimit = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({ limit: Number(event.target.value) })
    };

    changeAfterAndBefore = ( before = '', after = '' ) => {
        return () => { this.setState({ before: before, after: after })
        }
    };

    changeSearchText = ( text ) => {
        this.setState( ({searchText: text}))
    };

    changePermaLink = ( link ) => {
        return () => {this.setState( ({permalink: link}))}
    };

    changeCommentLimit = ( limit ) => {
        this.setState( ({commentLimit: Number(limit)}))
    };

    changeRepliesLimit = ( limit ) => {
        this.setState( ({repliesLimit: Number(limit)}))
    };

    render() {
        const { children = null } = this.props;
        const { limit, after, before, searchText, commentLimit, repliesLimit, permalink } = this.state;
        return (
            <ApolloProvider client={ client }>
                <Fragment>
                    <div className={'container-fluid'}>
                        <Nav/>

                        {/*{'permalink: ' + permalink  + ' after: ' + after + ', before: ' + before}*/}
                    </div>
                    <Container style={style}>
                        <DataContext.Provider value={{
                            changePermaLink: this.changePermaLink,
                            changeAfterAndBefore: this.changeAfterAndBefore,
                            count: 1020,
                            limit: limit,
                            changeLimit: this.changeLimit,
                        }}>
                            <Switch>
                                <Route exact path='/' component={() => <Hot limit={limit} after={after} before={before}
                                                                            changeAfterAndBefore={this.changeAfterAndBefore}/>}/>
                                <Route path='/bookmark' component={() => <BookMark limit={limit}/>}/>
                                <Route path='/new' component={() => <New limit={limit} after={after} before={before}
                                                                         changeAfterAndBefore={this.changeAfterAndBefore}/>}/>
                                <Route path='/search'
                                       component={() => <Search limit={limit} after={after} before={before}
                                                                changeAfterAndBefore={this.changeAfterAndBefore}
                                                                searchText={searchText}
                                                                changeSearchText={this.changeSearchText}
                                       />}/>
                                <Route path='/topic'
                                       component={() => <Topic commentLimit={commentLimit} repliesLimit={repliesLimit}
                                                               permalink={permalink}
                                                               changePermaLink={this.changePermaLink}
                                                               changeCommentLimit={this.changeCommentLimit}
                                                               changeRepliesLimit={this.changeRepliesLimit}
                                       />}/>
                            </Switch>
                        </DataContext.Provider>
                    </Container>
                    { children }
                </Fragment>
            </ApolloProvider>
        )
    }
}

export default App;



