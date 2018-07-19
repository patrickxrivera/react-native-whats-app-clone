import { FlatList, ScrollView, Text, StyleSheet, View } from 'react-native';
import { Query } from 'react-apollo';
import React, { Component } from 'react';
import Message from '../components/messages.component';

import { GET_GROUP_BY_ID } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#e5ddd5',
    flex: 1,
    flexDirection: 'column'
  },
  messageWrapper: {
    marginTop: 30
  }
});

const renderLoading = () => (
  <View>
    <Text>Loading</Text>
  </View>
);

const renderError = (err) => {
  console.error(err);

  return (
    <View>
      <Text>Error</Text>
    </View>
  );
};

const formatMessage = (message) => ({
  message,
  isCurrentUser: message.from.username === 'sarah',
  color: 'black'
});

class Messages extends Component {
  state = {
    groupId: 'cjjru03jqca5g0b0215vxm384'
  };

  keyExtractor = (item) => item.message.id.toString();

  renderItem = ({ item: { isCurrentUser, message, color } }) => (
    <Message color={color} isCurrentUser={isCurrentUser} message={message} />
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.messageWrapper}>
          <Query query={GET_GROUP_BY_ID} variables={{ groupId: this.state.groupId }}>
            {({ data, loading, error }) => {
              if (loading) return renderLoading();
              if (error) return renderError(error);

              const { messages } = data.getGroupById;
              const formattedMessages = messages.map(formatMessage);

              return (
                <FlatList
                  data={formattedMessages}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderItem}
                  ListEmptyComponent={<View />}
                />
              );
            }}
          </Query>
        </View>
      </View>
    );
  }
}

export default Messages;
