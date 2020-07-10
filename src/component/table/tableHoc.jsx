import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { AddTopicQueries, deleteBookMarkQuery } from './queries';
import { newBookMarkQueries } from '../bookmark/queries'

const withGraphQLData = graphql(AddTopicQueries, {
    props: ({ mutate }) => ({
        addTopic: topic => mutate({
            variables: topic,
            refetchQueries: [{ query: newBookMarkQueries }],
        }),
    }),
});

const withDeleteBookMarkGraphQLData = graphql(deleteBookMarkQuery, {
    props: ({ mutate }) => ({
        deleteTopic: topicDelete => mutate({
            variables: topicDelete,
            refetchQueries: [{ query: newBookMarkQueries }],
        }),
    }),
});

export default compose(withGraphQLData, withDeleteBookMarkGraphQLData);