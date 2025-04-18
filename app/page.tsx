import UrlDisplay from "@/components/url-display";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl p-10 text-blue-400">MP5 URL Shortener</h1>
      <UrlDisplay />
    </div>
  );
}