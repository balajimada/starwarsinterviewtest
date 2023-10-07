import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Starships from './components/Starships';
import React, { useEffect, useState, memo, useSyncExternalStore, useMemo } from 'react'
import { getAxios } from './utilities/APIInterface'
import { Spinner, Form, Button, Row, Col } from 'react-bootstrap';
import Layout from './Layout';

{
  /* The following line can be included in your src/index.js or App.js file */
}


function App() {

  const [ships, setships] = useState([])
  const [filterships, setfilterships] = useState([])
  const [showloader, setshowloader] = useState(false)
  const [mostFilmsCount, setmostFilmsCount] = useState(0);
  const [searchkeywords, setsearchkeywords] = useState("")

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
        setfilterships(list)
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

  const onChange = (event) => {
    setsearchkeywords(event.target.value)
  }

  const onClear = () => {
    setsearchkeywords("")
    setfilterships(ships)
  }

  const onSearch = (event) => {
    const list = ships.filter((row) => (row.name.toLowerCase().includes(searchkeywords.toLowerCase()) || row.model.toLowerCase().includes(searchkeywords.toLowerCase())))
    setfilterships(list)

    console.log("searchKeywords: ", searchkeywords)
  }

  return (
    <>
      <Layout> </Layout>
      <div className="App">

        {
          showloader && <Spinner animation="border" style={{ marginLeft: "50%" }} />
        }
        <Form>
          <Row>
            <Col>
              <Form.Control placeholder="Search ship name or model" value={searchkeywords}
                className="searchtextbox" onChange={(event) => onChange(event)} />
            </Col>
            <Col>
              <Button variant="success" onClick={() => onSearch()}>Search</Button>
              &nbsp;
              <Button variant="secondary" onClick={() => onClear()}>Clear</Button>
            </Col>
          </Row>
        </Form>

        <div class="flex-container">
          {filterships && filterships.map((shipItem) =>
            <Starships shipItem={shipItem} mostFilmsCount={mostFilmsCount}></Starships>
          )}

        </div>

      </div>

    </>
  );
}

export default App;
