import BackgroundIllustration from "@/components/common/Background/Illustration.js";
import Header from "@/components/common/Heading/HomePage.js";
import DailyQuote from "@/components/pages/home/DailyQuote.js";
import Navigation from "@/components/common/Navigation";

export default function HomePage() {
  return (
    <>
      <BackgroundIllustration color={"#b69b8a"}></BackgroundIllustration>
      <Header title="BookLog"></Header>
      <DailyQuote></DailyQuote>
      <Navigation></Navigation>
    </>
  );
}
