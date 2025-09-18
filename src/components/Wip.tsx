import React from "react";
import { Result, Button } from "antd";
import Link from "next/link";

export default function OnProgress({
  title = "On Progress",
  subtitle = "This page is under development.",
  backHref = "/",
}: {
  title?: string;
  subtitle?: string;
  backHref?: string;
}) {
  return (
    <Result
      status="info"
      title={title}
      subTitle={subtitle}
      extra={
        <Link href={backHref}>
          <Button>Back</Button>
        </Link>
      }
    />
  );
}
