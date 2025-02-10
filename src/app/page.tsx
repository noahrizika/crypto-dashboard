import Dashboard from "@/components/dashboard/dashboardWrapper";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 pt-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Real-Time <span className="text-[hsl(280,100%,70%)]">Crypto</span>{" "}
          Updates
        </h1>
        <Dashboard></Dashboard>
      </div>
    </main>
  );
}
