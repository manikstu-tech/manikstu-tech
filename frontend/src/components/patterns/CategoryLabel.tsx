export const CategoryLabel = ({ title }: { title: string }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="h-px flex-1 bg-manikstu-gold/40" />
    <div className="flex items-center gap-2">
      <span className="text-manikstu-gold text-xs">◆</span>
      <span className="text-xs font-semibold text-manikstu-green uppercase tracking-[0.15em] font-heading">
        {title}
      </span>
      <span className="text-manikstu-gold text-xs">◆</span>
    </div>
    <div className="h-px flex-1 bg-manikstu-gold/40" />
  </div>
);
