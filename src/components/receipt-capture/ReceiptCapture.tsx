
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload } from 'lucide-react';

interface ReceiptCaptureProps {
  onCaptureComplete: (imageUrl: string) => void;
}

export const ReceiptCapture: React.FC<ReceiptCaptureProps> = ({ onCaptureComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate camera capture
  const handleCameraCapture = () => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const mockImageUrl = 'https://via.placeholder.com/300x400?text=Receipt';
      setIsProcessing(false);
      onCaptureComplete(mockImageUrl);
    }, 1500);
  };

  // Simulate upload from gallery
  const handleUpload = () => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const mockImageUrl = 'https://via.placeholder.com/300x400?text=Receipt';
      setIsProcessing(false);
      onCaptureComplete(mockImageUrl);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 flex-1">
      <p className="text-muted-foreground">Align receipt within the frame</p>
      
      {/* Capture area frame */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg w-full aspect-[3/4] flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          {isProcessing ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p>Processing image...</p>
            </div>
          ) : (
            <p>Receipt will appear here</p>
          )}
        </div>
      </div>
      
      <div className="space-y-4 w-full">
        <Button 
          className="w-full h-14 text-base"
          size="lg" 
          onClick={handleCameraCapture} 
          disabled={isProcessing}
        >
          <Camera className="mr-2 h-5 w-5" />
          Take Photo
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleUpload} 
          disabled={isProcessing}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload from Gallery
        </Button>
      </div>
    </div>
  );
};
