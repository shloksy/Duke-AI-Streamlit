import React, { useState } from 'react';

const LearnLeap = () => {
  const [childName, setChildName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [subject, setSubject] = useState('');
  const [page, setPage] = useState('selectUserType');
  const [errorMessage, setErrorMessage] = useState('');

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

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
        {page === 'selectUserType' && (
          <div>
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-6">Welcome</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mb-4" onClick={() => setPage('newUser')}>New User</button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded" onClick={() => setPage('returningUser')}>Returning User</button>
          </div>
        )}
        {page === 'newUser' && !isFormSubmitted && (
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
              <input className="block w-full p-3 border border-gray-300 rounded" type="text" id="parentName" value={parentName} onChange={(e) => setParentName(e.target.value)} />
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="parentEmail">Parent's Email:</label>
              <input className="block w-full p-3 border border-gray-300 rounded" type="email" id="parentEmail" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} />
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="password">Password:</label>
              <input className="block w-full p-3 border border-gray-300 rounded" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="bg-darkgreen-500 hover:bg-darkgreen-700 text-white font-bold py-3 px-6 rounded" type="submit">Submit</button>
          </form>
        )}
        {page === 'returningUser' && (
          <form onSubmit={handleSignIn}>
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-6">Sign In</h2>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <div className="mb-6">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="parentEmail">Parent's Email:</label>
              <input className="block w-full p-3 border border-gray-300 rounded" type="email" id="parentEmail" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} />
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-600 mb-2" htmlFor="password">Password:</label>
              <input className="block w-full p-3 border border-gray-300 rounded" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="bg-darkgreen-500 hover:bg-darkgreen-700 text-white font-bold py-3 px-6 rounded" type="submit">Sign In</button>
          </form>
        )}
        {page === 'selectSubject' && (
          <div>
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-6">Select Subject</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mb-4" onClick={() => setSubject('english')}>English</button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded" onClick={() => setSubject('math')}>Math</button>
          </div>
        )}
        {isFormSubmitted && subject && (
          <div>
            <h2 className="text-3xl font-bold text-darkgreen-500 mb-1">{subject === 'english' ? 'English Practice' : 'Math Practice'}</h2>
            <p className="text-lg text-gray-600 mb-3">Grade {gradeLevel}</p>
            <p className="text-lg text-gray-600 mb-6">Get ready to practice your {subject} skills!</p>
            <div className="flex space-x-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
                      onClick={() => setSubject('')}>Back to Subject Selection
              </button>
              <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded"
                  onClick={() => {
                    setIsFormSubmitted(false);
                    setPage('selectUserType');
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