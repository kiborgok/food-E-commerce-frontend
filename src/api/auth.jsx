export function loadUser(token) {
  return fetch("http://localhost:5000/me", {
    headers: {
        Authorization: `Bearer ${token}`
      }
    })
}

export function signup(user) {
    return fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
        password_confirmation: user.passwordConfirmation,
      }),
    })
}

export function signin(user) {
  return fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  });
}