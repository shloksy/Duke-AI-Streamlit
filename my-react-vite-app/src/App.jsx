import React, { useState } from 'react';

const LearnLeap = () => {
  const [childName, setChildName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [password, setPassword] = useState(''); // New password state for New User
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [subject, setSubject] = useState('');
  const [showInitialPage, setShowInitialPage] = useState(true);
  const [showReturningUserPage, setShowReturningUserPage] = useState(false); // New state for Returning User page
  const [returningUserEmail, setReturningUserEmail] = useState(''); // Email for returning user login
  const [returningUserPassword, setReturningUserPassword] = useState(''); // Password for returning user login

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
  };

  const handleSubjectSelect = (subject) => {
    setSubject(subject);
  };

  const handleLogout = () => {
    setChildName('');
    setGradeLevel('');
    setParentName('');
    setParentEmail('');
    setPassword('');
    setIsFormSubmitted(false);
    setSubject('');
    setShowInitialPage(true);
    setShowReturningUserPage(false);
  };

  const goToGetStarted = () => {
    setShowInitialPage(false);
    setShowReturningUserPage(false);
  };

  const goToReturningUser = () => {
    setShowInitialPage(false);
    setShowReturningUserPage(true);
  };

  const handleReturningUserSubmit = (e) => {
    e.preventDefault();
    // Navigate to the welcome screen with math and English options
    setIsFormSubmitted(true);
    setShowInitialPage(false);
    setShowReturningUserPage(false);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-green-900">
      <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl p-8 bg-white rounded-lg shadow-md">
        {showInitialPage ? (
          // Initial Page with New User and Returning User buttons
          <div className="text-center">
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-6">Welcome to LearnLeap</h2>
            <p className="text-lg text-gray-600 mb-6">Are you a new or returning user?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-darkgreen-500 hover:bg-darkgreen-700 text-white font-bold py-3 px-6 rounded"
                onClick={goToGetStarted}
              >
                New User
              </button>
              <button
                className="bg-darkgreen-500 hover:bg-darkgreen-700 text-white font-bold py-3 px-6 rounded"
                onClick={goToReturningUser}
              >
                Returning User
              </button>
            </div>
          </div>
        ) : showReturningUserPage ? (
          // Returning User Login Form
          <form onSubmit={handleReturningUserSubmit}>
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-6">Returning User Login</h2>
            <div className="mb-6">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="returningUserEmail">Email:</label>
              <input
                className="block w-full p-3 border border-gray-300 rounded"
                type="email"
                id="returningUserEmail"
                value={returningUserEmail}
                
                onChange={(e) => setReturningUserEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="returningUserPassword">Password:</label>
              <input
                className="block w-full p-3 border border-gray-300 rounded"
                type="password"
                id="returningUserPassword"
                value={returningUserPassword}
                onChange={(e) => setReturningUserPassword(e.target.value)}
              />
            </div>
            <button className="bg-darkgreen-500 hover:bg-darkgreen-700 text-white font-bold py-3 px-6 rounded" type="submit">
              Log In
            </button>
          </form>
        ) : isFormSubmitted ? (
          subject === '' ? (
            <div>
              <h2 className="text-3xl font-bold text-darkgreen-500 mb-6">Welcome, {childName || "User"}!</h2>
              <p className="text-lg text-gray-600 mb-6">
                We'll send weekly reports to {parentName || "the registered parent"} at {parentEmail || "the registered email"}.</p>              
              <h3 className="text-2xl font-bold text-darkgreen-500 mb-6">Select a Subject to Practice:</h3>
              <div className="flex space-x-4 mb-6">
                <button className="bg-darkgreen-500 hover:bg-darkgreen-700 text-white font-bold py-3 px-6 rounded" onClick={() => handleSubjectSelect('english')}>English</button>
                <button className="bg-darkgreen-500 hover:bg-darkgreen-700 text-white font-bold py-3 px-6 rounded" onClick={() => handleSubjectSelect('math')}>Math</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded" onClick={handleLogout}>Log Out</button>
              </div>
            </div>
          ) : subject === 'english' ? (
            <div>
              <h2 className="text-3xl font-bold text-darkgreen-500 mb-1">English Practice</h2>
              <p className="text-lg text-gray-600 mb-3">Grade {gradeLevel}</p>
              <p className="text-lg text-gray-600 mb-6">Get ready to practice your English comprehension skills!</p>
              <div className="flex space-x-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded" onClick={() => setSubject('')}>Back to Subject Selection</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded" onClick={handleLogout}>Log Out</button>
              </div>
            </div>
          ) : subject === 'math' ? (
            <div>
              <h2 className="text-3xl font-bold text-darkgreen-500 mb-1">Math Practice</h2>
              <p className="text-lg text-gray-600 mb-3">Grade {gradeLevel}</p>              
              <p className="text-lg text-gray-600 mb-6">Get ready to practice your math skills!</p>
              <div className="flex space-x-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded" onClick={() => setSubject('')}>Back to Subject Selection</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded" onClick={handleLogout}>Log Out</button>
              </div>
            </div>
          ) : null
        ) : (
          // "Get Started" Form Page for New User
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-6">Get Started</h2>
            <div className="mb-6">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="childName">Child's Name:</label>
              <input className="block w-full p-3 border border-gray-300 rounded" type="text" id="childName" value={childName} onChange={(e) => setChildName(e.target.value)} />
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="gradeLevel">Grade Level:</label>
              <select className="block w-full p-3 border border-gray-300 rounded" id="gradeLevel" value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)}>
                <option value="">Select Grade Level</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
                <option value="5">Grade 5</option>
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="parentName">Parent's Name:</label>
              <input 
                className="block w-full p-3 border border-gray-300 rounded" 
                type="text" 
                id="parentName" 
                value={parentName} 
                onChange={(e) => setParentName(e.target.value)} 
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="parentEmail">Parent's Email:</label>
              <input 
                className="block w-full p-3 border border-gray-300 rounded" 
                type="email" 
                id="parentEmail" 
                value={parentEmail} 
                onChange={(e) => setParentEmail(e.target.value)} 
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="password">Password:</label>
              <input 
                className="block w-full p-3 border border-gray-300 rounded" 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button 
              className="bg-darkgreen-500 hover:bg-darkgreen-700 text-white font-bold py-3 px-6 rounded" 
              type="submit"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LearnLeap;
