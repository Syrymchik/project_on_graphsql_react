import { gql } from 'apollo-boost';

export const searchTopicsQueries = gql`
    query Search($limit: Int, $after: String, $before: String, $searchText: String) {
      search(limit: $limit, after: $after, before: $before, searchText: $searchText) {
        topics {
          score
          title
          subreddit
          thumbnail
          url
          selftext
          permalink
          author
        }
        after
        before
        dist
      }
    }
`;
