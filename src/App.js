import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import { Accordion, ButtonGroup, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import Start from './pages/Start';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Start />}>
      </Route>
      <Route path="/register/:token" element={<Register/>}>
      </Route>
    </Routes>
  </BrowserRouter>

  );
}

export default App;
