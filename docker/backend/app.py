import smtplib
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Ajout de l'importation de CORS
import os

app = Flask(__name__)
CORS(app)  # Initialisation de CORS pour l'application Flask

# Configuration de la base de données PostgreSQL via SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:camarol2025@db/mailadmin'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modèle de base de données pour les e-mails suspects
class SuspiciousEmail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    is_validated = db.Column(db.Boolean, default=False)

# Table Blacklist
class Blacklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)  # Email ou Téléphone
    label = db.Column(db.String(255), nullable=False)  # Raison
    value = db.Column(db.String(255), nullable=False)  # Adresse Email ou Numéro
    error_code = db.Column(db.String(100), nullable=True)  # Code d'erreur

# Table Whitelist
class Whitelist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)  # Email ou Téléphone
    label = db.Column(db.String(255), nullable=False)
    value = db.Column(db.String(255), nullable=False)

# Table Notifications
class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(500), nullable=False)
    status = db.Column(db.String(50), default='Nouvelles')  # Nouvelles, En cours, Terminées
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

# Table Logs
class Log(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    action = db.Column(db.String(255), nullable=False)
    user = db.Column(db.String(100), nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

# Table Codes Erreur
class ErrorCode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(255), nullable=False)  # Catégorie
    code = db.Column(db.String(100), nullable=False, unique=True) 

# Endpoint pour envoyer un e-mail
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

# Blacklist : Ajouter une entrée
@app.route('/blacklist/add', methods=['POST'])
def add_blacklist_entry():
    data = request.get_json()
    entry = Blacklist(
        type=data['type'],
        label=data['label'],
        value=data['value'],
        error_code=data.get('error_code', None)
    )
    db.session.add(entry)
    db.session.commit()
    return jsonify({'message': 'Entrée ajoutée à la Blacklist'}), 201

# Blacklist : Récupérer toutes les entrées
@app.route('/blacklist', methods=['GET'])
def get_blacklist():
    entries = Blacklist.query.all()
    return jsonify([{
        'id': e.id, 'type': e.type, 'label': e.label, 'value': e.value, 'error_code': e.error_code
    } for e in entries])

# Supprimer une entrée de la Blacklist
@app.route('/blacklist/delete/<int:id>', methods=['DELETE'])
def delete_blacklist_entry(id):
    entry = Blacklist.query.get(id)
    if not entry:
        return jsonify({'error': 'Entrée introuvable'}), 404

    db.session.delete(entry)
    db.session.commit()
    return jsonify({'message': 'Entrée supprimée de la Blacklist'}), 200

# Whitelist : Ajouter une entrée
@app.route('/whitelist/add', methods=['POST'])
def add_whitelist_entry():
    data = request.get_json()
    entry = Whitelist(
        type=data['type'],
        value=data['value']
    )
    db.session.add(entry)
    db.session.commit()
    return jsonify({'message': 'Entrée ajoutée à la Whitelist'}), 201

# Whitelist : Récupérer toutes les entrées
@app.route('/whitelist', methods=['GET'])
def get_whitelist():
    entries = Whitelist.query.all()
    return jsonify([{
        'id': e.id, 'type': e.type, 'value': e.value
    } for e in entries])

# Supprimer une entrée de la Whitelist
@app.route('/whitelist/delete/<int:id>', methods=['DELETE'])
def delete_whitelist_entry(id):
    entry = Whitelist.query.get(id)
    if not entry:
        return jsonify({'error': 'Entrée introuvable'}), 404

    db.session.delete(entry)
    db.session.commit()
    return jsonify({'message': 'Entrée supprimée de la Whitelist'}), 200

# Notifications : Ajouter une alerte
@app.route('/notifications/add', methods=['POST'])
def add_notification():
    data = request.get_json()
    notification = Notification(
        email=data['email'],
        reason=data['reason']
    )
    db.session.add(notification)
    db.session.commit()
    return jsonify({'message': 'Notification ajoutée'}), 201

# Notifications : Récupérer toutes les notifications
@app.route('/notifications', methods=['GET'])
def get_notifications():
    notifications = Notification.query.all()
    return jsonify([{
        'id': n.id, 'email': n.email, 'reason': n.reason, 'date': n.date, 'is_resolved': n.is_resolved
    } for n in notifications])

# Supprimer une notification
@app.route('/notifications/delete/<int:id>', methods=['DELETE'])
def delete_notification(id):
    notification = Notification.query.get(id)
    if not notification:
        return jsonify({'error': 'Notification introuvable'}), 404

    db.session.delete(notification)
    db.session.commit()
    return jsonify({'message': 'Notification supprimée'}), 200

# Logs : Ajouter une action
@app.route('/logs/add', methods=['POST'])
def add_log():
    data = request.get_json()
    log_entry = Log(
        action=data['action'],
        user=data['user']
    )
    db.session.add(log_entry)
    db.session.commit()
    return jsonify({'message': 'Log ajouté'}), 201

# Logs : Récupérer tous les logs
@app.route('/logs', methods=['GET'])
def get_logs():
    logs = Log.query.all()
    return jsonify([{
        'id': l.id, 'action': l.action, 'user': l.user, 'timestamp': l.timestamp
    } for l in logs])

# Supprimer un log
@app.route('/logs/delete/<int:id>', methods=['DELETE'])
def delete_log(id):
    log = Log.query.get(id)
    if not log:
        return jsonify({'error': 'Log introuvable'}), 404

    db.session.delete(log)
    db.session.commit()
    return jsonify({'message': 'Log supprimé'}), 200

# Endpoint pour récupérer tous les codes d'erreur
@app.route('/error-codes', methods=['GET'])
def get_error_codes():
    error_codes = ErrorCode.query.all()
    return jsonify([{
        'id': e.id, 'category': e.category, 'code': e.code
    } for e in error_codes])

### SEEDING DES DONNEES YEP###
def seed_data():
    """ Insère des données de test à la création de la base de données """

    # Insertion des codes d'erreur
    error_categories = [
        ('Vérification d’authenticité des en-têtes', [
            'SPF_Fail', 'SPF_SoftFail', 'SPF_None', 'DKIM_Fail', 'DKIM_Domain_Mismatch',
            'DMARC_Fail', 'DMARC_None', 'Header_Inconsistency', 'Spoofing_Suspected'
        ]),
        ('Signes de phishing', [
            'Phishing_Link_Mismatch', 'Phishing_Domain_Suspect', 'Urgency_Tactic',
            'Grammar_Spelling_Issues', 'Generic_Greeting', 'Attachment_Suspicious',
            'Credential_Request'
        ]),
        ('Analyse de l’expéditeur', [
            'Sender_Email_Mismatch', 'Visual_Formatting_Difference',
            'Tone_Style_Inconsistency', 'Missing_Legal_Disclaimer',
            'Reply_To_Altered', 'Fake_Branding_Elements'
        ]),
        ('Usurpation et fraude', [
            'BEC_Fraud_Indicators', 'Spear_Phishing_Personalization',
            'Confidentiality_Request', 'New_Payment_Instructions',
            'Sender_Impersonation', 'No_Technical_Flags_But_Suspicious_Context'
        ]),
        ('Anomalies HTML', [
            'Hidden_Text_Detected', 'Unicode_Obfuscation', 'Fake_Button_Link',
            'Javascript_Execution', 'URL_Redirection', 'Base64_Encoding_Abuse'
        ])
    ]

    # Vérifier et insérer les erreurs
    if not ErrorCode.query.first():
        for category, codes in error_categories:
            for code in codes:
                db.session.add(ErrorCode(category=category, code=code))
    
    # Blacklist de test
    if not Blacklist.query.first():
        db.session.add(Blacklist(type='Email', label='Spam marketing', value='spam@example.com', error_code='SPF_Fail'))
        db.session.add(Blacklist(type='Téléphone', label='Appel frauduleux', value='+33 612345678', error_code='BEC_Fraud_Indicators'))

    # Whitelist de test
    if not Whitelist.query.first():
        db.session.add(Whitelist(type='Email', label='Entreprise Partenaire', value='contact@partenaire.com'))
        db.session.add(Whitelist(type='Téléphone', label='Service Client', value='+33 699999999'))

    # Notifications de test
    if not Notification.query.first():
        db.session.add(Notification(message="Tentative de phishing détectée sur email suspect.", status="Nouvelles"))
        db.session.add(Notification(message="Ajout d'un numéro à la Blacklist", status="En cours"))

    # Logs de test
    if not Log.query.first():
        db.session.add(Log(action="Ajout de spam@example.com à la Blacklist", user="Admin"))
        db.session.add(Log(action="Suppression d'un numéro de la Whitelist", user="Superviseur"))

    db.session.commit()

if __name__ == '__main__':
    # Initialisation de la base de données si nécessaire (uniquement en dev)
    with app.app_context():
        db.create_all()
        seed_data()
    
    app.run(host='0.0.0.0', port=5000)
