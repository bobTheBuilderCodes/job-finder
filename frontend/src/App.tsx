import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Layout from './Layout'
import JobsPosted from './views/JobsPosted'
import Talents from './views/Talents'
import Applications from './views/Applications'
import UploadJobs from './views/UploadJobs'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/jobs' element={<JobsPosted />} />
        <Route path='/talents' element={<Talents />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/upload-jobs' element={<UploadJobs />} />
        {/* <Route path='/*' element={<Home />} /> */}
      </Routes>
    </Router>
  )
}

export default App