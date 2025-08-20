import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">About Me</h1>
      <div className="max-w-2xl text-center">
        <p className="mb-4">
          Welcome to my portfolio! I am a passionate developer dedicated to creating
          innovative and user-friendly web applications.
        </p>
        {/* Add more content about yourself here */}
      </div>
    </div>
  );
}
