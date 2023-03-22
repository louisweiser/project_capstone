import Background from "@/components/common/Background/index.js";
import Header from "@/components/common/Heading/Home.js";
import DailyQuotes from "@/components/pages/home/DailyQuote.js";
import HomeNavigation from "@/components/pages/home/HomeNavigation.js";

//main page 1/4
export default function HomePage() {
  return (
    <>
      <Background></Background>
      <Header title="BookLog"></Header>
      <DailyQuotes></DailyQuotes>
      <HomeNavigation></HomeNavigation>
    </>
  );
}
