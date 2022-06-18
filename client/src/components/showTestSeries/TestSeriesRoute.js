import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import ShowPhysics from "./ShowPhysics";
import PropsRoute from "../../shared/components/PropsRoute";

function TestSeriesRoute(props) {
  const { testSeries } = props;
  const [phy, setPhy] = useState([]);
  const [che, setChe] = useState([]);
  const [bio, setBio] = useState([]);
  const [his, setHis] = useState([]);
  const [geo, setGeo] = useState([]);
  const [civ, setCiv] = useState([]);
  const [math, setMath] = useState([]);
  const [san, setSan] = useState([]);
  const [hin, setHin] = useState([]);

  useEffect(() => {
    testSeries.map((test) => {
      if (test.subject === "Physics") {
        setPhy((dt) => [...dt, test]);
      }
      if (test.subject === "Chemistry") {
        setChe((dt) => [...dt, test]);
      }
      if (test.subject === "Biology") {
        setBio((dt) => [...dt, test]);
      }
      if (test.subject === "History") {
        setHis((dt) => [...dt, test]);
      }
      if (test.subject === "Geography") {
        setGeo((dt) => [...dt, test]);
      }
      if (test.subject === "Civics") {
        setCiv((dt) => [...dt, test]);
        console.log("aaaaaaaaaaaaaaaaa ", test);
      }
      if (test.subject === "Math") {
        setMath((dt) => [...dt, test]);
      }
      if (test.subject === "Sanskrit") {
        setSan((dt) => [...dt, test]);
      }
      if (test.subject === "Hindi") {
        setHin((dt) => [...dt, test]);
      }
      return null;
    });
  }, [testSeries]);

  return (
    <div>
      <Switch>
        <PropsRoute
          path="/show/physics"
          component={ShowPhysics}
          testSeries={phy}
          headerMessage={"Your Physics TestSeries Lesson."}
          errorMessage={"Currently You have not Physic TestSeries"}
        />
        <PropsRoute
          path="/show/chemistry"
          component={ShowPhysics}
          testSeries={che}
          headerMessage={"Your Chemistry TestSeries Lesson."}
          errorMessage={"Currently You have not Chemistry TestSeries"}
        />
        <PropsRoute
          path="/show/biology"
          component={ShowPhysics}
          testSeries={bio}
          headerMessage={"Your Biology TestSeries Lesson."}
          errorMessage={"Currently You have not Biology TestSeries"}
        />
        <PropsRoute
          path="/show/geography"
          component={ShowPhysics}
          testSeries={geo}
          headerMessage={"Your Geography TestSeries Lesson."}
          errorMessage={"Currently You have not Geography TestSeries"}
        />
        <PropsRoute
          path="/show/history"
          component={ShowPhysics}
          testSeries={his}
          headerMessage={"Your History TestSeries Lesson."}
          errorMessage={"Currently You have not History TestSeries"}
        />
        <PropsRoute
          path="/show/civics"
          component={ShowPhysics}
          testSeries={civ}
          headerMessage={"Your Civics TestSeries Lesson."}
          errorMessage={"Currently You have not Civics TestSeries"}
        />
        <PropsRoute
          path="/show/math"
          component={ShowPhysics}
          testSeries={math}
          headerMessage={"Your Maths TestSeries Lesson."}
          errorMessage={"Currently You have not Maths TestSeries"}
        />
        <PropsRoute
          path="/show/sanskrit"
          component={ShowPhysics}
          testSeries={san}
          headerMessage={"Your Sanskrit TestSeries Lesson."}
          errorMessage={"Currently You have not Sanskrit TestSeries"}
        />
        <PropsRoute
          path="/show/hindi"
          component={ShowPhysics}
          testSeries={hin}
          headerMessage={"Your Hindi TestSeries Lesson."}
          errorMessage={"Currently You have not Hindi TestSeries"}
        />
      </Switch>
    </div>
  );
}

TestSeriesRoute.propTypes = {
  testSeries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TestSeriesRoute;
