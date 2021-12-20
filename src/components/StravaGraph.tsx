import { Box, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";

export const StravaGraph: React.FC = ({}) => {
  
  const makeCallToStravaApi = async () => {
    try {
      const res = await fetch(
        `http://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT}&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity%3Aread_all`
      );

      const data = await res.json();

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {

  //   makeCallToStravaApi();
  // }, []);

  return <Button onClick={makeCallToStravaApi}>authorise with strava</Button>;
};
