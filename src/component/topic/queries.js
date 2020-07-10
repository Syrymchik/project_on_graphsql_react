import { gql } from 'apollo-boost';

export const topicAndCommentQueries = gql`
    query TopicAndComment($commentLimit: Int, $repliesLimit: Int, $permalink: String!) {
      topicAndComment(commentLimit: $commentLimit, permalink: $permalink, repliesLimit: $repliesLimit) {
        topic {
          subreddit
          title
          score
          thumbnail
          url
          selftext
          permalink
          author
          created
        }
        comments {
          subreddit
          body
          score
          replies{
            subreddit
            body
            score
          }
        }
      }
    }
`;