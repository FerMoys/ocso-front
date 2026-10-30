
"use client";

import { API_URL } from "@/app/constants";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);

      const authData = {
        userEmail: String(formData.get("userEmail") ?? ""),
        userPassword: String(formData.get("userPassword") ?? ""),
      };

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(authData),
      });

      if (!response.ok) {
        const message = await response.text();
        console.error("Error de login:", response.status, message);

        setError(
          `No se pudo iniciar sesión (${response.status}). ${
            message || "Verifica tus credenciales."
          }`
        );
        return;
      }

      console.log("Login exitoso");
      router.push("/dashboard");
    } catch (err) {
      console.error("Error de conexión:", err);
      setError("No fue posible conectar con el servidor.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="bg-[#FFB336] text-white px-10 py-6 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <p className="text-2xl my-4 font-bold text-center">
        Iniciar Sesión
      </p>

      <div className="flex flex-col gap-3 my-4">
        <Input
          label="Email"
          name="userEmail"
          type="email"
          isRequired
          size="sm"
        />

        <Input
          label="Contraseña"
          name="userPassword"
          type="password"
          isRequired
          size="sm"
        />
      </div>

      {error && (
        <p className="text-sm text-red-700 mb-3" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col items-center gap-2">
        <Button
          type="submit"
          isDisabled={submitting}
          isLoading={submitting}
          className="bg-[#F74C39] text-white font-semibold w-full"
        >
          {submitting ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>

        <p className="text-sm my-4">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/signup"
            className="underline font-semibold text-blue-600"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </form>
  );
}
