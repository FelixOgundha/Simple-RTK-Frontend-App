import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function App() {
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
