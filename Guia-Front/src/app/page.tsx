import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>   

      {/* Aqui colocamos el Navbar para que aparezca en la página de Home */}
      <main className={styles.main}>
        <h1>Welcome to the Home Page</h1>
        {/* Agrega el contenido de tu pagina aqui */}
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 My Application</p>
      </footer>
    </div>
  );
}