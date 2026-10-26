
"use server";

import { API_URL, TOKEN_NAME } from "@/app/constants";
import { cookies } from "next/headers";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export async function createLocation(formData: FormData): Promise<void> {


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

  const response = await fetch(`${API_URL}/locations`, {
      method: 'POST',
      body: JSON.stringify(location, locationLatLng),
      headers: {
          ...authHeaders()
      }
    }
  );
  if (response.status === 201) revalidateTag("dashboard:locations");
}
