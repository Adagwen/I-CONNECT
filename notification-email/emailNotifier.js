const {createTransporter} = require('./transporter')

// Function to send email notification
async function sendEmailNotification(details) {
  const recipient = "ezeokaforadaobee@gmail.com";
  const subject = "Live Again";
  const text = "Come and have fun";
  const html = "<b>Smile</b>";

  try {
    const transporter = createTransporter()

    // Send mail with defined transport object
    const info = {
      from: '"Ada" <AdaobiEzeokafor@womentechsters.org>', // sender address
      to: details.to, // recipient address
      subject: details.subject,
      text: details.text,
      html: details.html,
    };
    transporter.sendMail(info)
    console.log("Email notification sent to", details.to);
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
}

// Example usage:
// Send notification
 module.exports = {sendEmailNotification};
