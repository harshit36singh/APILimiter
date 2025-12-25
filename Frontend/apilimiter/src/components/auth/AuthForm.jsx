import React from "react";
import { Eye, EyeOff } from "lucide-react";

const AuthForm = ({
  authMode,
  showPassword,
  setShowPassword,
  formData,
  setFormData,
  onSubmit,
}) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="auth-form">
      <h1 className="form-title">
        {authMode === "login" ? "Sign In" : "Create Account"}
      </h1>

      {/* Social Container */}
      <div className="social-container">
        <a href="#" className="social" aria-label="Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="social" aria-label="Google">
          <i className="fab fa-google-plus-g"></i>
        </a>
        <a href="#" className="social" aria-label="LinkedIn">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>

      <span className="form-span">
        {authMode === "login" ? "or use your account" : "or use your email for registration"}
      </span>

      {/* USERNAME FIELD */}
      <input
        type="text"
        value={formData.username || ""}
        onChange={(e) =>
          setFormData({ ...formData, username: e.target.value })
        }
        placeholder={authMode === "login" ? "Username" : "Name"}
        required
      />

      {/* EMAIL FIELD (Register Only) */}
      {authMode === "register" && (
        <input
          type="email"
          value={formData.email || ""}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          placeholder="Email"
          required
        />
      )}

      {/* PASSWORD FIELD */}
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          value={formData.password || ""}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Password"
          required
          minLength={5}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle"
        >
          {showPassword ? (
            <EyeOff className="eye-icon" />
          ) : (
            <Eye className="eye-icon" />
          )}
        </button>
      </div>

      {/* Forgot Password - Login Only */}
      {authMode === "login" && (
        <a href="#" className="forgot-password">Forgot your password?</a>
      )}

      {/* SUBMIT BUTTON */}
      <button type="submit" className="submit-button">
        {authMode === "login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default AuthForm;