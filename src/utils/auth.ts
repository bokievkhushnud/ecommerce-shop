import { User } from '../types';
export function checkUserAuthentication(): boolean {
  return localStorage.getItem('user') !== null;
}

export function handleLogout() {
  localStorage.removeItem('user');
}

export function getUserFromStorage(): User | null {
  const userData = localStorage.getItem('user');
  return userData ? (JSON.parse(userData).customer as User) : null;
}
