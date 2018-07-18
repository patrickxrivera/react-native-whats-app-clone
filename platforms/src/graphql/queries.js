import gql from 'graphql-tag';

export const GET_GROUP_BY_ID = gql`
  query getGroupById($groupId: ID!) {
    getGroupById(groupId: $groupId) {
      messages {
        id
        text
        to {
          name
        }
        from {
          username
        }
        createdAt
      }
    }
  }
`;
