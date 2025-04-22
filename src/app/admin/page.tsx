"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Submission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  message: string;
  status: string;
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple authentication - in production, use a proper authentication system
  const authenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'wellnessvending') { // Change this to a secure password
      setIsAuthenticated(true);
      fetchSubmissions();
    } else {
      setError('Invalid password');
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/submissions');
      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }
      const data = await response.json();
      setSubmissions(data.submissions);
    } catch (err) {
      setError('Error loading submissions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        <form onSubmit={authenticate} className="max-w-md mx-auto">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button 
            type="submit" 
            className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Form Submissions</h1>
        <Link href="/" className="text-primary hover:text-secondary">
          Return to Homepage
        </Link>
      </div>

      {isLoading ? (
        <p>Loading submissions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border-b text-left">Date</th>
                <th className="px-6 py-3 border-b text-left">Name</th>
                <th className="px-6 py-3 border-b text-left">Email</th>
                <th className="px-6 py-3 border-b text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b">
                    {new Date(submission.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 border-b">{submission.name}</td>
                  <td className="px-6 py-4 border-b">
                    <a 
                      href={`mailto:${submission.email}`} 
                      className="text-primary hover:underline"
                    >
                      {submission.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 border-b whitespace-pre-wrap">
                    {submission.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 