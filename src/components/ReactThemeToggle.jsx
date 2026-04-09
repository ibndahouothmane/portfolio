import styles from './ReactThemeToggle.module.css';

const defaultOptions = {
  invertedIconLogic: false,
};

function ReactThemeToggle({
  isDark,
  onChange,
  invertedIconLogic = defaultOptions.invertedIconLogic,
}) {
  return (
    <label
      className={styles.container}
      title={isDark ? 'Activate light mode' : 'Activate dark mode'}
      aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
    >
      <input
        type="checkbox"
        checked={invertedIconLogic ? !isDark : isDark}
        onChange={onChange}
      />
      <div />
    </label>
  );
}

export default ReactThemeToggle;
