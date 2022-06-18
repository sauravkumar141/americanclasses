import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Section from "./Section";
import team1 from "../../assets/img/faces/kl.jpg";
import team2 from "../../assets/img/faces/bb.jpg";
import team3 from "../../assets/img/faces/sa.jpg";
import GridContainer from "../Grid/GridContainer";
import styles from "../../assets/jss/material-kit-react/components/teamStyle";

const useStyles = makeStyles(styles);
const data = [
  {
    team: team1,
    name: "AMIT KUMAR",
    title: "B.A (English Hons.), B.ed",
    socialMedia: {
      youtubeLink: "https://www.youtube.com/c/BiharBoardGuruji",
      facebookLink:
        "https://m.facebook.com/profile.php?id=100007653226903&ref=content_filter",
      instagramLink: "https://www.instagram.com/kr_amit96/",
    },
  },
  {
    team: team2,
    name: "KULWANT PASWAN",
    title: "(M.A)",
    socialMedia: {
      youtubeLink: "https://www.youtube.com/c/BiharBoardGuruji",
      facebookLink:
        "https://m.facebook.com/kulwant.paswan.9?fref=nf",
      instagramLink: "https://www.instagram.com/kulwantpaswan/",
    },
  },
  {
    team: team3,
    title: "BCA, MCA (doing)",
    name: "SAURAV KUMAR",
    socialMedia: {
      youtubeLink: "https://www.youtube.com/c/BiharBoardGuruji",
      facebookLink:
        "https://www.facebook.com/profile.php?id=100017690470632",
      instagramLink: "https://www.instagram.com/rnsrv141/",
    },
  },
];

export default function TeamSection() {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <h1 className={classes.title}>Here is our team</h1>
      <div id="team">
        <GridContainer>
          {data.map((item, index) => (
            <Section key={index} data={item} />
          ))}
        </GridContainer>
      </div>
    </div>
  );
}
