import { gql } from 'apollo-boost';

export const newBookMarkQueries = gql`
   query{
      bookmark{
        id
        score
        title
        subreddit
        score
        thumbnail
        url
        selftext
        permalink
        author
        created
      }  
    }
`;