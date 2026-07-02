import { PostList } from './components/PostList'
import { CreatePostForm } from './components/CreatePostForm'
import { ThemeToggle } from './components/ThemeToggle'
import './App.css'

function App() {
  return (
    <div>
      <header className="app-header">
        <div className="header-row">
          <h1>GraphQL Blog</h1>
          <ThemeToggle />
        </div>
        <p>Built with Apollo Server + Apollo Client</p>
      </header>
      <CreatePostForm />
      <PostList />
    </div>
  )
}

export default App
