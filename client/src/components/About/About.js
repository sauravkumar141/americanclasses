import React from 'react';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { makeStyles } from "@material-ui/core/styles";
import image from '../../assets/img/faces/jp.jpg';
import style from '../../assets/jss/material-kit-react/components/aboutStyle';
const useStyles = makeStyles(style);

export default function About (){
    const classes = useStyles();
    return(
            <div className={classes.section}>
                    <div id="about">
                       <GridContainer>
                          <GridItem xs={12} sm={6} lg={4} >
                            <img 
                                src={image}
                                alt="..."
                                className={classes.imgRounded + " " + classes.imgFluid}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={6} lg={4} >
                              <h2 className={classes.aboutus}>निर्माण Classes के बारे में</h2>
                              <p className={`${classes.title} ${classes.para}`}>निर्माण Classes की स्थापना 2012 में Kulwant Sir के मार्गदर्शन
                               में हुई और तब से लेकर अब तक सफलता की सीढियाँ चढ़ी जा रही है | यह अपने शहर में एक अलग पहचान बनाई हुई है |
                                यहाँ अनुभवी Teachers के माध्यम से विषय वस्तु को सबसे आसान भाषा में पढ़ाते तथा सिखाते है | हमारा लक्ष्य है की निर्माण Classes
                                 से अधिक से अधिक बच्चो को 10वी के परीक्षा में Top स्थान प्राप्त हो | क्योकि निर्माण Classes व्यवसाय नहीं, सफलता
                                और विश्वास का प्रतिक है | इसलिए सफलता के लिए एक बार आवश्य पधारें |
                                </p>
                            </GridItem>
                          <GridItem xs={12} sm={6} lg={4}>
                            <h2 className={classes.aboutus}>हमें चुनें क्यों की,</h2>
                            <p className={`${classes.choose}`}><b>हम सबसे आसान तरीके से पढ़ाते है |</b></p>
                            <p className={`${classes.choose}`}><b>हम प्रतेक बच्चो पर बराबर ध्यान देते है |</b></p>
                            <p className={`${classes.choose}`}><b>हम Test Series की सुबिधा देते है |</b></p>
                            <p className={`${classes.choose}`}><b>हम अनुभवी Teachers की सुबिधा देते है |</b></p>
                            <p className={`${classes.choose}`}><b>हम क्लास रूम में Question पूछने की छुट देते है |</b></p>
                            <p className={`${classes.choose}`}><b>हम गरीब और मेघाबी बच्चो को बिशेष मौका देते हैं |</b></p>
                            <p className={`${classes.choose}`}><b>हम बच्चो को पढाई के साथ-साथ सही Guidlines भी देते है |</b></p>
                          </GridItem>
                       </GridContainer>
                    </div>
      
            </div>
    )
}