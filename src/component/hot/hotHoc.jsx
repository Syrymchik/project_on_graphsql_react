import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { hotTopicsQueries } from './queries';

const withGraphQLData = graphql(hotTopicsQueries, {
    options: ({  limit , after , before }) => ({
        variables: { limit, after, before }
    })
});

export default compose(withGraphQLData);