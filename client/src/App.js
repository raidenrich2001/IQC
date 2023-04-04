
import {Routes ,Route} from 'react-router-dom';
import User from "./components/User";
import Manager from "./components/Manager";
import Edit from "./components/Edit";
import Viewer from './components/Viewer';

function App() {
  return (
<>
<Routes>
<Route path='/' element ={<User></User>}></Route>
<Route path='/viewIQC' element ={<Manager></Manager>}></Route>
<Route path='/editIQC/:id/:filename' element ={<Edit></Edit>}></Route>
<Route path='/Viewer/:filename' element ={<Viewer></Viewer>}></Route>
{/* <Route path='/task/:id/:department' element ={<Task></Task>}></Route>
<Route path='/addtask/:id/:department' element ={<Addtask></Addtask>}></Route>
<Route path='/view/:empid' element ={<View></View>}></Route>
<Route path='/edit/:empid/:id' element ={<Edit></Edit>}></Route>
<Route path='/progress/:empid' element ={<Progress></Progress>}></Route>
<Route path='/admin' element ={<Admin></Admin>}></Route>
<Route path='/views/:department' element ={<Departments></Departments>}></Route> */}
</Routes>
</>
  );
}

export default App;
