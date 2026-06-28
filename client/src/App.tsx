import { PostList } from './components/PostList'
import { CreatePostForm } from './components/CreatePostForm'
import './App.css'

function App() {
  return (
    <div>
      <header className="app-header">
        <h1>GraphQL Blog</h1>
        <p>Built with Apollo Server + Apollo Client</p>
      </header>
      <CreatePostForm />
      <PostList />
    </div>
  )
}

export default App
