import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

interface CameraComponentProps {
  onCapture?: (imageDataUrl: string) => void;
}

const CameraComponent = ({ onCapture }: CameraComponentProps) => {
  const webcamRef = useRef<any>(null); // Reference to the webcam
  const [imageSrc, setImageSrc] = useState<string | null>(null); // State to store captured image

  // Function to capture an image
  const captureImage = useCallback(async () => {
    if (!webcamRef.current) return; // Guard against null
    const image = webcamRef.current.getScreenshot(); // Capture screenshot
    setImageSrc(image); // Save the image in state
    
    // Save to public/input folder
    if (image) {
      try {
        const timestamp = Date.now();
        const response = await fetch('/api/save-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageData: image,
            filename: `capture_${timestamp}.jpg`
          }),
        });
        
        if (response.ok) {
          console.log('Image saved successfully');
          if (onCapture) {
            onCapture(image);
          }
        }
      } catch (error) {
        console.error('Error saving image:', error);
      }
    }
  }, [webcamRef, onCapture]);

  return (
    <div>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        height={300}
      />
      <div className="mt-4">
        <button onClick={captureImage} className="px-4 py-2 bg-green-500 text-white rounded-xl font-bold">Capture Photo</button>
      </div>
    </div>
  );
};

export default CameraComponent;