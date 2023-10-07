import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Starships from './components/Starships';
import React, { useEffect, useState, memo, useSyncExternalStore, useMemo } from 'react'
import { getAxios } from './utilities/APIInterface'
import { Spinner } from 'react-bootstrap';
import Layout from './Layout';

{
  /* The following line can be included in your src/index.js or App.js file */
}


function App() {

  const [ships, setships] = useState([])
  const [showloader, setshowloader] = useState(false)
  const [mostFilmsCount, setmostFilmsCount] = useState(0);

  useEffect(() => {

    setshowloader(true)
    loadStartShips()
  }, [])


  const loadStartShips = () => {
    getAxios("/starships").then((result) => {
      if (result && result.data) {
        console.log("result.data: ", result.data)

        const list = result.data.results;
        list.sort(function (a, b) {
          if (a.crew < b.crew) {
            return -1;
          }
          if (a.crew > b.crew) {
            return 1;
          }
          return 0;
        });

        setships(list)
        setmostFilmsCount(calculateMostAppearedFilms(list)) 
        setshowloader(false)
      }
    }).catch(ex => {
      setshowloader(false)
    })
  }

  const calculateMostAppearedFilms = (list) => {

    return Math.max(...list.map(row => row.films.length));
  }

  return (
    <>
    <Layout> </Layout>
    <div className="App">

      {
        showloader && <Spinner animation="border" style={{marginLeft:"50%" }} />
      }
      <div class="flex-container">
        {ships && ships.map((shipItem) =>
          <Starships shipItem={shipItem} mostFilmsCount={mostFilmsCount}></Starships>
        )}

      </div>

    </div>
   
    </>
  );
}

export default App;
