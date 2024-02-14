import FCM from 'fcm-node';

export const sendNotifications = async (tokens, title, text, image, link ) => {
    try {
        const serverKey = process.env.SERVER_KEY;
        const fcm = new FCM(serverKey);
        const notificationPromises = tokens.map((token) => {
            const message = {
                notification: {
                    title: title,
                    body: text,
                    sound: 'default',
                    image: image,
                },
                webpush: {
                    fcmOptions: {
                        link: link,
                    },
                },
                to: token,
            };
  
            return new Promise((resolve, reject) => {
                fcm.send(message, (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                });
            });
        });
  
        // Wait for all notifications to be sent and handle responses
        const responses = await Promise.all(notificationPromises);
        return NextResponse.json({
          error: false,
          message: "Notifications sent successfully",
          status: 200
        }, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({
          error: true,
          message: "Notifications failed to send",
          status: 500
        }, { status: 500 })
    }
  };
  