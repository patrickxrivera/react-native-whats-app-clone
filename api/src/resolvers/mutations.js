const getUserId = require('../utils');

const createUser = (root, { email, username }, ctx, info) =>
  ctx.db.mutation.createUser({
    data: {
      email,
      username
    }
  });

const addUserToGroup = (root, { groupId, userId }, ctx, info) =>
  ctx.db.mutation.updateGroup(
    {
      where: { id: groupId },
      data: {
        users: { connect: { id: userId } }
      }
    },
    info
  );

const addMessageToGroup = (root, { groupId, userId, text }, ctx, info) =>
  ctx.db.mutation.createMessage(
    {
      data: {
        to: { connect: { id: groupId } },
        from: { connect: { id: userId } },
        text
      }
    },
    info
  );

module.exports = {
  createUser,
  addUserToGroup,
  addMessageToGroup
};
