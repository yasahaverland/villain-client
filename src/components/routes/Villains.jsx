import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

function Villains() {

  const [villains, setVillains] = useState([])
  const [errMessage, setErrMessage] = useState('')

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
      <div className="name-img_gallery" key={villain._id}>
         <img className="images" src={villain.img_url} alt={villain.name}></img>
        <Link to={`/villains/${villain._id}`}>{villain.name}</Link>
      </div>
    )
  })

    return (
      <div className="Villains">
        <h1>The Villains Gallery: </h1>
        {displayLinks}

        <p>{errMessage}</p>
      </div>
    );
  }
  
  export default Villains;