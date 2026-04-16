import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && setIsAuth) {
      setIsAuth(true);
      navigate("/");
    }
  }, [navigate, setIsAuth]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "https://4bd84f8eea8b152e.mokky.dev/auth",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);

      if (setIsAuth) {
        setIsAuth(true);
      }

      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Ошибка входа"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth-box">
        <h2>Вход</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="auth-error">{error}</div>}

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Загрузка..." : "Войти"}
        </button>

        <div className="auth-link">
          Нет аккаунта? <Link to="/register">Регистрация</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;