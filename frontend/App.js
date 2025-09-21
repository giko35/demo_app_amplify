const App = () => {
    const [message, setMessage] = React.useState("");

    const fetchMessage = () => {
        setMessage("Loading...");
        fetch("/api/hello")
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch((err) => {
                console.error(err);
                setMessage("Error fetching data from the backend.");
            });
    };

    return (
        <div>
            <h1>Hello from React!</h1>
            <button onClick={fetchMessage}>Get Message from Backend</button>
            {message && <p>Message from backend: {message}</p>}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
