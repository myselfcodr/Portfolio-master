import React, { useState, useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import pdf from "../../Assets/../Assets/Ashish_Nishad_Resume.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const [isLoading, setIsLoading] = useState(true); // लोडिंग स्टेट के लिए

  // विंडो का आकार बदलने पर width अपडेट करना
  useEffect(() => {
    setWidth(window.innerWidth);
    // विंडो रिसाइज़ पर width अपडेट करने के लिए लिसनर जोड़ना
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // PDF लोड होने के बाद लोडिंग स्टेट को अपडेट करना
  const onLoadSuccess = () => {
    setIsLoading(false);
  };

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />

        
        

        {/* PDF व्यूअर और लोडिंग स्पिनर */}
        <Row className="resume" style={{ justifyContent: "center" }}>
          {isLoading ? (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Spinner animation="border" variant="primary" />
              <p>Resume is loading...</p>
            </div>
          ) : (
            <Document file={pdf} className="d-flex justify-content-center" onLoadSuccess={onLoadSuccess}>
              <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
            </Document>
          )}
        </Row>

        {/* दूसरा डाउनलोड बटन (वैकल्पिक) */}
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdf}
            target="_blank"
            style={{ maxWidth: "250px" }}
            aria-label="Download CV Again"
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
