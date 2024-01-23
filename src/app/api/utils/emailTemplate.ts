
const emailTemplate=(url:string,subject:string,userName:string,para:string,task:string,ignore:string)=>(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MUNCH - ${subject}</title>
    <style>
        /* Add your custom styles here */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #1a1a1a;
            padding: 20px;
            border: 1px solid #333;
            color: #ffffff;
            border-radius: 1.3rem;
        }
        .header {
            text-align: center;
            background-color: #201e1e;
        }
        .header img {
            width: 150px;
        }
        .content {
            padding: 20px;
        }
        .btn{
            display:flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            width:100%;
        }
        .para{
            text-align: justify;
        }
        .verification-button {
            display: inline-block;
            background-color: #e74c3c;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 0.5rem;
            transition: all 0.2s;
        }
        .verification-button:hover {
            border-radius: 1.3rem;
            text-decoration:none;
        }
        .footer {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background-color: #221d1d;
            gap:10px;
            padding: 10px;
            color: #ffffff;
            height: 5vh;
            width:100%;
        }
        .footer a {
            color: #ffffff;
            text-decoration: none;
            // margin: 0 10px;
        }
        .img{
            height: 3vh;
            width: 3vh;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="https://firebasestorage.googleapis.com/v0/b/munch-396608.appspot.com/o/utils%2Flogo.png?alt=media&token=6e5eec03-1f03-4f60-8e9d-6bb933ee710a" alt="MUNCH Logo">
        </div>
        <div class="content">
            <h2 style="color: #e74c3c;">${subject}</h2>
            <p>Hello <strong> ${userName} </strong>,</p>
            <p class="para">${para}</p>
            <div class="btn"><a href=${url} class="verification-button">${task}</a></div>
            <p>${ignore}</p>
            <p style="font-style: italic;">Best regards,<br>MUNCH Team</p>
        </div>
        <div class="footer">
            <a href="https://www.instagram.com/_piyush_8_3_3/"  ><img src="https://firebasestorage.googleapis.com/v0/b/iiitusnapshots.appspot.com/o/logo%2Finsta.png?alt=media&token=e6213c81-c98e-4c8f-8f6f-3066c4523e17" alt="" class="img"></a>
            <a href="https://www.linkedin.com/in/piyush-singh-403089221/" ><img src="https://firebasestorage.googleapis.com/v0/b/iiitusnapshots.appspot.com/o/logo%2Flinkedin.png?alt=media&token=aef86b70-8d92-45d3-b47e-e50cfd00b2fe" alt="" class="img"></a>
        </div>
    </div>
</body>
</html>

`)
export default emailTemplate;