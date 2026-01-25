export const verifyEmailTemplate = (token: string) => `
  <div>
    <h2>Email Verification</h2>
    <p>Click the link below to verify your email:</p>
    <a href="http://localhost:3000/verify-email?token=${token}">
      Verify Email
    </a>
  </div>
`;
