import Link from "next/link";

import { GearSVG } from "@/public/svgs/router.js";

export default function SettingButton() {
  return (
    <Link href="/home/settings">
      <GearSVG></GearSVG>
    </Link>
  );
}
