// "use server"

import { cookies } from "next/headers";

export const getUserIdFromToken = () => {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      return user.id;
    }
    return null;
  };
export const getUserRoleFromCookie = () => {
    const cookieStore = cookies();
    const role = cookieStore.get("role")?.value;
    if (role) {
      return role;
    }
    return null;
  };