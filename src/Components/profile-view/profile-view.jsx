import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { MovieCard } from "../MovieCard/movie-card";

export const ProfileView = ({ user, onLogout, movies }) => {
  const [profile, setProfile] = useState(user);
  const [editing, setEditing] = useState(false);
  const [newInfo, setNewInfo] = useState({
    userId: user.userId,
    email: user.email,
    birthDate: user.birthDate,
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.favoriteMovies) return;
    const favoriteMoviesList = movies.filter((m) =>
      user.favoriteMovies.includes(m.id)
    );
    setFavoriteMovies(favoriteMoviesList);
  }, [movies, user]);

  const handleToggleFavorite = (movieId) => {
    const isAlreadyFavorite = user.favoriteMovies.includes(movieId);
    const method = isAlreadyFavorite ? "DELETE" : "POST";

    fetch(
      `https://film-app-f9566a043197.herokuapp.com/users/${user.userId}/favoriteMovies/${movieId}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update favorites");
        }
        return response.json();
      })
      .then((updatedUser) => {
        if (!updatedUser || !updatedUser.favoriteMovies) {
          throw new Error("Updated user data is invalid");
        }

        setProfile(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setFavoriteMovies(
          updatedUser.favoriteMovies.map((movieId) =>
            movies.find((movie) => movie.id === movieId)
          )
        );
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (newInfo.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    fetch(`https://film-app-f9566a043197.herokuapp.com/users/${user.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newInfo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update your profile");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setProfile(data);
        localStorage.setItem("user", JSON.stringify(data));
        setEditing(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  const deleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      setLoading(true);
      const token = localStorage.getItem("token");
      const username = user.userId;

      fetch(`https://film-app-f9566a043197.herokuapp.com/users/${username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete account.");
          }
          return response.json();
        })
        .then(() => {
          setLoading(false);
          onLogout();
          navigate("/login");
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <Card>
          <Card.Body>
            <h2>User Profile</h2>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}
            {!editing ? (
              <>
                <p>
                  <strong>UserId:</strong> {profile.userId}
                </p>
                <p>
                  <strong>Email:</strong> {profile.email}
                </p>
                <p>
                  <strong>BirthDate:</strong>{" "}
                  {new Date(profile.birthDate).toISOString().split("T")[0]}
                </p>

                <h3>Favorite Movies</h3>
                <Row>
                  {favoriteMovies.length > 0 ? (
                    favoriteMovies
                      .filter(
                        (movie, index, self) =>
                          movie &&
                          self.findIndex((m) => m?.id === movie?.id) === index
                      )
                      .map((movie) => (
                        <Col key={movie.id} md={4}>
                          <MovieCard
                            movie={movie}
                            isFavorite
                            onToggleFavorite={handleToggleFavorite}
                          />
                        </Col>
                      ))
                  ) : (
                    <p>You have no favorite movies yet.</p>
                  )}
                </Row>

                <Button variant="primary" onClick={() => setEditing(true)}>
                  Edit Profile
                </Button>
                <Button variant="primary" onClick={deleteAccount}>
                  Delete Account
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Form onSubmit={handleProfileUpdate}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    className="text-white"
                    value={newInfo.userId}
                    onChange={(e) =>
                      setNewInfo({ ...newInfo, userId: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    className="text-white"
                    value={newInfo.email}
                    onChange={(e) =>
                      setNewInfo({ ...newInfo, email: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="birthDate">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    className="text-white"
                    value={newInfo.birthDate}
                    onChange={(e) =>
                      setNewInfo({ ...newInfo, birthDate: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="New password"
                    className="text-white"
                    value={newInfo.password}
                    onChange={(e) =>
                      setNewInfo({ ...newInfo, password: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    className="text-white"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
                <Button variant="primary" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
