import requests


class WarpcastApiWrapper:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.warpcast.com"

    def post_cast(self, content: str) -> str:
        url = f"{self.base_url}/casts"
        headers = {"Authorization": f"Bearer {self.api_key}"}
        data = {"content": content}
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        return response.json()["id"]

    def reply_to_cast(self, cast_id: str, content: str) -> str:
        url = f"{self.base_url}/casts/{cast_id}/replies"
        headers = {"Authorization": f"Bearer {self.api_key}"}
        data = {"content": content}
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        return response.json()["id"]

    def get_user_details(self, user_id: str) -> dict:
        url = f"{self.base_url}/users/{user_id}"
        headers = {"Authorization": f"Bearer {self.api_key}"}
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()

    def get_user_casts(self, user_id: str) -> list:
        url = f"{self.base_url}/users/{user_id}/casts"
        headers = {"Authorization": f"Bearer {self.api_key}"}
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()["casts"]
