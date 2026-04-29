const API_URL = 'https://altschool-birthday-reminder-app.onrender.com';

export const registerUser = async (formData: { username: string; email: string; dob: string }) => {
  const res = await fetch(`${API_URL}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Registration failed');
  }

  return data;
};