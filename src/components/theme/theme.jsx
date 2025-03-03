import React, { useContext } from "react";
import { themeContext } from "../context/themeContext";
import { Switch } from "antd";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(themeContext);
  const handleToggleTheme = () => {
    if (window.confirm("Bạn có muốn chuyển đổi giao diện")) {
      toggleTheme();
    }
  };
  return (
    <div>
      <Switch
        onClick={handleToggleTheme}
        checked={theme === "dark"}
        checkedChildren="🌙"
        unCheckedChildren="🌞"
      />
    </div>
  );
};

export default ThemeToggle;
