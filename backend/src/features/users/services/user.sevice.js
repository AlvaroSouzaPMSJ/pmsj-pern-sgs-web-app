import { userRepository } from "../repository/user.repository.js";
import { UserAlreadyExistsError } from "../errors/user.errors.js";
import { toUserResponseDTO } from "../mappers/user.mapper.js";

export const userService = {

  // create new user
  createUser: async (userData) => {

    // check if email exists
    const existingEmail = await userRepository.findByEmail(userData.email);
    if (existingEmail) throw new UserAlreadyExistsError("E-mail");

    // check if cpf exists
    const existingCpf = await userRepository.findByCpf(userData.cpf);
    if (existingCpf) throw new UserAlreadyExistsError("CPF");

    // create user in DB
    const newUser = await userRepository.create(userData);

    // map to DTO to strip password and internal fields
    return toUserResponseDTO(newUser);

  },

  // get all users
  getAllUsers: async() =>{
    const users = await userRepository.findaAll();
    return users.map((user) => toUserResponseDTO(user));
  },

};