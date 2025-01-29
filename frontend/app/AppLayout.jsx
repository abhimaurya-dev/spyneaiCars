"use client";

import NavBar from "@/components/NavBar";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
export default function AppLayout() {
  const { user } = useContext(AuthContext);
  return <>{user && user.loggedIn && <NavBar showProfile={user.loggedIn} />}</>;
}
