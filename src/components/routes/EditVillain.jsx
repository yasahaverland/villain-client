import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

function EditVillain() {

  const [form, setForm] = useState({

    img_url: '',
    name: '',
    wantedFor:'',
    client:'',
    reward: 0,
    lastSeen: '',
})

const { id } = useParams()
const navigate = useNavigate()

const [errMessage, setErrMessage] = useState('')

useEffect(() => {
  const getVillain = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/villains/${id}`)
      setForm(response.data)
    } catch(err) {
      console.warn(err)
      if(err.response) {
        setErrMessage(err.response.data.message)
      }
    }
  }
  getVillain()
}, [])

const handleSubmit = async e => {
  try{
      e.preventDefault()
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/villains/${id}`, form)
      navigate(`/villains/${id}`)
  }catch(err){
      console.warn(err)
      if(err.response) {
          setErrMessage(err.response.data.message)
      }
  }
}

  return (
      <div className="EditVillain">
        <h1>Edit Villain Profile</h1>
        <div className="form-div">
            <form className="form-class" onSubmit={handleSubmit}>
              <input type='text' id='img_url' value={form.img_url} placeholder='Paste here an img url of this villain...' onChange={e => setForm({...form, img_url: e.target.value})} />
              <input type='text' id='name' value={form.name} placeholder='Villain name...' onChange={e => setForm({...form, name: e.target.value})} />
              <input type='text' id='wantedFor' value={form.wantedFor} placeholder='Enter their crimes here...' onChange={e => setForm({...form, wantedFor: e.target.value})} />
              <input type='text' id='client' value={form.client} placeholder='Clients name' onChange={e => setForm({...form, client: e.target.value})} />
              <input type='number' id='reward' value={form.reward} placeholder='Enter the reward here...' onChange={e => setForm({...form, reward: e.target.value})} />
              <input type='text' id='lastSeen' value={form.lastSeen} placeholder='Last seen...' onChange={e => setForm({...form, lastSeen: e.target.value})} />

              <button type='submit'>Submit</button>
            </form>
            <Link to={`/villains/${id}`}>Go backs</Link>
        </div>
      </div>
    )

}
  
  export default EditVillain;