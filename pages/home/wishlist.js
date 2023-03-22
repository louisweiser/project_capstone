import Header from "@/components/common/Heading/HomeNavigation.js";
import DynamicList from "@/components/pages/home/Wishlist.js";

export default function WishListPage() {
  return (
    <>
      <Header title={"Wishlist"}></Header>
      <DynamicList></DynamicList>
    </>
  );
}
