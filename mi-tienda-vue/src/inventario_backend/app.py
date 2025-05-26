from flask import Flask, request, jsonify
from flask_cors import CORS
from schema import schema

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Servidor Flask + GraphQL operativo."

@app.route("/graphql", methods=["POST"])
def graphql_api():
    data = request.get_json()

    if not data or "query" not in data:
        return jsonify({"errors": ["No se encontró la consulta GraphQL en la solicitud"]}), 400

    result = schema.execute(
        data.get("query"),
        variables=data.get("variables")
    )

    if result.errors:
        return jsonify({"errors": [str(e) for e in result.errors]}), 400

    return jsonify({"data": result.data})

if __name__ == "__main__":
    app.run(debug=True)
