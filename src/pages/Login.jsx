import urlcat from "urlcat";

const SERVER = import.meta.env.VITE_SERVER;
const url = urlcat(SERVER, "/login");

function Login({ setToken }) {
  const handleLogin = async (event) => {
    event.preventDefault();

    const elements = event.target.elements;
    const user = {
      username: elements.username.value,
      password: elements.password.value,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json(user);
    setToken(data.token);
    console.log("response %o", data);
  };

  return (
    <form onSubmit={handleLogin}>
      <fieldset>
        <legend>Login</legend>
        <label>
          Username:
          <input name="username" defaultValue="admin" />
        </label>
        <br />
        <label>
          Password:
          <input name="password" type="password" />
        </label>
      </fieldset>
      <button>Login</button>
    </form>
  );
}

export default Login;
