import User from "../models/user.model.js"

export const userRepository = {
  // create a user
  create: async (userData) => {
    const user = new User(userData);
    return await user.save();
  },

  // check for duplicate
  findByEmail: async (email) => {
    return await User.findOne({ email });
  },

  findByCpf: async (cpf) => {
    return await User.findOne({ cpf });
  },

  findById: async (id) => {
    return await User.findById(id);
  },
};