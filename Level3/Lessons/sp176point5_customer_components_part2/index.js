function Page() {
    return (
        <div>
            <header>
                <nav>
                    <img src="./img/react-logo.png" width="40px" />
                </nav>
            </header>
            <h1>Fun facts about React!</h1>
            <ol>
                <li>First released in 2013.</li>
                <li>Created by Jordan Walke.</li>
                <li>Has over 100K stars on GitHub.</li>
                <li>Maintained by FaceBook.</li>
                <li>It's a popular library.</li>
                <li>Powers thousands of enterprise apps, Including many mobile apps.</li>
            </ol>
            <footer>
                <small>&copy; 2024 Arnold Jones</small>
            </footer>
        </div>
    )
}

ReactDOM.render(<Page />, document.getElementById("root"))