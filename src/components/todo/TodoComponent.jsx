import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment/moment"


export default function TodoComponent() {

    const { id } = useParams()

    const authContext = useAuth()
    const navigate = useNavigate()

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

    function retrieveTodoDetails() {
        if (id != -1) {
            retrieveTodoApi(authContext.username, id)
                .then((response) => {
                    console.log(response.data);

                    const data = response.data

                    setDescription(data.description)
                    setTargetDate(data.targetDate)
                })
                .catch((error) => console.log(error));
        }
    }


    useEffect(
        () => retrieveTodoDetails, [id]
    )

    function submitData(values) {
        console.log(values);
        const todo = {
            id: id,
            username: authContext.username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        if (id == -1) {
            createTodoApi(authContext.username, todo)
                .then((response) => {
                    console.log(response)
                    navigate('/todos')
                })
                .catch((error) => console.log(error))
        }
        else {
            updateTodoApi(authContext.username, id, todo)
                .then((response) => {
                    console.log(response)
                    navigate('/todos')
                })
                .catch((error) => console.log(error))
        }
    }

    function doValidate(values) {
        console.log(values);
        let errors = {
            // description: 'Enter a valid description.',
            // targetDate: 'Enter a valid date'
        }
        if (values.description.length < 5) {
            errors.description = 'Enter atleast of 5 characters'
        }

        if (values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a target date.'
        }

        return errors
    }

    return (
        <div className="TodoComponent">
            <div className="container">
                <h1>Enter Todo details</h1>
                <div>

                    <Formik
                        initialValues={{ description, targetDate }}
                        enableReinitialize={true}
                        onSubmit={submitData}
                        validate={doValidate}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {
                            (props) => (
                                <Form>

                                    <ErrorMessage
                                        component={'div'}
                                        name="description"
                                        className="alert alert-warning" />

                                    <ErrorMessage
                                        component={'div'}
                                        name="targetDate"
                                        className="alert alert-warning" />

                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field type="text" className="form-control" name="description"></Field>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field type="date" className="form-control" name="targetDate"></Field>
                                    </fieldset>

                                    <div className="m-5">
                                        <button type="submit" className="btn btn-success">Save</button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        </div>
    )
}