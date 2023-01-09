import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import {
  useGetPostsQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from './Features/Api/apiSlice'

function App() {
  const [addNewPost, response] = useAddNewPostMutation()
  const [deletePost] = useDeletePostMutation()

  const [inputField, setInputField] = useState({
    id: '',
    title: '',
    body: '',
  })

  const inputsHandler = (e) => {
    setInputField((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()

  const setPostData = (data) => {
    setInputField({
      id: data.id,
      title: data.title,
      body: data.body,
    })
  }

  const onEditData = () => {
    updatePost({
      id: inputField.id,
      title: inputField.title,
      body: inputField.body,
    })
    setInputField(() => ({
      id: '',
      title: '',
      body: '',
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const { title, body } = e.target.elements
    setInputField((inputField) => ({
      ...inputField,
      [e.target.name]: e.target.value,
    }))
    let formData = {
      title: title.value,
      body: body.value,
    }
    addNewPost(formData)
      .unwrap()
      .then(() => {
        setInputField(() => ({
          id: '',
          title: '',
          body: '',
        }))
      })
      .then((error) => {
        console.log(error)
      })
  }
  const {
    data: posts,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getError,
  } = useGetPostsQuery({ refetchOnMountOrArgChange: true })
  let postContent
  if (isGetLoading) {
    postContent = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  } else if (isGetSuccess) {
    postContent = posts.map((item) => {
      return (
        <div className="col-lg-12 mb-3" key={item.id}>
          <div className="card alert alert-secondary">
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.body}</p>
              <button
                onClick={() => deletePost(item.id)}
                className="btn btn-outline-danger me-2"
              >
                Remove
              </button>
              <button
                onClick={() => setPostData(item)}
                className="btn btn-outline-primary"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )
    })
  } else if (isGetError) {
    postContent = (
      <div className="alert alert-danger" role="alert">
        {getError}
      </div>
    )
  }
  return (
    <div >
      <div className="container">
        <div className="row my-5">
          <div className="col-lg-6">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td><span className='text-danger'>Delete</span> - <span className='text-warning'>Update</span></td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="col-lg-6 ">
            <Form className='d-flex justify-content-start flex-column'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Add User
              </Button>
            </Form>
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
