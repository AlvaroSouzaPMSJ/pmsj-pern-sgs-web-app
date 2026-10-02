import { userService } from "../services/user.service.js";
import { userMapper } from "../mappers/user.mapper.js";

export const userController = {
  async register(req, res, next) {
    try {
      const user = await userService.register(req.body);
      res.status(201).json({
        success: true, data: userMapper.toResponse(user)
      });
    } catch (err) {
      next(err);
    }
  },
  async login(req, res, next) {
    try {
      const { user, token } = await userService.login(req.body);
      res.status(200).json({
        sucess: true,
        data: { user: userMapper.toResponse(user), token }
      });
    } catch (err) {
      console.log(err)
      next(err);
    }
  },
  async getAll(req, res, next) {
    try {
      const users = await userService.getUsers();
      res.status(200).json({  })
    } catch (err) {
      next(err);
    }
  },
  async getById() {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json({
        success: true,
        data: userMapper.toResponse(user)
      })
    } catch (err) {
      next(err)
    }
  },
  async update(req, res, next) {
    try {
      const user = await userService.updatedUser(req.params.id, req.body);
      res.status(200).json({ success: true, data: userMapper.toResponse(user) });
    } catch (err) {
      next(err);
    }
  },
  async remove(req, res, next) {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
}