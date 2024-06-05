import PropTypes from 'prop-types';
import TaskItem from '../TaskItem';

const TaskList = ({ tasks, onToggle, onDelete }) => {
    if (!tasks || !Array.isArray(tasks)) {
        tasks = [];
    }

    return (
        <ul>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))
            ) : (
                <li className="text-gray-500">No tasks available</li>
            )}
        </ul>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TaskList;
