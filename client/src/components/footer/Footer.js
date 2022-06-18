import React, {useState, useCallback} from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Box,
  IconButton,
  withStyles,
  withWidth,
  isWidthUp,
  TextField,
  Button
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import {Instagram, Facebook, YouTube} from '@material-ui/icons';
import axios from 'axios';
import WaveBorder from "../../shared/components/WaveBorder";
import transitions from "@material-ui/core/styles/transitions";

const styles = theme => ({
  footerInner: {
    background: "linear-gradient(481deg, mediumblue, tomato)",
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(16),
      paddingBottom: theme.spacing(10)
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
      paddingBottom: theme.spacing(10)
    }
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
    color: theme.palette.common.white
  },
  footerLinks: {
    marginTop: theme.spacing(2.5),
    marginBot: theme.spacing(1.5),
    color: theme.palette.common.white
  },
  infoIcon: {
    color: `${theme.palette.common.white} !important`,
    backgroundColor: "#33383b !important"
  },
  socialIcon: {
    fill: theme.palette.common.white,
    backgroundColor: "#33383b",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.primary.light
    }
  },
  link: {
    cursor: "Pointer",
    color: theme.palette.common.white,
    transition: transitions.create(["color"], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeIn
    }),
    "&:hover": {
      color: theme.palette.primary.light
    }
  },
  whiteBg: {
    backgroundColor: theme.palette.common.white
  },
  message: {
    marginTop: "10px"
  },
  td: {
    margin: "5px"
  }
});

const infos = [
  {
    icon: <PhoneIcon />,
    description: "+918789180135"
  },
  {
    icon: <PhoneIcon />,
    description: "+919608765699"
  },
  {
    icon: <MailIcon />,
    description: "10121996amit@gmail.com"
  }
];

const socialIcon = [
  {
    lable: "Facebook",
    href: "https://m.facebook.com/profile.php?id=100007653226903&ref=content_filter",
    icon: (<Facebook />)
  },
  {
    lable: "Instagram",
    href: "https://www.instagram.com/kr_amit96/",
    icon: (<Instagram />)
  },
  {
    lable: "YouTube",
    href: "https://www.youtube.com/c/BiharBoardGuruji",
    icon: (<YouTube />)
  }
]

function Footer(props) {

  const { classes, theme, width } = props;

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState();
  var today = new Date();
  var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
  var time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })


   const onSubmitted = useCallback(async() =>{
     let obj ={
       email: email,
       mobile: mobile,
       message: message,
       date: date,
       time: time,
       active: true
     }
       let res =await axios.post('/api/saveFeedBack', obj); 
        setEmail("");
        setMobile("");
        setMessage("");
        setTimeout(() => {
         res.data ? setStatus("yes"): setStatus("no");
         setTimeout(()=>{
          setStatus("");
        }, 3000);
      }, 2000);
   }, [email, message, date, time, mobile, setStatus, setMobile, setEmail, setMessage]);

  return (
    <footer>
     <div className={classes.td}>
     <WaveBorder
        upperColor="linear-gradient(481deg, mediumblue, tomato)"
        lowerColor={theme.palette.common.white}
        animationNegativeDelay={4}
      />
      <div className={classes.footerInner}>
        <Grid container spacing={isWidthUp("md", width) ? 10 : 5}>
          <Grid item xs={12} md={6} lg={4}>
            <form onSubmit={(e) => {
                   e.preventDefault();
                   onSubmitted();
                  }}>
              <Box display="flex" flexDirection="column">
                <Box mb={1}>
                <TextField
                     label="Enter Your Email" 
                     variant="outlined"
                     type="email" 
                     onChange={e =>{setEmail(e.target.value)}}
                     value={email}
                     InputProps={{
                      className: classes.whiteBg
                    }}
                    fullWidth
                     />

                   <TextField
                     label="Enter Mobile No." 
                     variant="outlined"
                     onChange={e =>{setMobile(e.target.value)}}
                     value={mobile}
                     className={classes.message}
                     InputProps={{
                      className: classes.whiteBg
                    }}
                    fullWidth
                    required
                     />
                     
                  <TextField
                    variant="outlined"
                    multiline
                    onChange={e =>{setMessage(e.target.value)}}
                    value={message}
                    placeholder="Give Your Message...."
                    className={classes.message}
                    InputProps={{
                      className: classes.whiteBg
                    }}
                    rows={4}
                    fullWidth
                    required
                  />
                  {status === "yes" && (<Typography 
                  variant="h6" 
                  className={classes.message} 
                  style={{ color: "white", backgroundColor: "green" }}>
                  <b>Thanks for giving your feedback.</b>
                  </Typography>)}
                  {status === "no" && (<Typography 
                  variant="h6" 
                  className={classes.message} 
                  style={{ color: "white", backgroundColor: "red" }}>
                  <b>Sorry, your feedback has not sent.</b>
                  </Typography>)}
                </Box>
                <Button
                 variant="contained"
                 color="secondary"
                 type="submit"
                 >
                  Send Message
                </Button>
              </Box>
            </form>
          </Grid>
          
            <Grid item xs={12} md={6} lg={4}>
              <Box display="flex" justifyContent="center">
                <div>
                  {infos.map((info, index) => (
                    <Box display="flex" mb={1} key={index}>
                      <Box mr={2}>
                        <IconButton
                          className={classes.infoIcon}
                          tabIndex={-1}
                          disabled
                        >
                          {info.icon}
                        </IconButton>
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                      >
                        <Typography variant="h6" className="text-white">
                          {info.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </div>
              </Box>
            </Grid>
    
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h4" paragraph className="text-white">
            <b>हमें जरूर Follow करें |</b>
            </Typography>
            <Box display="flex">
              {socialIcon.map((social, index) => (
                <Box key={index} mr={index !== socialIcon.length - 1 ? 1 : 0}>
                  <IconButton
                    aria-label={social.label}
                    className={classes.socialIcon}
                    href={social.href}
                    target="balnk"
                  >
                    {social.icon}
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </div>
     </div>
    </footer>
  );
}

Footer.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

export default withWidth()(withStyles(styles, { withTheme: true })(Footer));
