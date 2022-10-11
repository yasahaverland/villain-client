import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

function Home() {
    // set data from backend
    const [villains, setVillains] = useState([])
    // state for messages from the backend
    const [errMessage, setErrMessage] = useState('')

    // check if API will respond
    console.log('SERVER URL', process.env.REACT_APP_SERVER_URL)

    // fech api data
    useEffect(() => {
      const getVillains = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/villains`)
          console.log('RESPONSE DATA',response.data)
          setVillains(response.data)
        } catch(err) {
          console.warn(err)
          if(err.response) {
            // ask more clarification on this in class -- where this 'message comes from? why response.data?'
            setErrMessage(err.response.data.message)
          }
        }
      }
      getVillains()
    }, [])

    const displayLinks = villains.map(villain => {
      return (
        // after map the "mapping" result needs a special unique key! 
        // the id has an _ bc thats how they are called in mongoles
        <div className="name-img" key={villain._id}>
          <img className="images" src={villain.img_url} alt={villain.name}></img>
          <Link className='links' to={`/villains/${villain._id}`}>{villain.name}</Link>
        </div>
      )
    })
    return (
      <div className="Home">
        <h1>Welcome to the Wanted Villains app!</h1>
        <p>Here you can find the most wanted villains of all Kingdomds and Multiverse</p>

        <h2>Most recent villains</h2>

        {displayLinks}

        <p>{errMessage}</p>
      </div>
    );
  }
  
  export default Home;