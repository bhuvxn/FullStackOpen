import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [Message, setMessage] = useState(null) 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const [LoginVisible, setLoginVisible] = useState(false)
  const handleLogin = async (event)=>{
    event.preventDefault()
    try{
      
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      setUsername('')
      setPassword('')
      if(user){
        setMessage('logged in successfully')
        setTimeout(()=>{
          setMessage(null)
        }, 5000)
      }
    } catch(error){
      console.log('cant login')
      console.log(error)
      if (user===null){
        setMessage('wrong credentials')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  
  }
  const Notification = ({message}) =>{

    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )

  }

  const loginForm = () => {

    const hideWhenVisible = { display: LoginVisible ? 'none' : '' }
    const showWhenVisible = { display: LoginVisible ? '' : 'none' }
    return(
    <div>
    <div style = {hideWhenVisible}>
      <button onClick = {()=> setLoginVisible(true)}>login </button>
    </div>
    <div style ={showWhenVisible}>Login

        <Login
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />        
        <button onClick={() => setLoginVisible(false)}>cancel</button>
  
    </div>
    </div>
  )
  }
  const loggedin = ()=>{
    return(
      <div>
        <h1>{user.username} logged in</h1>
      </div>
    )
  }

  const blogforms = ()=>{
    return (
      <form>
      <div>
        title:
        <input type = "text" /> 
      </div>
      <div> 
       author:
       <input type = "text"/>
      </div>
      <div> 
        url: 
        <input type = "text"/>
      </div>
      <button>post blog</button>
      </form>
    )
  }
  return (
    <div>
      <Notification message={Message}/>
      <h2>blogs</h2>
      {user === null && loginForm()}, 
      {user !==null && loggedin()},
      {user !==null && blogforms()}
      { 
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App