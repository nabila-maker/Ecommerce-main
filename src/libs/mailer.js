class MailerService {
  constructor(nodemailer) {
    this.nodemailer = nodemailer;
  }

  async sendMail(user,subjet,body) {
    try {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      const testAccount = await this.nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      const transporter = this.nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: user.mail, // list of receivers
        subject: subjet, // Subject line
        text: body, // plain text body
        html: body, // html body
      });

      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', this.nodemailer.getTestMessageUrl(info));
    } catch (err) {
      throw new Error('Unable to send the email verification');
    }
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}

export default MailerService;
