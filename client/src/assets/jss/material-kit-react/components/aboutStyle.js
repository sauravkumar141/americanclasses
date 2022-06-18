import { container, title } from "../../material-kit-react";

const aboutStyle = {
    imgRounded: {
        borderRadius: "6px !important"
    },
    img: {
        marginLeft: "auto",
        marginRight: "auto"  
    },
    title: {
   ...title,
   color: "maroon"
    },
    para: {
        textAlign: "justify",
        margin: "20px",
        fontWeight: "700",
        fontFamily: `"Roboto Slab", "Times New Roman", serif`
    },
    choose: {
        background: "linear-gradient(45deg, darkviolet, darkgray)", 
        color: "white",
        borderRadius: "4px",
        borderBottomStyle: "outset",
        borderBottomColor: "violet",
        margin: "5px"
    },
    imgFluid: {
        width: "100%",
        height: "90%"
    },
    section: {
        padding: "10px 0"
    },
    container,
    aboutus: {
        marginTop: "auto",
        fontFamily: `"Roboto Slab", "Times New Roman", serif`,
        textAlign: "center"
    }
};

export default aboutStyle;

