
import { TOKEN_NAME } from "@/app/constants";
import { cookies } from "next/headers";
import { cache } from "react";

export const authHeaders = cache(() => {
  const cookieValue = cookies().get(TOKEN_NAME)?.value;

  if (!cookieValue) {
    throw new Error("No se encontró la sesión. Inicia sesión nuevamente.");
  }

  try {
    const value = cookieValue.startsWith("j:")
      ? cookieValue.slice(2)
      : cookieValue;

    const session = JSON.parse(value);

    if (!session.token) {
      throw new Error("La sesión no contiene un token válido.");
    }

    return {
      Authorization: `Bearer ${session.token}`,
    };
  } catch (error) {
    if (error instanceof Error &&
        error.message === "La sesión no contiene un token válido.") {
      throw error;
    }

    throw new Error("La cookie de sesión tiene un formato inválido.");
  }
});
