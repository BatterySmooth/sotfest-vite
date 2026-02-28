import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  text: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ text }) => {
  return (
    <>
      <h1 className={styles.header}>{text}</h1>
      <div className={styles.separator}></div>
    </>
  );
};