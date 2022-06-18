import { container, title } from "../../assets/jss/material-kit-react";

const pillsStyle = theme => ({
  section: {
    padding: "20px"
  },
  container,
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  }
});

export default pillsStyle;
