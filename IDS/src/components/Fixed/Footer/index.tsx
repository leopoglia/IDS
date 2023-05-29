import "./style.css"
import Mic from "../Accessibility/Mic"

export default function Footer() {
    return (
        <footer className="footer">
            <img src="/images/weg-blue.png" />
            <img src="/images/logo.png" alt="logo" />
            <span>© 2023 WEG IDS</span>


            <Mic/>
        </footer>
    )
}