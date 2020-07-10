import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { newTopicsQueries } from './queries';

const withGraphQLData = graphql(newTopicsQueries, {
    options: ({ limit , after , before }) => ({
        variables: { limit , after , before }
    })
});

export default compose(withGraphQLData);