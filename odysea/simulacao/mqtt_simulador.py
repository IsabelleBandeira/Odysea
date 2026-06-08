import requests
import time
import json

# load route from file
with open("simulacao/dados_simulados.json", "r") as file:
    tracking_route = json.load(file)

for point in tracking_route:
    payload = {
        "entregaId": point["entrega_id"],
        "latitude": point["latitude"],
        "longitude": point["longitude"]
    }

    print(f"Sending GPS: {payload}")

    requests.post(
        "http://localhost:8080/tracking/events",
        json=payload
    )

    time.sleep(2)