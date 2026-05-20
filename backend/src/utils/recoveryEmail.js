const recoveryEmail = (code) => {
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
            <p style="color: #666666;">Ultima paso.Escribe el siguiente código de verificación, para poder digitar una nueva contraseña:</p>
            <div style="font-size: 24px; font-weight: bold; color: #007BFF; margin-top: 10px;">${code}</div>
    </body>
    </html>
`
}
export default recoveryEmail;