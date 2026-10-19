export interface AuthenticatedUser {
  user_id: string;
  name: string;
  type: 'student' | 'instructor';
}

export type AuthenticatedRequestBody<T = Record<string, unknown>> = T & {
  user: AuthenticatedUser;
};
