'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import Navbar from '@/components/navigation/Navbar';
import { createClient } from '@/lib/supabase/client';

export default function CreatePostPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      setError('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    setError(null);
    
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/auth');
        return;
      }
      
      const file = files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${session.user.id}/${fileName}`;
      
      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('posts')
        .upload(filePath, file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL
      const { data: publicURL } = supabase.storage
        .from('posts')
        .getPublicUrl(filePath);
      
      // Determine media type
      const mediaType = file.type.startsWith('image/') ? 'image' : 'video';
      
      // Create post record in database
      const { error: insertError } = await supabase
        .from('posts')
        .insert({
          user_id: session.user.id,
          caption,
          media_url: publicURL.publicUrl,
          media_type: mediaType
        });
      
      if (insertError) {
        throw insertError;
      }
      
      // Redirect to home page or post detail
      router.push('/');
      
    } catch (error: any) {
      setError(error.message || 'An error occurred while creating your post');
    } finally {
      setUploading(false);
    }
  };

  const generateAiCaption = () => {
    // Simulate AI caption generation
    const captions = [
      "Embracing the moment and living life to the fullest! ✨",
      "Adventure awaits around every corner. 🌍",
      "Finding beauty in the everyday moments. 💫",
      "Creating memories that will last a lifetime. 🌟",
      "Sharing a piece of my world with you all. 💖"
    ];
    
    const randomCaption = captions[Math.floor(Math.random() * captions.length)];
    setAiSuggestion(randomCaption);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Create New Post</h1>
        
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            {...getRootProps()} 
            className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center ${
              isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            
            {files.length > 0 ? (
              <div>
                <p className="text-sm text-gray-600">Selected file: {files[0].name}</p>
                {files[0].type.startsWith('image/') && (
                  <div className="mt-2">
                    <img 
                      src={URL.createObjectURL(files[0])} 
                      alt="Preview" 
                      className="mx-auto max-h-64 rounded-md object-contain"
                    />
                  </div>
                )}
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFiles([]);
                  }}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <svg 
                  className="mx-auto h-12 w-12 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
                <p className="mt-1 text-sm text-gray-600">
                  Drag & drop an image or video, or click to select
                </p>
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
              Caption
            </label>
            <div className="mt-1">
              <textarea
                id="caption"
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            
            {aiSuggestion && (
              <div className="mt-2 rounded-md bg-indigo-50 p-3">
                <p className="text-sm text-gray-700">AI Suggestion:</p>
                <p className="text-sm font-medium">{aiSuggestion}</p>
                <button
                  type="button"
                  onClick={() => setCaption(aiSuggestion)}
                  className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"
                >
                  Use this caption
                </button>
              </div>
            )}
            
            <div className="mt-2">
              <button
                type="button"
                onClick={generateAiCaption}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Generate AI caption
              </button>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:bg-indigo-300"
            >
              {uploading ? 'Creating post...' : 'Share Post'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
