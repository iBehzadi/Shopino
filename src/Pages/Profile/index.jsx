import React from "react";
import { useAuthStore } from "../../Store/authStore";
export default function Profile() {
  const { user } = useAuthStore();
  console.log(user)
  return (
    <div className="flex items-center justify-center h-screen">Profile</div>
  );
}
