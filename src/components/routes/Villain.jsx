import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

function Villain() {

  const [villain, setVillain] = useState({})
  const [errMessage, setErrMessage] = useState('')
  // let villain = {}

  // the id from the params comes like an object so we have to deconstruct to get the id itself!
  const { id } = useParams()
  const navigate = useNavigate()
  
  // fetch data for a single villain
  useEffect(() => {
    const getVillain = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/villains/${id}`)
        // villain = response.data.oneVillain
        setVillain(response.data.oneVillain)
        console.log(response.data.oneVillain)
      } catch(err) {
        console.warn(err)
        if(err.response) {
          setErrMessage(err.response.data.message)
        }
      }
    }
    getVillain()
  }, [])

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/villains/${id}`)
      navigate('/villains')
    } catch(err) {
      console.warn(err)
      if (err.response) {
        setErrMessage(err.response.data.message)
      }
    }
  }

  return (
      <div className="Villain">
        <p>{errMessage}</p>

        <h1>Villain Profile</h1>

      
          <h2>{villain.name}</h2>
          <p>Wanted for: {villain.wantedFor}</p>
          <p>Client: {villain.client}</p>
          <p>Reward: {villain && villain.reward}</p>
          <p>Last Seen: {villain && villain.lastSeen}</p>
           <p>{villain && villain.captured ? 'IN CUSTODY' : 'WANTED'}</p>
    
       
        <div className="edit-delete">
          <Link to={`/villains/${id}/edit`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </div>

      </div>

    )
  }
  
  export default Villain;