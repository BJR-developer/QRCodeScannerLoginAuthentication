import { NextRequest, NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken';
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  // Only rewrite requests to `/`, as _middleware on the `/pages` root will be executed in every request of the app.
  if (url.pathname === '/') {
    // Parse the cookie

    if (req.cookies['token'] !== undefined) {
      const token = (req.cookies['token'] || 'false');
      console.log(token);
      const tokenVerify = verify( token , process.env.NEXTAUTH_SECRET)
      console.log(tokenVerify);
      url.pathname = `/${tokenVerify ? '' : 'Login'}`
    }
    else {
      url.pathname = '/Login'
    }
    // Rewrite to the correct page
    return NextResponse.rewrite(url)
  }
}