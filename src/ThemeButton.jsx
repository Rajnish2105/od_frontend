import "./ThemeButton.css";

const ThemeButton = ({ theme, toggleTheme }) => {
  return (
    <div className="theme-switcher">
      <input
        type="checkbox"
        name="switcher"
        hidden
        id="switcher-input"
        className="switcher-input"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label className="switcher-label" htmlFor="switcher-input">
        <span className="switcher-toggler"></span>
      </label>
    </div>
  );
};

export default ThemeButton;
