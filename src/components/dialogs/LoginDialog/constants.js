const USER_NOT_FOUND = 'login1'
const USER_PASSWORD_DONT_MATCH = 'login3'

export const EMPTY_USERNAME = 'EMPTY_USERNAME'

export const ERROR_MESSAGES = new Map([
  [USER_NOT_FOUND, 'Esta conta não existe, insira uma conta diferente ou obtenha uma nova'],
  [EMPTY_USERNAME, 'Insira um nome de usuário ou endereço de e-mail válido'],
  [USER_PASSWORD_DONT_MATCH, 'O usuário e/ou senha está incorreta']
])
