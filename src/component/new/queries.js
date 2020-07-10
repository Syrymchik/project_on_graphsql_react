import { gql } from 'apollo-boost';

export const newTopicsQueries = gql`
   query News($limit: Int, $after: String, $before: String) {
      news(limit: $limit, after: $after, before: $before) {
        topics {
          score
          title
          subreddit
          thumbnail
          url
          selftext
          permalink
        }
        after
        before
        dist
      }
    }
`;
