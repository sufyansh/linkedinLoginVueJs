const axios = require("axios");
const querystring = require("querystring");
const loginWithLinkedin = async (req, res, next) => {
  // get the token from frontend
  const code = req.query?.code;
  // console.log(code)
  //      } );
  var form = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost/linkedinLogin",
    client_id: "77tndbdm5tayi9",
    client_secret: "Tpg6uqFNZxANg2ib",
  };
 

  const result = await axios.post(
    "https://www.linkedin.com/oauth/v2/accessToken",
    querystring.stringify(form)
    ).then(resasd => {
      console.log(resasd.data.access_token)
      const accessToken = resasd.data.access_token;
      const getProfile = axios.get(
        "https://api.linkedin.com/v2/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then(resasd => {
          console.log(resasd.data.localizedFirstName + resasd.data.lastName.localized.en_US)
        });

        const getEmail = axios.get(
          "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))&oauth2_access_token="+accessToken
          ).then(resasd => {
            console.log(resasd.data.elements[0]['handle~'].emailAddress)
          });
        
    });


    res.status(200).json({result})

  // // get the user's email address
  // const emailRequest = await axios.get(
  //   "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))&oauth2_access_token=" +
  //     accessToken
  // );
  // const email = emailRequest.data.elements[0]["handle~"].emailAddress;

  // // get user profile with the access token
  // const profile = await axios.get("https://api.linkedin.com/v2/me", {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //     "cache-control": "no-cache",
  //     "X-Restli-Protocol-Version": "2.0.0",
  //   },
  // });
  // // do some business logic //
  // // we return a jwt
  // const jwtToken = signToken(user);
  // res.cookie("access_token", jwtToken, {
  //   httpOnly: true,
  // });

 
};

module.exports = {
  loginWithLinkedin,
};
