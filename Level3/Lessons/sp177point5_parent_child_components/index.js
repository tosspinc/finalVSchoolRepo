function Header() {
    return (
        <header>
            <nav>
                <img src="./imgs/react-logo.png" width="40px" />
            </nav>
        </header>
    )
}

function Footer() {
    return (
        <footer>
            <small>&copy; 2024 Arnold Jones. All rights reserved.</small>
        </footer>
    )
}

function MainContent() {
    return (
        <div>
            <h1>Fun facts about React!</h1>
            <ol>
                <li>First released in 2013.</li>
                <li>Created by Jordan Walke.</li>
                <li>Has over 100K stars on GitHub.</li>
                <li>Maintained by FaceBook.</li>
                <li>It's a popular library.</li>
                <li>Powers thousands of enterprise apps, Including many mobile apps.</li>
            </ol>
        </div>
    )
}

function Page() {
    return(
        <div>
           <Header />
           <MainContent />
           <Footer />
        </div>
    )
}

ReactDOM.render(<Page />, document.getElementById("root"))