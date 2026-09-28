import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repository/user.repository";
import env from "../../../config/env.js";

export const userService = {
  async register({ fullName, email, password }) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      const error = new Error('Email already in use');
      error.status = 409;
      throw error;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    return await userRepository.create({ fullName, email, passwordHash });
  },

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user || !user.isActive) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      error.auth.jwtSecret,
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
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    return user;
  },

  async updatedUser(id, data) {
    await this.getUserById(id);
    return await userRepository.update(id, data);
  },

  async deleteUser(id) {
    await this.getUserById(id);
    return await userRepository.delete(id);
  },
};