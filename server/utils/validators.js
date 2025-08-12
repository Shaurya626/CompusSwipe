import validator from 'validator';

export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (!validator.isEmail(email)) {
    return { isValid: false, message: 'Please provide a valid email address' };
  }
  
  // Check if it's a college email (basic validation)
  const domain = email.split('@')[1];
  const commonCollegeDomains = ['.edu', '.ac.', 'university', 'college'];
  const isCollegeEmail = commonCollegeDomains.some(collegeDomain => 
    domain.includes(collegeDomain)
  );
  
  if (!isCollegeEmail) {
    return { 
      isValid: false, 
      message: 'Please use your college email address (.edu domain or recognized college domain)' 
    };
  }
  
  return { isValid: true };
};

export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true };
};

export const validateName = (name) => {
  if (!name) {
    return { isValid: false, message: 'Name is required' };
  }
  
  if (name.length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters long' };
  }
  
  if (name.length > 50) {
    return { isValid: false, message: 'Name cannot exceed 50 characters' };
  }
  
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return { isValid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }
  
  return { isValid: true };
};

export const validateCollege = (college) => {
  if (!college) {
    return { isValid: false, message: 'College name is required' };
  }
  
  if (college.length < 3) {
    return { isValid: false, message: 'College name must be at least 3 characters long' };
  }
  
  if (college.length > 100) {
    return { isValid: false, message: 'College name cannot exceed 100 characters' };
  }
  
  return { isValid: true };
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return validator.escape(input.trim());
};