import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((email, password)) login(email, password);
    // when click button for the first time, nex line is not working
    // because in first render, isAuthenticated is false and when login is called,
    // reducer is'nt working immediately and still isAuthenticated is false 
    // but if use useEffect for this situation, in first render isAuthenticated
    // is false and callback function don't call. then when isAuthenticated is true,
    // callback function call and navigate 
    // if (isAuthenticated) navigate("/app");
  };

  useEffect(() => {
    if(isAuthenticated) navigate('/app', {replace: true})
  }, [isAuthenticated, navigate])

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
