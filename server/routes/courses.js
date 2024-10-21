// Inside the purchase route
const { sendEmail } = require('../utils/emailService');

// After successful purchase
await sendEmail(
  req.user.email,
  'Course Enrollment Confirmation',
  `<h1>Thank you for enrolling in ${course.rows[0].title}</h1><p>You can now access the course content in your dashboard.</p>`
);