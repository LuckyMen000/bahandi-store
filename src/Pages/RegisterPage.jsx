import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register({ setIsAuth }) {
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

  const handleRegister = async () => {
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }

    if (password.length < 6) {
      setError("Пароль минимум 6 символов");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(
        "https://4bd84f8eea8b152e.mokky.dev/register",
        { email, password }
      );

      const loginRes = await axios.post(
        "https://4bd84f8eea8b152e.mokky.dev/auth",
        { email, password }
      );

      localStorage.setItem("token", loginRes.data.token);

      if (setIsAuth) {
        setIsAuth(true);
      }

      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Ошибка регистрации"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth-box">
        <h2>Регистрация</h2>

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

        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Создание..." : "Создать аккаунт"}
        </button>

        <div className="auth-link">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;