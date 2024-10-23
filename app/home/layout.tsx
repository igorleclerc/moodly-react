import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <main className="p-4 overflow-auto">{children}</main>
      <Navbar />
    </>
  )
}