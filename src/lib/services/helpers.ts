export const API = import.meta.env.VITE_API_URL;

export async function tryCatch(fn: <T>() => Promise<T>) {
  try {
    return await fn();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const postHeaders = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export const postHeadersCredentials: RequestInit = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

export const getCredentials: RequestInit = {
  method: "GET",
  credentials: "include",
};

export const putHeaders = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
};

export const putHeadersCredentials: RequestInit = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

export const deleteHeaders = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
};

export const deleteHeadersCredentials = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

export const patchHeadersCredentials: RequestInit = {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};
