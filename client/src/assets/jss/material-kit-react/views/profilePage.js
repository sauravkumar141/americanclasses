import { container, title } from "../../material-kit-react";
import imagesStyle from "../..//material-kit-react/imagesStyles";

const profilePageStyle = theme => ({
  container,
  root: {
    background: `linear-gradient(322deg, darkblue, black)`,
    color: "white",
    marginTop: "10px",
    marginBottom:"10px"
  },
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "120px",
      marginTop: "50px",
      transform: "translate3d(0, -50%, 0)",
      marginLeft: "-30px"
    }
  },
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important"
  },
  name: {
    marginTop: "-135px"
  },
  ...imagesStyle,
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  title: {
    ...title,
    marginTop: "60px",
    marginLeft: "-10px"
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#999"
  },
  navWrapper: {
    margin: "20px auto 50px auto",
    textAlign: "center"
  },
  dBlock: { display: "block" },
  dNone: { display: "none" },
  toolbar: {
    justifyContent: "space-between",
  },
  searchText: {
    backgroundColor: "white",
    width: "100%"
  },
  searchButton: {
    width: "100%",
    marginTop: "10px"
  },
  visibility: {
    backgroundColor: "red",
    textAlign: "center"
  },
  margin5: {
    "&:hover,&:focus": {
      color: "inherit",
      background: "#B0C4DE"
    },
    margin: "5px"
  }
})

export default profilePageStyle;
