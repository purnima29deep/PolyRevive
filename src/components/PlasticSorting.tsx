
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Scan, CheckCircle, XCircle, Recycle, Camera } from 'lucide-react';

const PlasticSorting = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate AI scanning process
    setTimeout(() => {
      setScanResult({
        plasticType: 'PET (Polyethylene Terephthalate)',
        code: '1',
        recyclable: true,
        confidence: 95,
        suggestions: [
          'Clean the container before recycling',
          'Remove any labels if possible',
          'Can be recycled into new bottles or clothing fibers'
        ]
      });
      setIsScanning(false);
    }, 3000);
  };

  const plasticTypes = [
    { code: '1', name: 'PET', recyclable: true, description: 'Water bottles, food containers' },
    { code: '2', name: 'HDPE', recyclable: true, description: 'Milk jugs, detergent bottles' },
    { code: '3', name: 'PVC', recyclable: false, description: 'Pipes, vinyl records' },
    { code: '4', name: 'LDPE', recyclable: true, description: 'Plastic bags, squeeze bottles' },
    { code: '5', name: 'PP', recyclable: true, description: 'Yogurt containers, bottle caps' },
    { code: '6', name: 'PS', recyclable: false, description: 'Styrofoam, disposable cups' },
    { code: '7', name: 'Other', recyclable: false, description: 'Mixed plastics, complex items' },
  ];

  return (
    <div className="space-y-8">
      {/* AI Scanner Section */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2 text-green-700">
            <Scan className="h-7 w-7" />
            AI Plastic Identifier
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600 text-lg">
            Upload or capture an image of your plastic item and our AI will identify the type and recyclability.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center bg-white/50">
                {isScanning ? (
                  <div className="space-y-4">
                    <div className="animate-spin mx-auto">
                      <Scan className="h-16 w-16 text-green-600" />
                    </div>
                    <p className="text-green-600 font-semibold">Analyzing plastic...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-16 w-16 text-green-400 mx-auto" />
                    <div className="space-y-2">
                      <p className="text-gray-600">Drop an image here or</p>
                      <div className="flex gap-2 justify-center">
                        <Button 
                          onClick={handleScan}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={handleScan}
                          className="border-green-300 text-green-600 hover:bg-green-50"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Take Photo
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {scanResult && (
              <div className="space-y-4">
                <Card className="border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {scanResult.recyclable ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      Scan Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        #{scanResult.code}
                      </Badge>
                      <span className="font-semibold">{scanResult.plasticType}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={scanResult.recyclable 
                          ? "bg-green-100 text-green-700 hover:bg-green-200" 
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                        }
                      >
                        <Recycle className="h-3 w-3 mr-1" />
                        {scanResult.recyclable ? 'Recyclable' : 'Not Recyclable'}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {scanResult.confidence}% confidence
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-700">Recommendations:</h4>
                      <ul className="space-y-1">
                        {scanResult.suggestions.map((suggestion: string, index: number) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Plastic Types Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-700">Plastic Types Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plasticTypes.map((plastic) => (
              <Card key={plastic.code} className="border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-lg px-2 py-1">
                        #{plastic.code}
                      </Badge>
                      <span className="font-bold">{plastic.name}</span>
                    </div>
                    {plastic.recyclable ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{plastic.description}</p>
                  <Badge 
                    className={plastic.recyclable 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                    }
                  >
                    {plastic.recyclable ? 'Recyclable' : 'Not Recyclable'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlasticSorting;
