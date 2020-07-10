const graphql = require('graphql');
const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = graphql;

const BASE_URL = 'https://www.reddit.com/';
const HOT_NEWS = 'hot.json';
const NEW_NEWS = 'new.json';
const SEARCH = 'search.json';
const PARAM_LIMIT = 'limit=';
const PARAM_AFTER = '&after=';
const PARAM_BEFORE = '&before=';
const PARAM_QUERY = '&q=';
const RAW_JSON = '&raw_json=1';
const Topics = require('../models/topic');


const TopicsType = new GraphQLObjectType({
    name: 'TopicsType',
    fields: () => ({
        topics: { type:  new GraphQLList(TopicType) },
        after: { type: GraphQLString },
        before: { type: GraphQLString },
        dist: { type: GraphQLInt },
    })
});

const TopicType = new GraphQLObjectType({
    name: 'TopicType',
    fields: () => ({
        id: {type: GraphQLID },
        subreddit: {type: GraphQLString},
        title: {type: GraphQLString},
        score: {type: GraphQLInt},
        thumbnail: {type: GraphQLString},
        url: {type: GraphQLString},
        selftext: {type: GraphQLString},
        permalink: { type: GraphQLString },
        author: { type: GraphQLString },
        created: { type: GraphQLInt },
    })
});

const CommentType = new GraphQLObjectType({
    name: 'CommentType',
    fields: () => ({
        subreddit: {type: GraphQLString},
        body: {type: GraphQLString},
        score: {type: GraphQLInt},
        permalink: { type: GraphQLString },
        replies: { type: new GraphQLList(CommentType)},
    })
});

const TopicAndCommentType = new GraphQLObjectType({
    name: 'TopicAndCommentType',
    fields: () => ({
        topic: {type: TopicType},
        comments: {type: new GraphQLList(CommentType)},
    })
});

const API = new GraphQLObjectType({
    name: 'API',
    fields: {
        bookmark: {
            type: new GraphQLList(TopicType),
            resolve(parent, args){

                return Topics.find({});
            }
        },
        hot: {
            type: TopicsType,
            args: {
                limit: { type: GraphQLInt },
                after: { type: GraphQLString },
                before: { type: GraphQLString },
            },
            resolve(parent, args) {
                const {limit = 25, after = null, before = null} = args;
                let query = BASE_URL + HOT_NEWS + '?' + PARAM_LIMIT + limit + PARAM_AFTER + after + PARAM_BEFORE + before;
                return axios.get(query)
                    .then(res => {
                        return {
                            topics: res.data.data.children.map(obj => obj.data),
                            after: res.data.data.after,
                            before: res.data.data.before,
                            dist: res.data.data.dist,
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        return [];
                    });
            }
        },
        news: {
            type: TopicsType,
            args: {
                limit: { type: GraphQLInt },
                after: { type: GraphQLString },
                before: { type: GraphQLString },
            },
            resolve(parent, args){
                const { limit = 25, after = null, before = null } = args;
                let query = BASE_URL + NEW_NEWS + '?' + PARAM_LIMIT + limit + PARAM_AFTER + after + PARAM_BEFORE + before;

                return axios.get(query)
                    .then(res => {
                        return {
                            topics: res.data.data.children.map(obj => obj.data),
                            after: res.data.data.after,
                            before: res.data.data.before,
                            dist: res.data.data.dist,
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        return [];
                    });
            }
        },
        search: {
            type: TopicsType,
            args: {
                limit: { type: GraphQLInt },
                after: { type: GraphQLString },
                before: { type: GraphQLString },
                searchText: { type: GraphQLString },
            },
            resolve(parent, args){
                const { limit = 25, after = null, before = null, searchText = '' } = args;
                let query = BASE_URL + SEARCH + '?' + PARAM_LIMIT + limit + PARAM_AFTER + after + PARAM_BEFORE + before + PARAM_QUERY + searchText;

                return axios.get(query)
                    .then(res => {
                        return {
                            topics: res.data.data.children.map(obj => obj.data),
                            after: res.data.data.after,
                            before: res.data.data.before,
                            dist: res.data.data.dist,
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        return [];
                    });
            }
        },
        topicAndComment: {
            type: TopicAndCommentType,
            args: {
                commentLimit: { type: GraphQLInt },
                repliesLimit: { type: GraphQLInt },
                permalink: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args){
                const { commentLimit = 25, repliesLimit = 25 } = args;
                const limit = 100;
                const permalink = args.permalink.slice(1, -1) + '.json';
                let query = BASE_URL + permalink + '?' + PARAM_LIMIT + limit + RAW_JSON;

                return axios.get(query).then( res =>  {
                    return {
                        topic: res.data[0].data.children[0].data
                        , comments: res.data[1].data.children.filter( obj => obj.kind !== 'more' ).slice(0, commentLimit).map(obj => {
                            if ( obj.data.replies !== '') {
                                obj.data.replies = obj.data.replies.data.children.filter(obj => obj.kind !== 'more').slice(0, repliesLimit).map(rep => {
                                    if (rep.kind === 'more') return;

                                    return rep.data;
                                });
                            } else obj.data.replies = [];

                            // console.log(obj);

                            return obj.data
                        })
                    };
                }).catch(err => console.log(err));
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTopic: {
            type: TopicType,
            args: {
                subreddit: {type: GraphQLString},
                title: {type: GraphQLString},
                score: {type: GraphQLInt},
                thumbnail: {type: GraphQLString},
                url: {type: GraphQLString},
                selftext: {type: GraphQLString},
                permalink: { type: new GraphQLNonNull(GraphQLString) },
                author: { type: GraphQLString },
                created: { type: GraphQLInt },
            },
            resolve( parent, args ){
                const {
                    subreddit = '',
                    title = 'no content',
                    score = 0,
                    thumbnail = '',
                    url = '',
                    selftext = '',
                    permalink = '',
                    author = '',
                    created = 0
                } = args;
                const topic = new Topics({
                    subreddit: subreddit,
                    title: title,
                    score: score,
                    thumbnail: thumbnail,
                    url: url,
                    selftext: selftext,
                    permalink: permalink,
                    author: author,
                    created: created,
                });

                return topic.save();
            }
        },
        deleteTopic: {
            type: TopicType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args){
                return Topics.findByIdAndRemove(args.id);
            }
        },
        updateTopic: {
            type: TopicType,
            args: {
                id: {type: GraphQLID },
                subreddit: {type: GraphQLString},
                title: {type: GraphQLString},
                score: {type: GraphQLInt},
                thumbnail: {type: GraphQLString},
                url: {type: GraphQLString},
                selftext: {type: GraphQLString},
                permalink: { type: new GraphQLNonNull(GraphQLString) },
                author: { type: GraphQLString },
                created: { type: GraphQLInt },
            },
            resolve(parent, args){
                const {
                    subreddit = '',
                    title = 'no content',
                    score = 0,
                    thumbnail = '',
                    url = '',
                    selftext = '',
                    permalink = '',
                    author = '',
                    created = 0
                } = args;
                return Topics.findByIdAndUpdate(
                    args.id,
                    { $set: {
                            subreddit: subreddit,
                            title: title,
                            score: score,
                            thumbnail: thumbnail,
                            url: url,
                            selftext: selftext,
                            permalink: permalink,
                            author: author,
                            created: created,
                        } },
                    { new: true },
                );
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: API,
    mutation: Mutation,
});



