import { userResponseDto } from "../dto/userResponse.dto";

export const userMapper = {
  toResponse(user) {
    if (!user) return null;
    return userResponseDto(user);
  },
  toResponseList(users) {
    return users.map(userResponseDto);
  }
};