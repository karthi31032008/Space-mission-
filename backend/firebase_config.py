import os
import json

import firebase_admin
from firebase_admin import credentials, firestore


def initialize_firebase():
    if firebase_admin._apps:
        return

    service_account_json = os.environ.get(
        "FIREBASE_SERVICE_ACCOUNT"
    )

    if not service_account_json:
        raise RuntimeError(
            "FIREBASE_SERVICE_ACCOUNT environment variable is missing"
        )

    service_account_info = json.loads(
        service_account_json
    )

    credential = credentials.Certificate(
        service_account_info
    )

    firebase_admin.initialize_app(credential)


def get_firestore_db():
    initialize_firebase()
    return firestore.client()
  
