import createClient from 'twilio';

const twilioClient = createClient(
  process.env.TWILIO_LIVE_SID,
  process.env.TWILIO_LIVE_AUTH_TOKEN
);

export default twilioClient;
