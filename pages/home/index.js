import Background from "@/components/common/Background/beige.js";
import Header from "@/components/common/Heading/Home.js";
import DailyQuotes from "@/components/pages/home/DailyQuote.js";

export default function HomePage() {
  return (
    <>
      <Background></Background>
      <Header title="BookLog"></Header>
      <DailyQuotes></DailyQuotes>
    </>
  );
}
