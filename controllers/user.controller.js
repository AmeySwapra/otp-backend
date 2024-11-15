import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

const client = twilio(accountSid, authToken);

export const sendVerificationCode = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    const verification = await client.verify.v2
      .services(serviceSid)
      .verifications.create({ to: phone, channel: 'sms' });

    res.status(200).json({
      message: 'Verification code sent successfully',
      sid: verification.sid,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send verification code', error });
  }
};


export const verifyCode = async (req, res) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).json({ message: 'Phone and code are required' });
  }

  try {
    const verificationCheck = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: phone, code });

    if (verificationCheck.status === 'approved') {
      res.status(200).json({ message: 'Verification successful' });
    } else {
      res.status(400).json({ message: 'Invalid verification code' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to verify code', error });
  }
};
