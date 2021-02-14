import logo from './logo.svg';
import './App.scss';
import Map from './City/CityMap'


function App() {
  return (
    <div className="pcoded-wrapper">
      <div className="pcoded-content">
        <div className="pcoded-inner-content">
          <div className="App">
            <div>
              <Map />
            </div>
          </div>
        </div>
      </div>
    </div >

  );
}

export default App;
