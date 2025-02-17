"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegistrationForm = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const fname = formData.get("fname");
    const lname = formData.get("lname");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!fname || !lname || !email || !password) {
      setError("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fname, lname, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed. Please try again.");
        return;
      }

      router.push("/login");
    } catch (error) {
      setError(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="login-form">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          name="fname"
          id="fname"
          placeholder="Enter your first name"
          required
        />
      </div>

      <div>
        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          name="lname"
          id="lname"
          placeholder="Enter your last name"
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email address"
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <button
        type="submit"
        className="btn-primary w-full mt-4"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
};

export default RegistrationForm;
