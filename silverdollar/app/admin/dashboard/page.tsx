"use client";

import { logout } from "../components/logout";

export default function Dashboard() {
  return (
    <div>
      <div>
      <h1>Admin Dashboard</h1>
        <p>Welcome {}</p>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  )
}