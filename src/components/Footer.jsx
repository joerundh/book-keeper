import styles from "../assets/Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>
                2025 No right reserved - Powered by the <a href="https://gutendex.com">Gutendex API</a>
            </p>
        </footer>
    )
}