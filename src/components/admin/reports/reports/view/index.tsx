import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DiagnosticReport from './report/DiagnosticReport';

const PreviewComponent = ({ showPreview, onClose, record, isTest }) => {
  const componentRef = useRef();
  const [pdfLoading, setPdfLoading] = useState(false);

  const exportPDF = async () => {
    setPdfLoading(true);
    const element = componentRef.current;

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      scrollX: 0,
      scrollY: -window.scrollY,
      windowHeight: document.documentElement.scrollHeight,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = Math.min(width / imgWidth, height / imgHeight);
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);
    pdf.save('download.pdf');
    setPdfLoading(false);
  };

  return (
    showPreview && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Gray Background Overlay */}
        <div className="bg-black absolute inset-0 z-40 opacity-50"></div>

        {/* Modal Content */}
        <div className="lg:w-100 relative z-50 max-h-[80vh] w-full overflow-auto rounded-lg bg-white p-6 shadow-lg md:w-3/4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Preview</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="preview-content" ref={componentRef}>
            <DiagnosticReport report={record} isTest={isTest} />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={exportPDF}
              disabled={pdfLoading}
              className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
            >
              {pdfLoading ? 'Exporting...' : 'Export PDF'}
            </button>
            <button
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default PreviewComponent;
