import { useRouter } from "next/router";

import BackgroundIllustration from "@/components/common/Background/Illustration.js";
import Header from "@/components/common/Heading/GenreDetailPage.js";
import GenreCoverLibrary from "@/components/pages/library/GenreCoverLibrary.js";

export default function GenreLibraryPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <BackgroundIllustration color={"#03314b"}></BackgroundIllustration>
      <Header title={slug}></Header>
      <GenreCoverLibrary></GenreCoverLibrary>
    </>
  );
}
