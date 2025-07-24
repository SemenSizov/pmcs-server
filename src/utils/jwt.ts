import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET!
export const getJWT = (user: { email: String; name: string; role: string }) => {

    const token = jwt.sign(user, secret, {
        expiresIn: '12h',
    });
    return token
};

export const decodeJWT = (token: string)=>{
    const decoded = jwt.verify(token, secret)
}