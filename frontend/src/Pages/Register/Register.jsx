import React, { useEffect, useState } from "react";
import styles from "./styles/Register.module.css";

const Register = () => {
    // State to store the fetched username and password data
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = ""; 

        const fetchData = async () => {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            setUsername(data.username);
            setPassword(data.password);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className={styles.displaySection}>
            
            {/* Display the username and password */}
            <div className={styles.textContainer}>
                <input placeholder="Username" className={styles.textEntry} value={username} readOnly />
                <input placeholder="Password" className={styles.textEntry} value={password} readOnly />
            </div>

            <div className={styles.buttonContainer}>
                <button className={styles.Buttonlayout}>Return</button>
                <button className={styles.Buttonlayout}>Register</button>
                <button className={styles.Buttonlayout}>Next</button>
            </div>
        </div>
    );
};

export default Register;
