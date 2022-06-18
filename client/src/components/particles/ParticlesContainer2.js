import React, {Component} from 'react';
import Particles from 'react-particles-js'
import {makeStyles} from '@material-ui/styles';


const useStyles = makeStyles({
  particlesCanva: {
      position: "absolute"
  }
})

class ParticlesContainer2 extends Component{ 

    render() {

        const classes = useStyles();

        return (

            <Particles
                canvasClassName={classes.particlesCanva}
                params={{
                  particles: {
                      number : {
                          value: 45,
                          density: {
                              enable: true,
                              value_area: 900
                          }
                      },
                      shape: {
                          type: "circle",
                          stroke: {
                              width: 1,
                              color: "tomato"
                          }
                      },
                      size: {
                          value: 8,
                          random: true,
                          anim: {
                              enable: false,
                              speed: 8,
                              size_min: 0.1,
                              sync: false
                          }
                      },
                      opacity: {
                          value: 1,
                          random: true,
                          anim: {
                              enable: true,
                              speed: 1,
                              opacity_min: 0.1,
                              sync: true
                          }
                      }
                  }
                }}
             
                />
                )}
            }

export default ParticlesContainer2;

/*
********************************************************************************


*/