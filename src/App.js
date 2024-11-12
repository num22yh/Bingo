import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bingo from './bingo/bingo';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Bingo />} />
      </Routes>
    </Router>
  );
}

export default App;
