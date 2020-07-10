import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { topicAndCommentQueries } from './queries';

const withGraphQLData = graphql(topicAndCommentQueries, {
    options: ({ commentLimit, permalink, repliesLimit }) => ({
        variables: { commentLimit, repliesLimit, permalink }
    })
});

export default compose(withGraphQLData);