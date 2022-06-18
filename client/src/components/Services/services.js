import  React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../components/Grid/GridContainer";
import Boxes from './Boxes';
import styles from '../../assets/jss/material-kit-react/components/servicesStyle'

const useStyles = makeStyles(styles);

export default function Services () {
const classes = useStyles();
   
const services =[
    {
        title: "सबसे आसान भाषा में समझाना |",
        description: `निर्माण क्लासेज में हम बच्चों को सबसे आसान भाषा में पढ़ाते तथा समझाते हैं, ताकि बच्चो को पुरा पुरा समझ में आए | 
        क्यों की विषय वस्तु को समझना बहुत ही महत्वपूर्ण होता है, और जब बच्चे विषय को समझेगे तो उन्हें पढने में आसान होगा |`
    },
    {
        title: "समयानुसार नियमित पाठक्रम करवाना |",
        description: `हम बच्चो को समय अनुसार नियमित पाठक्रम करवाते है ताकि, सभी बच्चे सभी विषयों पर बराबर ध्यान दे सके और  Exam में अच्छा 
        अंक प्राप्त कर सके | प्रयाप्त समय में विषयों को Cover करना बहुत जरुरी होता है जिस्से बच्चो को Revision करने का समय मिल सके |`
    },
    {
        title: "Test Series की सुबिधा |",
        description: `निर्माण क्लासेज में Test Series की सुबिधा दी गई है, ताकी सभी बच्चो को सही पैमाने पर उतारा जा सके | Test लेने का हमारा मकसद यह
         है की, हमें बच्चो का Progress पता चल सके | अगर कोई बच्चा Test Series में फेल होता है तो हम उसपे अलग से समय देते है ताकि वह क्लास में अच्छा 
         अंक प्राप्त कर सके और उसका मनोबल बना रहे |`
    },    {
        title: "सही मार्गदर्शन और प्रेरणा |",
        description: `निर्माण क्लासेज में पढाई के साथ-साथ बच्चो को सही मार्गदर्शन तथा प्रेरणा देते है | क्योंकि सही मार्गदर्शन ही बच्चो का भविष्य निर्धारित करता है |
         हम बच्चो को यह भी बताते है की विषय वस्तु को कैसे पढना है, कैसे नियमित revision करना है, क्या routine होना चाहिए |`
    }
]

    return (
        <div className={classes.sections} >
            <div className={classes.container}> 
              <div id="services-pills">
                <div className={classes.title}>
                    <h1 style={{marginLeft: "-31px"}}>Our Best Teaching</h1>
                </div>
                <div id="services">
                    <GridContainer style={{marginRight: "15px"}}>
                      { services.map((service, index)=>{
                          return(
                            <Boxes key={index} title={service.title} description={service.description}/>
                          )
                      })

                      }
                    </GridContainer>
                </div>
              </div>
  
            </div>
        </div>
    )
}
/*
  <div className={classes.text}>
                       <img src={imge} />  
                    </div>

*/