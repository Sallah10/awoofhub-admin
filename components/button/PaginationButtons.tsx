import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number; 
  currentPage: number;
  onPageChange: (page: number) => void;
}


export default function PaginationButtons({ totalPages, currentPage, onPageChange }: PaginationProps) {
  
  const btnClass = "p-2 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors";

  return (
    <div className="flex justify-end bg-primary-light items-center gap-6 text-sm text-gray-700 font-medium select-none">
      
      <span>Page {currentPage} of {totalPages}</span>

      <div className="flex items-center gap-1">
        <button 
          onClick={() => onPageChange(1)} 
          disabled={currentPage === 1}
          className={btnClass}
          title="First page"
        >
          <ChevronsLeft size={18} />
        </button>

        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className={btnClass}
          title="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className={btnClass}
          title="Next page"
        >
          <ChevronRight size={18} />
        </button>

        <button 
          onClick={() => onPageChange(totalPages)} 
          disabled={currentPage === totalPages}
          className={btnClass}
          title="Last page"
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
};
