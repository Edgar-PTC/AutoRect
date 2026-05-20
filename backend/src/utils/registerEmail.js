const registerEmail = (code, name, lastName) => {
    return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="background-color: #f0f0f0; display: flex; justify-content: center; align-items: center; height: 100vh;">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #ffffff; padding: 50px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333333;">Verificacion de correo</h1>
            <p style="color: #666666;">Gracias por registrarte. ${name} ${lastName}. Solamente necesitamos verificar tu correo. Escribe el siguiente código de verificación:</p>
            <div style="font-size: 24px; font-weight: bold; color: #007BFF; margin-top: 10px;">${code}</div>
    </body>
    </html>
`
}
export default registerEmail;