import * as React from "react";
import "./button.scss";

const Button = (props) => {
  return <button {...props}>{props.children}</button>;
};

export { Button };
