
"use server";

import { API_URL } from "@/app/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function updateLocation(
  formData: FormData
): Promise<void> {
  const locationId = formData.get("locationId");

  if (typeof locationId !== "string" || !locationId.trim()) {
    throw new Error("No se especificó la tienda que se desea actualizar.");
  }

  const location: Record<string, string | number[]> = {};
  const locationLatLng = [0, 0];

  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string" || value.trim() === "") {
      continue;
    }

    if (key === "locationId") {
      continue;
    } else if (key === "locationLat") {
      locationLatLng[0] = Number(value);
    } else if (key === "locationLng") {
      locationLatLng[1] = Number(value);
    } else {
      location[key] = value;
    }
  }

  location.locationLatLng = locationLatLng;

  const response = await fetch(
    `${API_URL}/locations/${encodeURIComponent(locationId)}`,
    {
      method: "PATCH",
      body: JSON.stringify(location),
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();

    throw new Error(
      `No se pudo actualizar la tienda (${response.status}): ${errorMessage}`
    );
  }

  revalidateTag("dashboard:locations");
  revalidateTag("dashboard:managers");

  redirect(
    `/dashboard?store=${encodeURIComponent(locationId)}`
  );
}
