import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { searchTopicsQueries } from './queries';

const withGraphQLData = graphql(searchTopicsQueries, {
    options: ({ limit , after , before, searchText }) => ({
        variables: { limit , after , before, searchText }
    })
});

export default compose(withGraphQLData);