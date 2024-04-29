import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

const WorkoutDetails = ({workout}) => {

    const {dispatch} = useWorkoutsContext()

    const handleDelete = () => {
        fetch(`/api/workouts/${workout._id}`, {method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => dispatch({type: 'DELETE_WORKOUT', payload: data}))
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleDelete} >Delete</span>
        </div>
    )
}
 
export default WorkoutDetails