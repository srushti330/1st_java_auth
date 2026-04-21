import { Container, Card, Row, Col, Button, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Dashboard Component
 * Protected page that displays user information after successful login
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Authentication System</Navbar.Brand>
          <Navbar.Text className="ms-auto">
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Text>
        </Container>
      </Navbar>

      {/* Dashboard Content */}
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Header as="h5" className="bg-primary text-white">
                Welcome to Dashboard
              </Card.Header>
              <Card.Body>
                <h4>Hello, {user?.name}!</h4>
                <p className="text-muted">You have successfully logged in.</p>
                
                <hr />
                
                <h5>Your Profile Information:</h5>
                <Card className="mt-3">
                  <Card.Body>
                    <Row>
                      <Col sm={4} className="fw-bold">
                        User ID:
                      </Col>
                      <Col sm={8}>{user?.id}</Col>
                    </Row>
                    <Row className="mt-2">
                      <Col sm={4} className="fw-bold">
                        Name:
                      </Col>
                      <Col sm={8}>{user?.name}</Col>
                    </Row>
                    <Row className="mt-2">
                      <Col sm={4} className="fw-bold">
                        Email:
                      </Col>
                      <Col sm={8}>{user?.email}</Col>
                    </Row>
                  </Card.Body>
                </Card>

                <div className="mt-4">
                  <h5>JWT Token Status:</h5>
                  <p className="text-success">
                    ✓ Valid token stored in localStorage
                  </p>
                  <p className="text-muted small">
                    The token is automatically included in the Authorization header
                    for all API requests to protected endpoints.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
