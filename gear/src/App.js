import logo from './logo.svg';
import { Button, Card, } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button variant="danger" size="lg">
          Whoa Dude
        </Button>
        <Card className='mb-4'>
          <Card.Header>
            Header
          </Card.Header>
          <Card.Body>
            <Card.Title>
              My Title
            </Card.Title>
            Test
          </Card.Body>
        </Card>
        <Card className='mb-4'>
          Test2
        </Card>
        <h6>My Test Change</h6>
      </header>
    </div>
  );
}

export default App;
