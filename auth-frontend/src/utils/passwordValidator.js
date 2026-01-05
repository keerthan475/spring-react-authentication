export const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  if (!/[A-Za-z]/.test(password)) {
    return "Password must contain at least one letter";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character";
  }

  if (/\s/.test(password)) {
    return "Password must not contain spaces";
  }

  return null; // ✅ valid password
};
