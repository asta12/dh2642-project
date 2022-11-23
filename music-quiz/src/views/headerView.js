import logo from '../images/music-logo.png'

function Header() {
    return <header className="header">
        <img src={logo} alt="logo" />
        <h1>Music Quiz with a Twist</h1>
    </header>
}

export default Header;