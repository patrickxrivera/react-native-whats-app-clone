const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-is-aw3some';

const getUserId = (ctx) => {
  const Authorization = ctx.request.get('Authorization');

  if (Authorization) {
    return handleIsAuthenticated(Authorization);
  }

  throw new Error('Not authenticated.');
};

const handleIsAuthenticated = (Authorization) => {
  const token = Authorization.replace('Bearer ', '');
  const { userId } = jwt.verify(token, APP_SECRET);

  return userId;
};

module.exports = {
  APP_SECRET,
  getUserId
};
