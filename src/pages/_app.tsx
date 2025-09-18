import "antd/dist/reset.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "@/components/AppLayout";

type LayoutProps = { title?: string; actions?: React.ReactNode };
type NextPageWithLayoutProps = AppProps["Component"] & { layoutProps?: LayoutProps };

export default function MyApp({ Component, pageProps }: AppProps) {
  const Comp = Component as NextPageWithLayoutProps;
  const lp = Comp.layoutProps ?? {};

  return (
    <AppLayout {...lp}>
      <Component {...pageProps} />
    </AppLayout>
  );
}
