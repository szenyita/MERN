import { useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

const Home = () => {

    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(() => {
        fetch('/api/workouts')
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => dispatch({type: 'SET_WORKOUTS', payload: data}))
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }, [dispatch])

    return (
        <div className="home">
            <div className="workout">
                {workouts && workouts.map(workout => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}
 
export default Home