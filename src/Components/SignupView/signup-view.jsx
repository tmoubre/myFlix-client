import { useState } from "react";

export const SignupView = () => {
    const [userId, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthday] = useState("");

    const handleSubmit = (event) => { };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                UserId:
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Birthday:
                <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};
