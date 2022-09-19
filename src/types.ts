export interface ErrorResponse {
  detail: string;
  code: string;
}

export interface User {
  id: number;
  last_login: string;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  date_joined: string;
  email: string;
  is_active: boolean;
  groups: [];
}

export interface Profile {
  id: number;
  bio: string;
  avatar: string;
  github: string;
  linkedin: string;
  country: string;
  user: User;
}
