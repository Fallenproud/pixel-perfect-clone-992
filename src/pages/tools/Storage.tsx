
import React, { useState } from 'react';
import { card, pill, accent } from '@/components/Design';
import { Upload, Download, Trash2, Eye, FolderOpen } from 'lucide-react';

const Storage = () => {
  const [selectedBucket, setSelectedBucket] = useState('agent-assets');

  const buckets = [
    { name: 'agent-assets', region: 'us-east-1', objects: 1247, size: '2.4 GB' },
    { name: 'user-uploads', region: 'us-west-2', objects: 892, size: '1.8 GB' },
    { name: 'model-cache', region: 'eu-west-1', objects: 156, size: '890 MB' },
    { name: 'backups', region: 'us-east-1', objects: 23, size: '4.2 GB' },
  ];

  const objects = [
    { name: 'avatar-placeholder.png', size: '24 KB', modified: '2 hours ago', type: 'image' },
    { name: 'agent-config.json', size: '1.2 KB', modified: '1 day ago', type: 'json' },
    { name: 'training-data.csv', size: '2.4 MB', modified: '3 days ago', type: 'csv' },
    { name: 'model-weights.bin', size: '150 MB', modified: '1 week ago', type: 'binary' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Storage</h1>
          <p className="text-muted-foreground">Manage files and assets for your agents.</p>
        </div>
        
        <button className={`${pill} bg-primary text-primary-foreground hover:bg-primary/90 flex items-center`}>
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Buckets */}
        <div className={`${card} p-6`}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Buckets</h2>
          <div className="space-y-3">
            {buckets.map((bucket) => (
              <div
                key={bucket.name}
                onClick={() => setSelectedBucket(bucket.name)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedBucket === bucket.name
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FolderOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-foreground">{bucket.name}</div>
                      <div className="text-xs text-muted-foreground">{bucket.region}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-foreground">{bucket.objects} objects</div>
                    <div className="text-xs text-muted-foreground">{bucket.size}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Area */}
        <div className={`${card} p-6`}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Upload to {selectedBucket}</h2>
          <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-2">Drag and drop files here</p>
            <p className="text-xs text-muted-foreground mb-4">or click to browse</p>
            <button className={`${pill} bg-primary text-primary-foreground hover:bg-primary/90`}>
              Choose Files
            </button>
          </div>
        </div>
      </div>

      {/* Object Preview */}
      <div className={card}>
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-foreground">Objects in {selectedBucket}</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Size</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Modified</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {objects.map((object, index) => (
                <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium mr-3 ${
                        object.type === 'image' ? 'bg-blue-500/20 text-blue-300' :
                        object.type === 'json' ? 'bg-green-500/20 text-green-300' :
                        object.type === 'csv' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {object.type.slice(0, 3).toUpperCase()}
                      </div>
                      <div className="font-medium text-foreground">{object.name}</div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{object.size}</td>
                  <td className="p-4 text-sm text-muted-foreground">{object.modified}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-white/10 rounded transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded transition-colors">
                        <Download className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Preview Section */}
        <div className="p-4 border-t border-white/10">
          <h3 className="font-medium text-foreground mb-3">Object Preview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Filename</label>
              <p className="text-sm text-foreground">{objects[0]?.name}</p>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Content Type</label>
              <p className="text-sm text-foreground">image/png</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white/5 rounded-lg">
            <div className="text-center text-muted-foreground">
              {objects[0]?.type === 'image' ? '🖼️ Image preview would appear here' : '📄 File preview would appear here'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storage;
