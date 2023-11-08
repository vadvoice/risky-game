import * as React from "react";
import "./bigButton.scss";

const BigButton = (props) => {
  const { onClick, children } = props;
  const [pressed, setPressed] = React.useState(false);

  return (
    <button
      onClick={() => {
        setPressed(true);
        onClick && onClick();
        setTimeout(() => {
          setPressed(false);
        }, 300);
      }}
      {...props}
      className={pressed ? "bigButton pressed" : "bigButton"}
    >
      <span>{children}</span>
    </button>
  );
};

export { BigButton };
