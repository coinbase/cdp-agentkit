import requests


class WarpcastApiWrapper:
    """Wrapper for Warpcast API interactions."""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.warpcast.com"

    def _get_headers(self) -> dict:
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

    def post_cast(self, content: str) -> dict:
        url = f"{self.base_url}/casts"
        payload = {"content": content}
        response = requests.post(url, json=payload, headers=self._get_headers())
        response.raise_for_status()
        return response.json()

    def reply_to_cast(self, cast_id: str, content: str) -> dict:
        url = f"{self.base_url}/casts/{cast_id}/replies"
        payload = {"content": content}
        response = requests.post(url, json=payload, headers=self._get_headers())
        response.raise_for_status()
        return response.json()

    def get_user_details(self, user_id: str) -> dict:
        url = f"{self.base_url}/users/{user_id}"
        response = requests.get(url, headers=self._get_headers())
        response.raise_for_status()
        return response.json()

    def get_user_casts(self, user_id: str) -> dict:
        url = f"{self.base_url}/users/{user_id}/casts"
        response = requests.get(url, headers=self._get_headers())
        response.raise_for_status()
        return response.json()
