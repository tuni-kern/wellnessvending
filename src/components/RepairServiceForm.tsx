"use client";

import React, { useState } from 'react';

export default function RepairServiceForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    machineType: '',
    issue: '',
    urgency: 'this-week',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: '',
    showMessage: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '', showMessage: false });

    try {
      const response = await fetch('/api/repair-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'Request received. We reply within 24 hours.',
          showMessage: true,
        });
        setFormData({
          name: '',
          phone: '',
          email: '',
          machineType: '',
          issue: '',
          urgency: 'this-week',
        });
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'Something went wrong. Please try again.',
          showMessage: true,
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'Network error. Please try again later.',
        showMessage: true,
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus((prev) => ({ ...prev, showMessage: false }));
      }, 5000);
    }
  };

  const inputClass =
    'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {submitStatus.showMessage && (
        <div
          className={`p-4 rounded-md text-sm ${
            submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <div>
        <label htmlFor="name" className={labelClass}>Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your name" required />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>Phone</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="(619) 555-1234" required />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email (optional)</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
      </div>

      <div>
        <label htmlFor="machineType" className={labelClass}>Machine type / brand</label>
        <input type="text" id="machineType" name="machineType" value={formData.machineType} onChange={handleChange} className={inputClass} placeholder="e.g., AMS, Crane, Federal refrigerated" required />
      </div>

      <div>
        <label htmlFor="issue" className={labelClass}>What's going on?</label>
        <textarea id="issue" name="issue" value={formData.issue} onChange={handleChange} rows={4} className={inputClass} placeholder="Describe the issue. Error codes, what you've tried, anything useful." required></textarea>
      </div>

      <div>
        <label htmlFor="urgency" className={labelClass}>How soon?</label>
        <select id="urgency" name="urgency" value={formData.urgency} onChange={handleChange} className={inputClass} required>
          <option value="today">Today (same-day +50%)</option>
          <option value="this-week">This week</option>
          <option value="whenever">Whenever you can</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-primary text-white py-3 px-4 rounded-md transition duration-300 ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-secondary'
        }`}
      >
        {isSubmitting ? 'Sending...' : 'Request Service'}
      </button>
    </form>
  );
}
