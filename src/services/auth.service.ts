import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
import { getJWT } from '../utils/jwt';
import { selectUserByEmail } from '../db/users.db';

export const getAuthResponse = async (
    code: any,
): Promise<{ responseBody: object; status: number }> => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
        },
    );

    const idToken = tokenRes.data.id_token;

    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email } = payload!;

    if (!email) {
        return { responseBody: { error: 'User not found' }, status: 401 };
    }

    const user = await selectUserByEmail(email);

    if (!user) {
        return { responseBody: { error: 'User not found' }, status: 401 };
    }

    const token = getJWT(user);
    const response = { user, token };
    return { responseBody: response, status: 200 };
};
