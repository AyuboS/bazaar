import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PostForm } from "@/components/post/PostForm";
import { getAllCategoriesGrouped } from "@/db/queries";

export const metadata = { title: "Ievietot sludinājumu" };

export default async function PostPage() {
  const categories = await getAllCategoriesGrouped();
  return (
    <>
      <Navbar />
      <PostForm categories={categories} />
      <Footer />
    </>
  );
}
