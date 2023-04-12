import Link from "next/link";

import { BackSVG } from "@/public/svgs/router.js";

export default function BackButton({ target }) {
  return (
    <Link href={`/${target}`}>
      <BackSVG></BackSVG>
    </Link>
  );
}
