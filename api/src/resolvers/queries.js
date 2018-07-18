const getGroupById = (root, { groupId }, ctx, info) =>
  ctx.db.query.group({ where: { id: groupId } }, info);

const getAllGroups = (root, args, ctx, info) => ctx.db.query.groups({}, info);

module.exports = {
  getGroupById,
  getAllGroups
};
