const { User } = require('../models');

module.exports = {
  async store(request, response) {
    const { email, password } = request.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return response.status(401).json({ message: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ message: 'Incorrect password' });
    }

    return response.json({
      user,
      token: user.generateToken(),
    });
  },
};
