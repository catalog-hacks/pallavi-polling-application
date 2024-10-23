interface SessionData {
    userId: string;
    token: string;
    expires: number; 
  }
  
  export const createSessionData = (userId: string, token: string): SessionData => {
    const expires = Date.now() + 3600 * 1000; // 1 hour expiration
    return { userId, token, expires };
  };
  
  export const setSessionLocalStorage = (session: SessionData) => {
    localStorage.setItem('session', JSON.stringify(session));
  };
  
  export const getSessionLocalStorage = (): SessionData | null => {
    const sessionData = localStorage.getItem('session');
    return sessionData ? JSON.parse(sessionData) : null;
  };
  
  export const clearSessionLocalStorage = () => {
    localStorage.removeItem('session');
  };