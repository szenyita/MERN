import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import {useState} from 'react'

const WorkoutForm = () => {

    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        const workout = {title, load, reps}

        fetch('/api/workouts', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(workout)
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => {
                            dispatch({type: 'CREATE_WORKOUT', payload: data})
                            setTitle('')
                            setLoad('')
                            setReps('')
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={handleSubmit} className="create">
            <h4>Add a New Workout</h4>
            <label>Title:</label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)} />
            <label>Load:</label>
            <input type="number" required value={load} onChange={e => setLoad(e.target.value)} />
            <label>Reps:</label>
            <input type="number" required value={reps} onChange={e => setReps(e.target.value)} />
            <button>Add Workout</button>
        </form>
    )
}
 
export default WorkoutForm