import styles from '../styles/loading-dots.module.css';


type LoadingDotsProps = {
    color?: string
}
const LoadingDots = ({color}:LoadingDotsProps) => {
  return (
    <span className={styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export default LoadingDots;
