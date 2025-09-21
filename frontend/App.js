const App = () => {
    const [comment, setComment] = React.useState("");
    const [apiResponse, setApiResponse] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmitComment = () => {
        setIsLoading(true);
        setApiResponse("");
        const apiUrl = `${config.API_BASE_URL}/api/submit-comment`;
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: comment }),
        })
            .then((res) => res.json())
            .then((data) => {
                setApiResponse(data.message);
                setComment(""); // Clear comment box on success
            })
            .catch((err) => {
                console.error(err);
                setApiResponse("Error submitting comment.");
            })
            .finally(() => setIsLoading(false));
    };

    const handleGenerateCanned = () => {
        setIsLoading(true);
        setApiResponse("");
        const apiUrl = `${config.API_BASE_URL}/api/canned-response`;
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setComment(data.message)) // Populate comment box
            .catch((err) => {
                console.error(err);
                setApiResponse("Error fetching canned response.");
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <div>
            <h1>Comment Page</h1>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
                rows="4"
                cols="50"
                style={{ display: 'block', marginBottom: '10px' }}
            />
            <button onClick={handleSubmitComment} disabled={isLoading || !comment}>
                {isLoading ? 'Submitting...' : 'Submit Comment'}
            </button>
            <button onClick={handleGenerateCanned} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Canned Response'}
            </button>
            {apiResponse && <p style={{ marginTop: '10px' }}>{apiResponse}</p>}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
