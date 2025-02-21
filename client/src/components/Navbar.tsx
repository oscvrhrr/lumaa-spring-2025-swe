import Styles from "../App.module.css"

export const Navbar = ({ children }: { children: React.ReactNode}) => {

  return (
    <nav className={Styles.nav}>
      { children }
    </nav>

  )
}
