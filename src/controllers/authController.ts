import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
import { Router } from 'express';
import jwt from 'jsonwebtoken';

const authRouter = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


authRouter.post('/google/callback', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Missing auth code' });
  }

  try {
    // Отримуємо токен
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', process.env.GOOGLE_CLIENT_ID!);
    params.append('client_secret', process.env.GOOGLE_CLIENT_SECRET!);
    params.append('redirect_uri', process.env.GOOGLE_REDIRECT_URI!);
    params.append('grant_type', 'authorization_code');

    const tokenRes = await axios.post(
      'https://oauth2.googleapis.com/token',
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const idToken = tokenRes.data.id_token;

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload!;

    const allowedEmails = ['sizov.semen@gmail.com'];
    if (!email || !allowedEmails.includes(email)) {
      return res.status(403).json({ error: 'User not allowed' });
    }

    // 🔐 Створюємо JWT
    const user = {
      email,
      name,
      role: email === 'sizov.semen@gmail.com' ? 'admin' : 'user', // тимчасова логіка
    };

    const token = jwt.sign(user, process.env.JWT_SECRET!, {
      expiresIn: '12h',
    });

    return res.json({ user, token });
  } catch (err) {
    console.error('Google auth failed:', err);
    res.status(500).json({ error: 'Google auth failed' });
  }
});

export default authRouter