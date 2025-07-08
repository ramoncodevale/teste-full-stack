import { useState } from "react";
import AuthInput from "../components/auth/auth-input";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      response.ok ? window.location.href = "/" : alert(data.message || "Erro ao cadastrar");
    } catch {
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f5f7] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">Cadastro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput id="name" type="text" label="Nome" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome completo" />
          <AuthInput id="email" type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seuemail@email.com" />
          <AuthInput id="password" type="password" label="Senha" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-sm shadow transition duration-200">
            Cadastrar
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">
          Já tem uma conta? <a href="/" className="text-blue-600 hover:underline">Faça login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
