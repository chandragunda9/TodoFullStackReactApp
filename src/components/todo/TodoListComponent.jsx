export default function TodosComponent() {

    const today = new Date()

    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())

    const todos = [{
        id: 1,
        description: 'Learn AWS',
        done: false,
        targetDate: targetDate
    }, {
        id: 2,
        description: 'Learn Spring',
        done: false,
        targetDate: targetDate
    }, {
        id: 3,
        description: 'Learn Docker',
        done: false,
        targetDate: targetDate
    },
    {
        id: 4,
        description: 'Learn DSA',
        done: false,
        targetDate: targetDate
    }]

    return (
        <div className='container'>
            <h1>Things to do!</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Target Date</th>
                        <th>Is Completed?</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.targetDate.toDateString()}</td>
                                    <td>{todo.done.toString()}</td>
                                </tr>
                            )
                        )
                    }


                </tbody>
            </table>
        </div>
    )
}