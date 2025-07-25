// components/Layout.js
import styles from './Layout.module.css';

export const metadata = {
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutWrapper}>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
