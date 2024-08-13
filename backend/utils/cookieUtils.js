import cookie from 'cookie';

// Set a cookie
const setCookie = (res, token) => {
  res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    sameSite: 'strict', // Strict cookie handling
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
  }));
};

// Clear the cookie
const clearCookie = (res) => {
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    sameSite: 'strict',
    expires: new Date(0), // Expire the cookie immediately
    path: '/',
  }));
};

export { setCookie, clearCookie };
