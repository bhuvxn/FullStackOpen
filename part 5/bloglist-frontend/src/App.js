import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, SetUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);


  const handleLogin = (event) => {
    event.preventDefault();

    try{
      const user = loginService.login({
        username, password,
      });
      SetUser(user);
      setUsername("");
      setPassword("");
    }
    catch (exception) {
      setErrorMessage("Wrong credentials");

      setTimeout(() => {
        setErrorMessage(null);
      }
      , 5000);
    }
  };

  const blogForm = ()=>{
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text" 
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input

            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  );
  return (
    <div>
      <h2>blogs</h2>
      {user === null ?
      loginForm() :
      blogForm() }
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
