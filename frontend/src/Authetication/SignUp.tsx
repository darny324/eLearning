
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { Link } from 'react-router';

// Define the shape of our form state
interface FormDataState {
  fullName: string;
  email: string;
  password: string;
  accountType: 'student' | 'instructor';
  interest: string;
}

export default function SignUpForm(): React.JSX.Element {
  // Form Field State Tracking with explicit typing
  const [formData, setFormData] = useState<FormDataState>({
    fullName: '',
    email: '',
    password: '',
    accountType: 'student',
    interest: ''
  });

  // UI Presentation States
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  // Strongly typed change handler supporting both inputs and select drops
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { id, name, value } = e.target;

    // We map fields using either ID or Name attributes
    const targetKey = (id || name) as keyof FormDataState;

    setFormData((prev) => ({
      ...prev,
      [targetKey]: value
    }));
  };

  // Form Submission and Validation Engine with strict event types
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Industry-standard Email Regex Validator
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(formData.email);

    if (!isEmailValid) {
      setEmailError(true);
      return;
    }

    setEmailError(false);

    // Ready for API communication over HTTPS
    console.log("Submitting validated type-safe payload:", formData);
    alert("Form submitted cleanly! Check console logs.");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="w-full max-w-md p-8 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">

        {/* Title Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">Create your account</h2>
          <p className="text-sm text-slate-400 mt-1">Get started with your learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

          {/* 1. Full Name Input Element */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
              Full Name
            </label>
            <div className="bg-slate-900 border border-slate-700 rounded-lg flex items-center focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 focus-within:outline-offset-2 transition-all">
              <input
                type="text"
                id="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full bg-transparent px-4 py-2.5 text-white placeholder-slate-500 outline-none text-sm"
              />
            </div>
          </div>

          {/* 2. Email Address Input Element */}
          <div>
            <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
              Email Address
            </label>
            <div className={`bg-slate-900 border rounded-lg flex items-center transition-all focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 ${emailError
              ? 'border-rose-500 focus-within:outline-rose-500'
              : 'border-slate-700 focus-within:outline-blue-500'
              }`}>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent px-4 py-2.5 text-white placeholder-slate-500 outline-none text-sm"
              />
            </div>
            {emailError && (
              <p className="text-xs text-rose-500 mt-1">Please enter a valid email address.</p>
            )}
          </div>

          {/* 3. Password Input Element with FontAwesome Toggles */}
          <div>
            <label htmlFor="password" className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
              Password
            </label>
            <div className="bg-slate-900 border border-slate-700 rounded-lg flex items-center relative focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 focus-within:outline-offset-2 transition-all">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full bg-transparent pl-4 pr-11 py-2.5 text-white placeholder-slate-500 outline-none text-sm ${!showPassword ? '[text-security:asterisk] [-webkit-text-security:asterisk]' : ''
                  }`}
              />
              {/* FontAwesome Toggle Trigger Button */}
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className='mr-4'
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          {/* 4. Account Type Selection Element (Radio Formats) */}
          <div>
            <span className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
              I want to join as a
            </span>
            <div className="grid grid-cols-2 gap-3">
              {/* Student Option Box */}
              <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all group ${formData.accountType === 'student'
                ? 'border-blue-500 bg-blue-950/30'
                : 'border-slate-700 bg-slate-900 hover:bg-slate-800'
                }`}>
                <input
                  type="radio"
                  name="accountType"
                  value="student"
                  checked={formData.accountType === 'student'}
                  onChange={handleChange}
                  className="accent-blue-500 mr-2 h-4 w-4 bg-slate-900 border-slate-700 text-blue-500 focus:ring-0"
                />
                <span className={`text-sm font-medium ${formData.accountType === 'student' ? 'text-blue-400' : 'text-slate-300'}`}>
                  Student
                </span>
              </label>

              {/* Instructor Option Box */}
              <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all group ${formData.accountType === 'instructor'
                ? 'border-blue-500 bg-blue-950/30'
                : 'border-slate-700 bg-slate-900 hover:bg-slate-800'
                }`}>
                <input
                  type="radio"
                  name="accountType"
                  value="instructor"
                  checked={formData.accountType === 'instructor'}
                  onChange={handleChange}
                  className="accent-blue-500 mr-2 h-4 w-4 bg-slate-900 border-slate-700 text-blue-500 focus:ring-0"
                />
                <span className={`text-sm font-medium ${formData.accountType === 'instructor' ? 'text-blue-400' : 'text-slate-300'}`}>
                  Instructor
                </span>
              </label>
            </div>
          </div>

          {/* 5. Primary Interest Selector Selection Dropdown Options */}
          <div>
            <label htmlFor="interest" className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
              Primary Interest
            </label>
            <div className="bg-slate-900 border border-slate-700 rounded-lg flex items-center focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 focus-within:outline-offset-2 transition-all">
              <select
                id="interest"
                value={formData.interest}
                onChange={handleChange}
                required
                className="w-full bg-slate-900 px-4 py-2.5 text-slate-300 outline-none text-sm rounded-lg cursor-pointer appearance-none"
              >
                <option value="" disabled className="text-slate-500">Choose an option</option>
                <option value="web-dev" className="bg-slate-900">Web Development</option>
                <option value="graphic-design" className="bg-slate-900">Graphic Design</option>
                <option value="language" className="bg-slate-900">Language Learning</option>
                <option value="data-science" className="bg-slate-900">Data Science</option>
                <option value="marketing" className="bg-slate-900">Digital Marketing</option>
              </select>
            </div>
          </div>

          {/* Submit Action Trigger Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition-colors shadow-lg shadow-blue-600/20 mt-2"
          >
            Sign Up
          </button>
        </form>
        <div className='mt-4 w-full text-center'>
          Already have an account? <Link to='/login' className='text-blue-500'>login</Link>
        </div>
      </div>
    </div>
  );
}
