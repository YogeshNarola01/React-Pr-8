import {BrowserRouter,Routes,Route} from "react-router-dom"
import Add from "./pages/Add";
import View from "./pages/View";
import Edit from "./pages/Edit";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Add/>}></Route>
          <Route path="/View" element={<View />}></Route>
          <Route path="/edit" element={<Edit />}></Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
