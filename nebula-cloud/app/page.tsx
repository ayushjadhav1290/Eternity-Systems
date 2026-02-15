import CloudScroll from '@/components/CloudScroll';
import ScrollContent from '@/components/ScrollContent';

export default function Home() {
  return (
    <main className="relative w-full bg-[#0b1f24] text-white">

      {/* Background Scroll Animation */}
      <div className="fixed inset-0 z-0">
        <CloudScroll />
      </div>

      {/* Foreground Content Scroller (syncs height with CloudScroll) */}
      <div className="relative z-10 pointer-events-none">
        {/* HACK: We need a tall container to match the CloudScroll's height so we can place text at absolute positions relative to scroll */}
        <div className="h-[400vh] w-full relative">

          <ScrollContent />

        </div>
      </div>


    </main>
  );
}
