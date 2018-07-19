import gql from 'graphql-tag';

export const ADD_MESSAGE_TO_GROUP = gql`
  mutation addMessageToGroup($groupId: ID!, $userId: ID!, $text: String!) {
    addMessageToGroup(groupId: $groupId, userId: $userId, text: $text) {
      id
    }
  }
`;
