import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="beforeInteractive"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false&libraries=services`}
      />
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default MyApp;
