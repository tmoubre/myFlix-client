import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
    const [userId, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthday] = useState("");

    const handleSubmit = (event) => { 
        event.preventDefault();
        const data = {
            userId: userId,
            password: password,
            email: email,
            birthDate: birthDate
          };

          fetch("https://film-app-f9566a043197.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
          }).then((response) => {
            if (response.ok) {
              alert("Signup successful");
              window.location.reload();
            } else {
              alert("Signup failed");
            }
          });
        };

        return (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="signUpFormuserId">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={userId}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="3"
                  style={{color:"white"}}
                />
              </Form.Group>
        
              <Form.Group controlId="signUpFormPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{color:"white"}}
                />
              </Form.Group>
              <Form.Group controlId="signUpFormEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{color:"white"}}
                />
              </Form.Group>
              <Form.Group controlId="signUpFormBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                  style={{color:"white"}}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          );
        };