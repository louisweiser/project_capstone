import ToolBar from "@/components/pages/create/ToolBar.js";
import FormForNotes from "@/components/pages/create/FormForNotes.js";
import Currentbook from "@/components/pages/create/ChooseCurrentBook.js";
import Navigation from "@/components/common/Navigation";

export default function CreatePage() {
  return (
    <>
      <ToolBar></ToolBar>
      <FormForNotes></FormForNotes>
      <Currentbook></Currentbook>
      <Navigation></Navigation>
    </>
  );
}
