export interface User {
  uid: string;
  name: string;
  email: string;
}

export function createUser(params: Partial<User>): User {
  return { ...params } as User;
}
