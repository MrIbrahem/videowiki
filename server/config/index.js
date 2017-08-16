module.exports = {
  secret: process.env.APP_SECRET,
  db: 'mongodb://hassan:hassan@ds031347.mlab.com:31347/videowiki',
  mail: {
    transportOptions: {
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    },
    verifyEmailConfig: {
      subject: 'VideoWiki - Verify your email!',
      html: 'Click the following link to confirm your account: ',
      text: 'Please confirm your account by clicking the following link: ',
    },
    resetEmailConfig: {
      subject: 'VideoWiki - Reset Password!',
      html: 'Click the following link to reset your Password: ',
      text: 'Please reset your account by clicking the following link: ',
    },
  },
}
