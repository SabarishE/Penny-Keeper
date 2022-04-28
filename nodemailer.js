// import nodemailer from "nodemailer";
// import { google } from "googleapis";

// const client_id =
//   "";
// const client_secret = process.env.CLIENT_SECRET;
// const redirect_uri = "https://developers.google.com/oauthplayground";
// const Refresh_Token =
//   "";

// const oAuth2Client = new google.auth.OAuth2(
//   client_id,
//   client_secret,
//   redirect_uri
// );

// oAuth2Client.setCredentials({ refresh_token: Refresh_Token });

// const access_token = oAuth2Client.getAccessToken();

// export var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: "one.trial.one.trial@gmail.com",
//     clientId: client_id,
//     clientSecret: client_secret,
//     refreshToken: Refresh_Token,
//     accessToken: access_token,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// ---send grid test----

// import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(
//   "api key goes here"
// );
// const msg = {
//   to: "sabarishtrblzr@gmail.com", // Change to your recipient
//   from: "sabarishtrblzr@gmail.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });
