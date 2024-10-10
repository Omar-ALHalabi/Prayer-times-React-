import './App.css';

import MainContent from './Components/MainComponent.js'
//mui
import Container from '@mui/material/Container';

function App() {
    return (
        <div className="App" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent:'center' }}>

            <Container maxWidth="xg"  >
              <MainContent />
            </Container>
           

          
    </div>
  );
}

export default App;
