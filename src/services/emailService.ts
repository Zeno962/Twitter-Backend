import {SESClient, SendEmailCommand} from '@aws-sdk/client-ses';

require('dotenv').config();

//console.log(process.env.AWS_ACCESS_KEY_ID);

const ses = new SESClient({});

function createSendEmailCommand(toAddress: string, fromAddress: string, message: string){
    return new SendEmailCommand({
        Destination: {
            ToAddresses: [toAddress],
        },
        Source: fromAddress,
        Message: {
            Subject: {
                Charset: 'UTF-8',
                Data: "Your one-time password"
            },
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: message
                },
            }
        },
    })
}

export async function sendEmailToken(email: string, token: string){
  //console.log('email: ', email, token);
  const message = `Your one time password is ${token}`
  console.log(email);
  const command = createSendEmailCommand(email,'postmancoder@outlook.com',message);
  try {
    //console.log(command);
    return await ses.send(command);
  }catch(e) {
    console.log('an error occurred');
    return e;
}
} 
sendEmailToken("kennethambrose962@gmail.com","123");