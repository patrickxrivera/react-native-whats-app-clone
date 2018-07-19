import { TextInput, StyleSheet, View, Button } from 'react-native';
import { Mutation } from 'react-apollo';
import React from 'react';

import { ADD_MESSAGE_TO_GROUP } from '../graphql/mutations';
import { GET_GROUP_BY_ID } from '../graphql/queries';

const variables = {
  groupId: 'cjjru03jqca5g0b0215vxm384',
  userId: 'cjjqdz5qbe7yq0b02jdd8gkp9',
  username: 'jon',
  createdAt: Date.now(),
  id: 'tempId'
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    backgroundColor: '#f5f1ee',
    borderColor: '#dbdbdb',
    borderTopWidth: 1,
    flexDirection: 'row'
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#dbdbdb',
    borderRadius: 15,
    borderWidth: 1,
    color: 'black',
    height: 32,
    paddingHorizontal: 8
  },
  sendButtonContainer: {
    paddingRight: 12,
    paddingVertical: 6
  },
  sendButton: {
    height: 32,
    width: 32
  },
  iconStyle: {
    marginRight: 0 // default is 12
  }
});

const sendButton = (send) => (
  <Button
    backgroundColor={'blue'}
    borderRadius={16}
    color={'white'}
    iconStyle={styles.iconStyle}
    name="send"
    onPress={send}
    size={16}
    style={styles.sendButton}
  />
);

let count = 1;

class MessageInput extends React.Component {
  state = {
    text: ''
  };

  handleTextChange = (text) => this.setState({ text });

  handleInputSubmit = (addMessageToGroup) => () => {
    const { text } = this.state;
    const { groupId, userId, id, username, createdAt } = variables;

    addMessageToGroup({
      variables: {
        ...variables,
        text
      },

      optimisticResponse: {
        __typename: 'Mutation',
        addMessageToGroup: {
          __typename: 'Message',
          id,
          text,
          createdAt: new Date().toISOString(),
          from: {
            __typename: 'User',
            id: 1,
            username
          },
          to: {
            __typename: 'Group',
            id: groupId
          }
        }
      },

      update: (store, { data: { addMessageToGroup } }) => {
        const data = store.readQuery({
          query: GET_GROUP_BY_ID,
          variables: { groupId }
        });

        console.log(count++);

        data.getGroupById.messages.push(addMessageToGroup);

        store.writeQuery({
          query: GET_GROUP_BY_ID,
          variables: { groupId },
          data
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Mutation mutation={ADD_MESSAGE_TO_GROUP}>
            {(addMessageToGroup) => {
              return (
                <TextInput
                  placeholder="Enter your message"
                  onChangeText={this.handleTextChange}
                  onSubmitEditing={this.handleInputSubmit(addMessageToGroup)}
                />
              );
            }}
          </Mutation>
        </View>
        <View style={styles.sendButtonContainer}>{sendButton()}</View>
      </View>
    );
  }
}

export default MessageInput;
