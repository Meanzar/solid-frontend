"use client";
import { checkSession } from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {

      console.log("Verifying session...");
      const session = await checkSession();
      console.log("Session:", session);

      if (!session) {
        router.push("/auth/login");
        return;
      }
      
      setIsAuthenticated(true);
    };

    verifySession();
  }, []); // Aucune dépendance requise
  console.log('jij')
  if (isAuthenticated === null) {
    return <div>You need to connect...</div>; // Évite un affichage inutile si la session est en cours de vérification
  }

  return <>{children}</>; // Affichage du contenu si l'utilisateur est authentifié
}
