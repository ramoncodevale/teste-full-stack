import { useState } from "react";
import { useAuth } from "../contexts/auth-context";
import AuthInput from "../components/auth/auth-input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setUserEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        setToken(data.token);
        setUserEmail(email);
        window.location.href = "/tasks";
      } else {
        alert(data.message);
      }
    } catch {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f5f7] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput id="email" type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <AuthInput id="password" type="password" label="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-sm shadow transition duration-200">
            Entrar
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">
          Não tem uma conta? <a href="/register" className="text-blue-600 hover:underline">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
