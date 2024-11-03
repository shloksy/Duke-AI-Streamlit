import React, { useState } from 'react';
import logo from '/logo.jpeg';
import './App.css';

const LearnLeap = () => {
  const initialState = {
    childName: '',
    gradeLevel: '',
    parentName: '',
    parentEmail: '',
    password: '',
    isFormSubmitted: false,
    subject: '',
    page: 'selectUserType',
    errorMessage: '',
    generatedContent: ''
  };

  const [childName, setChildName] = useState(initialState.childName);
  const [gradeLevel, setGradeLevel] = useState(initialState.gradeLevel);
  const [parentName, setParentName] = useState(initialState.parentName);
  const [parentEmail, setParentEmail] = useState(initialState.parentEmail);
  const [password, setPassword] = useState(initialState.password);
  const [isFormSubmitted, setIsFormSubmitted] = useState(initialState.isFormSubmitted);
  const [subject, setSubject] = useState(initialState.subject);
  const [page, setPage] = useState(initialState.page);
  const [errorMessage, setErrorMessage] = useState(initialState.errorMessage);
  const [generatedContent, setGeneratedContent] = useState('');
  const [micActive, setMicActive] = useState(false);

  const toggleMic = () => setMicActive(!micActive);

  const resetState = () => {
    setChildName(initialState.childName);
    setGradeLevel(initialState.gradeLevel);
    setParentName(initialState.parentName);
    setParentEmail(initialState.parentEmail);
    setPassword(initialState.password);
    setIsFormSubmitted(initialState.isFormSubmitted);
    setSubject(initialState.subject);
    setPage(initialState.page);
    setErrorMessage(initialState.errorMessage);
    setGeneratedContent('');
    setMicActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    setPage('selectSubject');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    setPage('selectSubject');
  };

const handleLogout = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    if (result.success) {
      alert('Logged out and email sent successfully');
      resetState();
    } else {
      alert('Failed to log out and send email');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to log out and send email');
  }
};

  const handleSubjectSelect = (selectedSubject) => {
    setSubject(selectedSubject);
    setGeneratedContent(
      selectedSubject === 'english'
        ? 'Read the following passage aloud: "Once upon a time..."'
        : 'Solve the equation: 12 + 8 = ?'
    );
    setPage('subjectPractice');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-darkgreen-500">
      <div className={`max-w-${page === 'subjectPractice' ? '4xl' : 'md'} w-full bg-white p-8 rounded shadow text-center`}>
        {page === 'selectUserType' && (
          <div>
            <img src={logo} alt="Logo" className="w-32 h-32 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-6">Welcome to LeapLearn!</h2>
            <div className="flex flex-col space-y-4">
              <button
                className="button-hover-effect bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
                onClick={() => setPage('newUser')}
              >
                New User
              </button>
              <button
                className="button-hover-effect bg-darkgreen-500 hover:bg-darkgreen-700 text-white font-bold py-3 px-6 rounded"
                onClick={() => setPage('returningUser')}
              >
                Returning User
              </button>
            </div>
          </div>
        )}

        {page === 'newUser' && !isFormSubmitted && (
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-6">Get Started</h2>
            <div className="mb-6 text-left">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="childName">Child&#39;s Name:</label>
              <input
                className="block w-full p-3 border border-gray-300 rounded"
                type="text"
                id="childName"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
              />
            </div>
            <div className="mb-6 text-left">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="gradeLevel">Grade Level:</label>
              <select
                className="block w-full p-3 border border-gray-300 rounded"
                id="gradeLevel"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
              >
                <option value="">Select Grade Level</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
                <option value="5">Grade 5</option>
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
              </select>
            </div>
            <div className="mb-6 text-left">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="parentName">Parent&#39;s Name:</label>
              <input
                className="block w-full p-3 border border-gray-300 rounded"
                type="text"
                id="parentName"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
              />
            </div>
            <div className="mb-6 text-left">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="parentEmail">Parent&#39;s Email:</label>
              <input
                className="block w-full p-3 border border-gray-300 rounded"
                type="email"
                id="parentEmail"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 text-left">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="password">Password:</label>
              <input
                className="block w-full p-3 border border-gray-300 rounded"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center space-x-4">
              <button
                className="button-hover-effect bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded"
                type="button"
                onClick={() => setPage('selectUserType')}
              >
                Back
              </button>
              <button
                className="button-hover-effect bg-darkgreen-500 hover:bg-darkgreen-700 text-white font-bold py-3 px-6 rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {page === 'returningUser' && (
          <form onSubmit={handleSignIn}>
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-6">Sign In</h2>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <div className="mb-6 text-left">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="parentEmail">Parent&#39;s Email:</label>
              <input
                className="block w-full p-3 border border-gray-300 rounded"
                type="email"
                id="parentEmail"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 text-left">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="password">Password:</label>
              <input
                className="block w-full p-3 border border-gray-300 rounded"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center space-x-4">
              <button
                className="button-hover-effect bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded"
                type="button"
                onClick={() => setPage('selectUserType')}
              >
                Back
              </button>
              <button
                className="button-hover-effect bg-darkgreen-500 hover:bg-darkgreen-700 text-white font-bold py-3 px-6 rounded"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {page === 'selectSubject' && (
          <div>
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-6">Select a subject below:</h2>
            <div className="flex flex-col space-y-4">
                            <button
                className="button-hover-effect bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
                onClick={() => handleSubjectSelect('english')}
              >
                English
              </button>
              <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded"
                  onClick={async () => {
                    await handleLogout()
                    setIsFormSubmitted(false);
                    setPage('selectUserType');
                    setChildName('');
                    setGradeLevel('');
                    setParentName('');
                    setParentEmail('');
                    setPassword('');
                    setSubject('');
                    setErrorMessage('');
                  }}
              >
                Log Out
              </button>
            </div>
          </div>
        )}

        {page === 'subjectPractice' && (
            <div className="flex flex-col items-center space-y-6">
              <h2 className="text-3xl font-bold text-darkgreen-500 mb-1">
                {subject === 'english' ? 'English Practice' : 'Math Practice'}
              </h2>
              <p className="text-lg text-gray-600 mb-4">Grade {gradeLevel}</p>
              <div className="w-full max-w-2xl bg-gray-100 p-6 rounded-lg shadow-md text-left">
                <h3 className="text-xl font-semibold text-darkgreen-500 mb-4">
                  {subject === 'english' ? 'Passage' : 'Equation'}
                </h3>
                <p className="text-lg text-gray-700">
                  {generatedContent}
                </p>
              </div>
              <img
                  src="/microphone-icon.png"
                  alt="Microphone Button"
                  onClick={toggleMic}
                  className={`w-20 h-20 mt-6 cursor-pointer ${
                      micActive ? '' : 'grayscale'
                  }`}
              />
              <div className="flex flex-col space-y-4 w-full max-w-xs">
                <button
                    className="button-hover-effect bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
                    onClick={() => setPage('selectSubject')}
                >
                  Back to Subject Selection
                </button>
                <button
                    className="button-hover-effect bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded"
                    onClick={async () => {
                      await handleLogout()
                      setIsFormSubmitted(false);
                      setPage('selectUserType');
                      setChildName('');
                      setGradeLevel('');
                      setParentName('');
                      setParentEmail('');
                      setPassword('');
                      setSubject('');
                      setErrorMessage('');
                    }}
                >
                  Log Out
                </button>
              </div>

            </div>
        )}
      </div>
    </div>
  );
};

export default LearnLeap;

