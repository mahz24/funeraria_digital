import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from waitress import serve
from azure.communication.email import EmailClient

load_dotenv()
app = Flask(__name__)

connection_string = 'endpoint=https://correossudoku.unitedstates.communication.azure.com/;accesskey=I0T9W294WumtBmnxXVUMLax3ZCa0xpq5gkxqQ+TJ9pvBbUa2A2Y0vU6eFMD4E0wGsuJkD9OWmPcn2ntqUTDQMA=='
client = EmailClient.from_connection_string(connection_string)
sender = os.environ.get("SENDER_ADDRESS")

@app.route('/send_email', methods=['POST'])
def send_email():
    data = request.get_json()

    if 'email' not in data or 'subject' not in data or 'body' not in data:
        return jsonify({'error': 'Missing required fields'})

    try:

        message = {
            "senderAddress": os.environ.get("SENDER_ADDRESS"),
            "recipients":  {
                "to": [{"address": data['email']}],
            },
            "content": {
                "subject": data['subject'],
                "plainText": data['asunto'],
            }
        }

        poller = client.begin_send(message)
        result = poller.result()

    except Exception as ex:
        print(ex)
    return jsonify(data)


@app.route("/email_reset_password", methods=["POST"])
def email_reset_password():
    try:
        body = request.get_json()
        user_email = body["email"]
        new_password = body["new_password"]
        template = (
                    '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">'
                    '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
                    "</head>"
                    "<body><h3>Tu nueva contraseña esta lista</h3>"
                    f"<p>Tu nueva contraseña es: <strong>{new_password}</strong></p></body>"
                    )

        message = {
            "senderAddress": os.environ.get("SENDER_ADDRESS"),
            "recipients": {
                "to": [{"address": user_email}],
            },
            "content": {
                "subject": "Reestablecimiento de contraseña",
                "plainText": "Tu contraseña se reestableció correctamente",
                "html": template,
            },
        }

        poller = client.begin_send(message)
        result = poller.result()
        return jsonify({"message": "Email enviado correctamente", "body": result})
                       
    except Exception as e:
        return (
            jsonify(
                {
                    "message": "Error al enviar el correo de la nueva contraseña",
                    "error": e,
                }
            ),
            500,
        )
    
@app.route("/email_2FA", methods=["POST"])
def secondFactor():
    try:
        body = request.get_json()
        user_email = body["email"]
        token2FA = body["token2FA"]
        template = (
                    '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">'
                    '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
                    "</head>"
                    "<body><h3>Tu código de segunda verificación está listo.</h3>"
                    f"<p>Tu código es: <strong>{token2FA}</strong></p></body>"
                    )

        message = {
            "senderAddress": os.environ.get("SENDER_ADDRESS"),
            "recipients": {
                "to": [{"address": user_email}],
            },
            "content": {
                "subject": "Código de autenticación",
                "plainText": "Tu código de autenticación ya llegó.",
                "html": template,
            },
        }

        poller = client.begin_send(message)
        result = poller.result()
        return jsonify({"message": "Email enviado correctamente", "body": result})
                       
    except Exception as e:
        return (
            jsonify(
                {
                    "message": "Error al enviar el correo de la nueva contraseña",
                    "error": e,
                }
            ),
            500,
        )


if __name__ == '__main__':
    print('server running')
    serve(app, host='0.0.0.0', port=5000)
