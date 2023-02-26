import api from "..";

export const postSignOut = () => api.prod.post<null>("/api/auth/sign-out");
