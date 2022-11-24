import logo from '../images/music-logo.png'
import { Stack, Image } from 'react-bootstrap'

function Header() {
    return <Stack className="py-3" direction="horizontal" gap={4}>
        <Image src={logo} height="40px" />
        <h1>Music Quiz with a Twist</h1>
    </Stack>
}

export default Header;