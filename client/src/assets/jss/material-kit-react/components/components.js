import { container } from "../../material-kit-react";

const componentsStyle = {
  container,
  brand: {
    color: "#FFFFFF",
    textAlign: "left"
  },
  title: {
    fontSize: "4.2rem",
    fontWeight: "600",
    display: "inline-block",
    position: "relative",

    "@media (max-width: 425px)": {
      fontSize: "2.8rem",
      marginTop: "30px"
    },
    "@media (max-width: 768px)": {
      fontSize: "3.0rem",
      marginTop: "30px"
    },
    "@media (min-width: 1024px)": {
      fontSize: "3.9rem",
      marginTop: "30px"
    }
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px 0 0",
    "@media (max-width: 375px)": {
      fontSize: "1.200rem",
      marginTop: "-40px"
    },
    "@media (max-width: 425px)": {
      fontSize: "1.200rem",
      marginTop: "-40px"
    },
    "@media (min-width: 1024px)": {
      fontSize: "2.0rem",
      marginTop: "-10px"
    }
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 10px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  link: {
    textDecoration: "none"
  },
  textCenter: {
    textAlign: "center"
  }
};

export default componentsStyle;
