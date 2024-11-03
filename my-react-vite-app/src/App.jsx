import React, { useState } from 'react';
import logo from '/logo.jpeg'; // Assuming the logo is in the public folder
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
    errorMessage: ''
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      childName,
      gradeLevel,
      parentName,
      parentEmail,
      password
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('Success:', result);
      setIsFormSubmitted(true);
      setPage('selectSubject');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const data = {
      parentEmail,
      password
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.status === 'success') {
        console.log('Sign-in successful:', result);
        setIsFormSubmitted(true);
        setPage('selectSubject');
      } else {
        setErrorMessage('Invalid Credentials');
        console.error('Sign-in failed:', result.message);
      }
    } catch (error) {
      setErrorMessage('Invalid Credentials');
      console.error('Error:', error);
    }
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
    setPage('subjectPractice');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-darkgreen-500">
      <div className="max-w-md w-full bg-white p-8 rounded shadow text-center">
        {page === 'selectUserType' && (
          <div>
            <img src={logo} alt="Logo" className="w-32 h-32 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-6">Welcome to LeapLearn!</h2>
            <div className="flex flex-col space-y-4">
              <button className="button-hover-effect bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded" onClick={() => setPage('newUser')}>New User</button>
              <button className="button-hover-effect bg-darkgreen-500 hover:bg-darkgreen-700 text-white font-bold py-3 px-6 rounded" onClick={() => setPage('returningUser')}>Returning User</button>
            </div>
          </div>
        )}

        {page === 'newUser' && !isFormSubmitted && (
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-6">Get Started</h2>
            <div className="mb-6 text-left">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="childName">Child's Name:</label>
              <input className="block w-full p-3 border border-gray-300 rounded" type="text" id="childName" value={childName} onChange={(e) => setChildName(e.target.value)} />
            </div>
            <div className="mb-6 text-left">
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
            <div className="mb-6 text-left">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="parentName">Parent's Name:</label>
              <input className="block w-full p-3 border border-gray-300 rounded" type="text" id="parentName" value={parentName} onChange={(e) => setParentName(e.target.value)} />
            </div>
            <div className="mb-6 text-left">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="parentEmail">Parent's Email:</label>
              <input className="block w-full p-3 border border-gray-300 rounded" type="email" id="parentEmail" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} />
            </div>
            <div className="mb-6 text-left">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="password">Password:</label>
              <input className="block w-full p-3 border border-gray-300 rounded" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex justify-center space-x-4">
              <button className="button-hover-effect bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded" type="button" onClick={() => setPage('selectUserType')}>Back</button>
              <button className="button-hover-effect bg-darkgreen-500 hover:bg-darkgreen-700 text-white font-bold py-3 px-6 rounded" type="submit">Submit</button>
            </div>
          </form>
        )}

        {page === 'returningUser' && (
          <form onSubmit={handleSignIn}>
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-6">Sign In</h2>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <div className="mb-6 text-left">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="parentEmail">Parent's Email:</label>
              <input className="block w-full p-3 border border-gray-300 rounded" type="email" id="parentEmail" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} />
            </div>
            <div className="mb-6 text-left">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="password">Password:</label>
              <input className="block w-full p-3 border border-gray-300 rounded" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex justify-center space-x-4">
              <button className="button-hover-effect bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded" type="button" onClick={() => setPage('selectUserType')}>Back</button>
              <button className="button-hover-effect bg-darkgreen-500 hover:bg-darkgreen-700 text-white font-bold py-3 px-6 rounded" type="submit">Sign In</button>
            </div>
          </form>
        )}

        {page === 'selectSubject' && (
          <div>
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-6">Select Subject</h2>
            <div className="flex flex-col space-y-4">
              <button className="button-hover-effect bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded" onClick={() => handleSubjectSelect('english')}>English</button>
              <button className="button-hover-effect bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded" onClick={() => handleSubjectSelect('math')}>Math</button>
              <button className="button-hover-effect bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded" onClick={resetState}>Log Out</button>
            </div>
          </div>
        )}

        {page === 'subjectPractice' && (
          <div>
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-1">{subject === 'english' ? 'English Practice' : 'Math Practice'}</h2>
            <p className="text-lg text-gray-600 mb-3">Grade {gradeLevel}</p>
            <p className="text-lg text-gray-600 mb-6">Get ready to practice your {subject} skills!</p>
            <div className="flex flex-col space-y-4">
              <button
                  className="button-hover-effect bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
                  onClick={() => setPage('selectSubject')}>Back to Subject Selection
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
      </div>
    </div>
  );
};

export default LearnLeap;
