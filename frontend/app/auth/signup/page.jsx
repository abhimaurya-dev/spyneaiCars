"use client";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/utils/fetchApi";

// export default function LoginPage() {
//   const { login } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(email, password);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <form
//         className="p-6 bg-white rounded-lg shadow-lg"
//         onSubmit={handleSubmit}
//       >
//         <input
//           type="email"
//           placeholder="Email"
//           className="block mb-3 p-2 border"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="block mb-3 p-2 border"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name,
        email,
        password,
      };
      const res = await fetchApi("/auth/register", body, "POST");
      if (res.success === true) {
        router.push("/auth/login");
      }
    } catch (error) {
      alert("Signup failed.");
    }
  };

  const handleMoveToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div className="min-h-[90vh] bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-md shadow-lg bg-base-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-4">
          Create new account
        </h1>
        <p className="text-center mb-6">Please enter your credentials</p>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}
          <div className="form-control">
            <button type="submit" className="btn btn-primary w-full">
              Signup
            </button>
          </div>
        </form>
        <div className="mt-2 flex justify-center">
          Already have and account? &nbsp;
          <span>
            <button onClick={handleMoveToLogin} className="text-primary">
              Login
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
