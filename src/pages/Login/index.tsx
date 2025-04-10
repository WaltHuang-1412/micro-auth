import React from "react";

export default function Login() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>登入頁</h2>
      <input type="email" placeholder="Email" />
      <br />
      <input type="password" placeholder="Password" />
      <br />
      <button>登入</button>
    </div>
  );
}
