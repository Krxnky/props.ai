import { Inter } from "next/font/google";
import "./globals.css";
import PropInfoModal from "./components/PropInfoModal";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Props.AI",
  description: "Props.AI prop lines estimator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  );
}
