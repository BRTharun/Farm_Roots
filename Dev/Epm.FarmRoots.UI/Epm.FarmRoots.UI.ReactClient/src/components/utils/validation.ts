export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/;
    return passwordRegex.test(password);
  };
  
  export const validatePhoneNumber = (phoneNumber: string): boolean => {
    const phoneRegex =/^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };
  
  export const validateName = (name: string): boolean => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };