import styles from './Contact.module.css';

const Contact = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.contactContent}>
        <h2 className={styles.sectionTitle}>Get In Touch</h2>
        <p>Have a question or want to work together?</p>
        {/* Add your contact form or contact information here */}
      </div>
    </section>
  );
};

export default Contact;