import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repository/user.repository.js";
import env from "../../../config/env.js";

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

export const userService = {
  async register({ fullName, email, password }) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw httpError(409, "Email already in use");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    return await userRepository.create({ fullName, email, passwordHash });
  },

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user || !user.isActive) {
      throw httpError(401, "Invalid credentials");
    }
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      throw httpError(401, "Invalid credentials");
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      env.auth.jwtSecret,
      { expiresIn: env.auth.jwtExpiresIn }
    );
    return { user, token };
  },

  async getUsers() {
    return await userRepository.findAll();
  },

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw httpError(404, "User not found");
    }
    return user;
  },

  async updateUser(id, data) {
    await this.getUserById(id);
    return await userRepository.update(id, data);
  },

  async deleteUser(id) {
    await this.getUserById(id);
    return await userRepository.delete(id);
  },
};