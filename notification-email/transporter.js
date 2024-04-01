
const nodemailer = require('nodemailer')

const createTransporter = ()=>{
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: "AdaobiEzeokafor@womentechsters.org",
          pass: "adagwen@1993",
        },
      });
      return transporter
}

module.exports = {createTransporter};
// Create nodemailer transporter


