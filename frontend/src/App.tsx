import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './home/home'
import Layout from './Layout'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/jobs' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App