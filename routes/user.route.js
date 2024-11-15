import express from 'express';
import { sendVerificationCode, verifyCode } from '../controllers/user.controller.js';


const router = express.Router();

// Route to send verification code
router.post('/send-code', sendVerificationCode);

// Route to verify the code
router.post('/verify-code', verifyCode);

export default router;
