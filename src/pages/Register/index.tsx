import React from "react";

export default function Register() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>註冊頁</h2>
      <input type="email" placeholder="Email" />
      <br />
      <input type="password" placeholder="Password" />
      <br />
      <input type="password" placeholder="再次輸入密碼" />
      <br />
      <button>註冊</button>
    </div>
  );
}
