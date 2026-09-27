import { UserResponseDTO } from "../dto/userResponse.dto.js";

export const toUserResponseDTO = (userDocument) => {
  if (!userDocument) return null;
  return new UserResponseDTO(userDocument);
};