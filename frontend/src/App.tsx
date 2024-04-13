import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import JobsPosted from './views/JobsPosted'
import Talents from './views/Talents'
import Applications from './views/Applications'
import UploadJobs from './views/UploadJobs'
import Signin from './views/Signin'
import Signup from './views/Signup'
import ForgotPassword from './views/forgot-password'
import ResetPassword from './views/reset-password'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
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