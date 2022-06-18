import { container, title } from "../../material-kit-react";

const servicesStyle = {
    sections: {
        padding: "10px 0"
    },
    container,
    title: {
        ...title,
        marginTop: "10px",
        minHeight: "25px",
        textDecoration: "none",
        textAlign: "center"
    },
    root: {
      background: `linear-gradient(322deg, darkblue, black)`,
      color: "white",
      marginTop: "20px"
  },
  cardTitle: {
    fontSize: 16,
  },
  text : {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }

};

export default servicesStyle;
/*
rgb(89, 89, 89)
"linear-gradient(322deg, darkblue, black)"
rgba(255, 0, 0, 0.2);
 background: `linear-gradient(322deg, darkblue, ${bla})`,
*/