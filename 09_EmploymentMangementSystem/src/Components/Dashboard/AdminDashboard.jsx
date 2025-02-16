import {} from 'react'
import PropTypes from 'prop-types'
import Header from '../Other/Header'
import CreateTask from '../Other/CreateTask'
import AllTask from '../Other/AllTask'

const AdminDashboard = (props) => {
    return (
        <div className='h-screen w-full p-7'>
            <Header changeUser={props.changeUser} />
            <CreateTask />
            <AllTask />
        </div>
    )
}
AdminDashboard.propTypes = {
    changeUser: PropTypes.func.isRequired,
}

export default AdminDashboard
