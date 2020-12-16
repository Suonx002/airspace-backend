module.exports = {
    "$schema": "http://json-schema.org/draft-07/schema",
    "title": "User",
    "description": "User Schema",
    "type": "object",
    "required": [
        "email",
        "name",
        "password"
    ],
    "additionalProperties": false,
    "properties": {
        "id": {
            "$id": "#/properties/id",
            "type": "integer",
            "title": "The database ID of the user."
        },
        "email": {
            "$id": "#/properties/email",
            "type": "string",
            "title": "The users email. Must be unique.",
            "examples": [
                "cj@null.computer"
            ]
        },
        "name": {
            "$id": "#/properties/name",
            "type": "string",
            "title": "The users name.",
            "examples": [
                "CJ"
            ]
        },
        "password": {
            "$id": "#/properties/password",
            "type": "string",
            "title": "The users hashed password."
        },
        "created_at": {
            "$id": "#/properties/created_at",
            "type": "string",
            "title": "The creation date of the user."
        },
        "updated_at": {
            "$id": "#/properties/updated_at",
            "type": "string",
            "title": "The date the user was last updated."
        }
    }
}