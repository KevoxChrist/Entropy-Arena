
import '../styles/Header2.css'

function Header(){
  return(
    //  <!-- Header -->
    <header className="header">
      <a href="/">
        <img src="/Entropy_Logo.svg" alt="Logo" />
      </a>
      <nav className="nav-menu">
        {/* <a href="/contact" className="nav-item contact">CONTACT</a> */}
        <a href="/products" className="nav-item shop">ACCOUNT</a>
      </nav>
    </header>
  )
}

export default Header;