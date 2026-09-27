export class UserAlreadyExistsError extends Error {
  constructor(field = "Email ou CPF") {
    super(`${field} já está cadastrado.`);
    this.name = "UserAlreadyExistsError";
    this.statusCode = 409;
  }
}