import { gql } from 'apollo-boost';

export const hotTopicsQueries = gql`
   query Hot($limit: Int, $after: String, $before: String) {
      hot(limit: $limit, after: $after, before: $before) {
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
