import { gql } from 'apollo-boost';

export const AddTopicQueries = gql`
mutation addTopic(  $subreddit: String, $title: String, $score: Int
, $thumbnail: String, $url: String, $selftext: String
, $permalink: String!, $author: String, $created: Int) {

  addTopic( subreddit: $subreddit, title: $title
  , score: $score, thumbnail: $thumbnail, url: $url, selftext: $selftext
  , permalink: $permalink, author: $author, created: $created) {
    title
    score
  }
}
`;

export const deleteBookMarkQuery = gql`
     mutation deleteTopic($id: ID!) {
       deleteTopic(id:$id){
             id
             subreddit
           }
      }
`;
