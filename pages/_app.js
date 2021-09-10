// import 'tailwindcss/tailwind.css'
import { UserProvider } from "@utils/useUser";
import "@styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
