import smtplib
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# Configuration de la base de données PostgreSQL via SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modèle de base de données pour les e-mails suspects
class SuspiciousEmail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    is_validated = db.Column(db.Boolean, default=False)

# Endpoint pour récupérer les e-mails suspects en attente de validation
@app.route('/emails/suspicious', methods=['GET'])
def get_suspicious_emails():
    emails = SuspiciousEmail.query.filter_by(is_validated=False).all()
    return jsonify([{
        'id': email.id,
        'sender': email.sender,
        'subject': email.subject,
        'content': email.content,
        'is_validated': email.is_validated,
    } for email in emails])

# Endpoint pour valider un e-mail suspect manuellement
@app.route('/emails/validate/<int:id>', methods=['POST'])
def validate_email(id):
    email = SuspiciousEmail.query.get_or_404(id)
    
    # Exemple d'analyse simple (peut être remplacé par un appel IA)
    if "phishing" in email.content.lower():
        return jsonify({'error': 'Email suspecté de phishing'}), 400
    
    email.is_validated = True
    db.session.commit()
    
    return jsonify({'message': 'Email validé avec succès'})

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    sender = data['sender']
    recipient = data['recipient']
    subject = data['subject']
    content = data['content']

    try:
        server = smtplib.SMTP('mail', 587)  # 'mail' est le hostname du conteneur Docker Mailserver
        server.starttls()
        server.login('admin@camarol.local', 'P@ssw0rd!')
        message = f"Subject: {subject}\n\n{content}"
        server.sendmail(sender, recipient, message)
        server.quit()
        return jsonify({'message': 'Email sent successfully!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint pour ajouter un e-mail suspect (simulé ou via intégration SMTP)
@app.route('/emails/add', methods=['POST'])
def add_email():
    data = request.get_json()
    
    new_email = SuspiciousEmail(
        sender=data['sender'],
        subject=data['subject'],
        content=data['content']
    )
    
    db.session.add(new_email)
    db.session.commit()
    
    return jsonify({'message': 'Email ajouté avec succès'})

if __name__ == '__main__':
    # Initialisation de la base de données si nécessaire (uniquement en dev)
    with app.app_context():
        db.create_all()
    
    app.run(host='0.0.0.0', port=5000)
