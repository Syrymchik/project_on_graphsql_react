import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { newBookMarkQueries } from './queries';

const withGraphQLData = graphql(newBookMarkQueries);

export default compose(withGraphQLData);