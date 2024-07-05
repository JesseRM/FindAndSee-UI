"use client";

import {
  AccountInfo,
  EventType,
  PublicClientApplication,
} from "@azure/msal-browser";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { msalConfig } from "../authConfig";
import { MsalProvider } from "@azure/msal-react";
import Script from "next/script";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Find and See",
  description: "Find something interesting and share it",
};

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event) => {
  if (
    (event.eventType === EventType.LOGIN_SUCCESS ||
      event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
      event.eventType === EventType.SSO_SILENT_SUCCESS) &&
    event.payload
  ) {
    msalInstance.setActiveAccount(event.payload as AccountInfo | null);
  }
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MsalProvider instance={msalInstance}>
      <html lang="en">
        <head>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Freckle+Face&family=Solway:wght@300;400;500;700;800&display=swap"
            rel="stylesheet"
          />
          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
            crossOrigin="anonymous"
          />
        </head>
        <body className={inter.className}>
          <NavBar />
          {children}
        </body>
      </html>
    </MsalProvider>
  );
}
