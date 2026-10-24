
"use server";

import { API_URL, TOKEN_NAME } from "@/app/constants";
import axios from "axios";
import { cookies } from "next/headers";

export async function createLocation(formData: FormData): Promise<void> {
  const token = cookies().get(TOKEN_NAME)?.value;

  if (!token) {
    throw new Error("No se encontró la sesión. Inicia sesión nuevamente.");
  }

  const location: Record<string, string> = {};
  const locationLatLng = [0, 0];

  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string" || value.trim() === "") {
      continue;
    }

    if (key === "locationLat") {
      locationLatLng[0] = Number(value);
    } else if (key === "locationLng") {
      locationLatLng[1] = Number(value);
    } else {
      location[key] = value;
    }
  }

  await axios.post(
    `${API_URL}/locations`,
    {
      ...location,
      locationLatLng,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
