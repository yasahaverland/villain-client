import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NavBar from './components/partials/NavBar'
import Home from './components/routes/Home'
import Villain from './components/routes/Villain'
import Villains from './components/routes/Villains'
import NewVillain from './components/routes/NewVillain'
import EditVillain from './components/routes/EditVillain'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/villains' element={<Villains />}></Route>
          <Route path='/villains/:id' element={<Villain />}></Route>
          <Route path='/villains/new' element={<NewVillain />}></Route>
          <Route path='/villains/:id/edit' element={<EditVillain />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
