import { Button } from "./ui/button";

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  return (
    <div className="flex justify-end rounded-b border border-t-0 p-4">
      <Button
        variant="muted"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </Button>
      <span className="px-4 py-2 text-xs text-foreground/60">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="muted"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
