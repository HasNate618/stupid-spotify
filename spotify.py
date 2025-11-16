import base64
import os
import random
import time
import urllib.parse

import requests
from flask import Flask, redirect, request, jsonify

app = Flask(__name__)

# ---------------- CONFIG ----------------

# >>>>>> FILL THESE IN <<<<<<
CLIENT_ID = "27f81310e38146e292262f55398e4a53"
CLIENT_SECRET = "14255e976b434c58ad692ca18d64a252"
REDIRECT_URI = "http://127.0.0.1:8888/callback"  # must match Spotify dashboard exactly

# The playlist that contains all your terrible songs :)
PLAYLIST_ID = "5xbMyvLwLbtlhKuAOfWpsa"

# Scopes we need:
SCOPE = (
    "playlist-read-private "
    "user-modify-playback-state "
    "user-read-playback-state "
    "streaming"
)

# In a real app you'd store these in a DB or session.
access_token = None
refresh_token = None
token_expires_at = 0  # UNIX timestamp


# ---------------- AUTH HELPERS ----------------

def set_token_info(token_json):
    """Store access token, refresh token, and expiry from Spotify response."""
    global access_token, refresh_token, token_expires_at

    access_token = token_json.get("access_token")
    expires_in = token_json.get("expires_in", 3600)
    token_expires_at = time.time() + expires_in - 60  # refresh 1 min early

    # refresh_token may not be in every response (only first time)
    if token_json.get("refresh_token"):
        refresh_token = token_json["refresh_token"]


def is_token_expired():
    """Check if our stored access token is about to expire or missing."""
    return not access_token or time.time() >= token_expires_at


def exchange_code_for_token(auth_code):
    """Exchange authorization code for access + refresh tokens."""
    token_url = "https://accounts.spotify.com/api/token"

    data = {
        "grant_type": "authorization_code",
        "code": auth_code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    resp = requests.post(token_url, data=data, headers=headers)
    if resp.status_code != 200:
        print("Error exchanging code:", resp.status_code, resp.text)
        raise Exception("Failed to get tokens")

    token_json = resp.json()
    set_token_info(token_json)


def refresh_access_token():
    """Use the refresh token to get a new access token."""
    global refresh_token
    if not refresh_token:
        raise Exception("No refresh_token stored yet!")

    token_url = "https://accounts.spotify.com/api/token"

    data = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }

    resp = requests.post(token_url, data=data)
    if resp.status_code != 200:
        print("Error refreshing token:", resp.status_code, resp.text)
        raise Exception("Failed to refresh token")

    token_json = resp.json()
    set_token_info(token_json)


def ensure_access_token():
    """Make sure we have a valid access token (refresh if needed)."""
    if is_token_expired():
        refresh_access_token()


# ---------------- SPOTIFY API HELPER ----------------

def spotify_api_request(method, endpoint, params=None, json_body=None):
    """
    Wrapper for Spotify Web API calls.
    `endpoint` is relative to https://api.spotify.com/v1/
    """
    ensure_access_token()

    url = f"https://api.spotify.com/v1/{endpoint}"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    resp = requests.request(method, url, headers=headers, params=params, json=json_body)

    # If token somehow expired, try once to refresh and retry
    if resp.status_code == 401:
        print("Got 401, trying to refresh token...")
        refresh_access_token()
        headers["Authorization"] = f"Bearer {access_token}"
        resp = requests.request(method, url, headers=headers, params=params, json=json_body)

    # For debugging
    if resp.status_code >= 400:
        print("Spotify API error:", resp.status_code, resp.text)

    if resp.content:
        try:
            return resp.json()
        except ValueError:
            return None
    return None


# ---------------- PLAYLIST / PLAYBACK HELPERS ----------------

def get_playlist_tracks(playlist_id, limit=100):
    """
    Get up to `limit` tracks from the playlist.
    (You can paginate for more if needed.)
    """
    endpoint = f"playlists/{playlist_id}/tracks"
    params = {
        "limit": limit,
        "offset": 0
    }

    data = spotify_api_request("GET", endpoint, params=params)
    if not data:
        return []

    items = data.get("items", [])
    tracks = []
    for item in items:
        track = item.get("track")
        if track and track.get("uri"):
            tracks.append(track)

    return tracks


def pick_random_track(tracks):
    if not tracks:
        raise ValueError("No tracks found in playlist.")
    return random.choice(tracks)


def play_track(track_uri, device_id=None):
    """
    Start playback of a single track URI.
    If device_id is None, Spotify chooses the active device.
    """
    endpoint = "me/player/play"
    params = {}
    if device_id:
        params["device_id"] = device_id

    body = {
        "uris": [track_uri]
    }

    spotify_api_request("PUT", endpoint, params=params, json_body=body)


# ---------------- FLASK ROUTES ----------------

@app.route("/")
def index():
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Shitty Spotify In-Browser</title>
      <style>
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: #040712;
          color: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
        }
        .card {
          background: #171923;
          padding: 24px 28px;
          border-radius: 16px;
          box-shadow: 0 18px 45px rgba(0,0,0,0.6);
          max-width: 520px;
          width: 100%;
        }
        h1 {
          font-size: 1.7rem;
          margin-bottom: 0.4rem;
        }
        p {
          margin: 0.25rem 0 0.9rem;
          font-size: 0.95rem;
          color: #c5c5d5;
        }
        .buttons-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 8px;
        }
        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
        }
        #connect-btn {
          background: #1db954;
          color: #000;
        }
        #play-btn {
          background: #2f3137;
          color: #f5f5f5;
        }
        #pause-btn, #resume-btn, #next-btn {
          background: #23252f;
          color: #f5f5f5;
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .status {
          margin-top: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          background: #101018;
          font-size: 0.9rem;
          white-space: pre-line;
          min-height: 40px;
        }
        .small {
          font-size: 0.8rem;
          opacity: 0.8;
          margin-top: 6px;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          font-size: 0.78rem;
          padding: 3px 8px;
          border-radius: 999px;
          background: rgba(29,185,84,0.14);
          color: #9be7b4;
          margin-bottom: 6px;
        }
      </style>
      <!-- Spotify Web Playback SDK -->
      <script src="https://sdk.scdn.co/spotify-player.js"></script>
    </head>
    <body>
      <div class="card">
        <div class="badge">Web Player • In-browser audio</div>
        <h1>Shitty Spotify In-Browser</h1>
        <p>Hijack your own browser tab and force random trash songs from your cursed playlist.</p>
        <div class="buttons-row">
          <button id="connect-btn" onclick="window.location.href='/login'">Connect Spotify</button>
        </div>
        <div class="buttons-row">
          <button id="play-btn" disabled>▶ Play Random Trash</button>
          <button id="pause-btn" disabled>⏸ Pause</button>
          <button id="resume-btn" disabled>⏯ Resume</button>
          <button id="next-btn" disabled>⏭ Next Trash</button>
        </div>
        <div id="status" class="status">Not connected yet.</div>
        <div class="small">
          Requirements:<br/>
          • Spotify Premium<br/>
          • Same account logged into Spotify and authorized here<br/>
          • You must click in the page before audio can start
        </div>
      </div>
      <script>
        const statusBox = document.getElementById('status');
        const playBtn = document.getElementById('play-btn');
        const pauseBtn = document.getElementById('pause-btn');
        const resumeBtn = document.getElementById('resume-btn');
        const nextBtn = document.getElementById('next-btn');
        let player = null;
        let deviceId = null;
        function setControlsEnabled(enabled) {
          playBtn.disabled = !enabled;
          pauseBtn.disabled = !enabled;
          resumeBtn.disabled = !enabled;
          nextBtn.disabled = !enabled;
        }
        // Called when the Spotify Web Playback SDK is ready
        window.onSpotifyWebPlaybackSDKReady = async () => {
          statusBox.textContent = 'Spotify Web Playback SDK ready. Getting access token...';
          try {
            const res = await fetch('/token');
            if (!res.ok) {
              const err = await res.json().catch(() => ({}));
              statusBox.textContent = 'Not authorized yet. Click "Connect Spotify" first.';
              console.warn('Token error:', err);
              return;
            }
            const data = await res.json();
            const token = data.access_token;
            player = new Spotify.Player({
              name: 'Shitty Spotify Web Player',
              getOAuthToken: cb => { cb(token); },
              volume: 0.7
            });
            // Error handling
            player.addListener('initialization_error', ({ message }) => {
              console.error(message);
              statusBox.textContent = 'Initialization error: ' + message;
            });
            player.addListener('authentication_error', ({ message }) => {
              console.error(message);
              statusBox.textContent = 'Authentication error: ' + message;
            });
            player.addListener('account_error', ({ message }) => {
              console.error(message);
              statusBox.textContent = 'Account error (need Premium?): ' + message;
            });
            player.addListener('playback_error', ({ message }) => {
              console.error(message);
              statusBox.textContent = 'Playback error: ' + message;
            });
            // Optional: track state changes
            player.addListener('player_state_changed', state => {
              console.log('Player state changed:', state);
            });
            // Ready
            player.addListener('ready', ({ device_id }) => {
              console.log('Ready with Device ID', device_id);
              statusBox.textContent = 'Web player ready.\\nDevice ID: ' + device_id + '\\nUse the controls to play trash.';
              deviceId = device_id;
              setControlsEnabled(true);
            });
            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
              console.log('Device ID has gone offline', device_id);
              statusBox.textContent = 'Web player went offline.';
              setControlsEnabled(false);
            });
            // Connect to the player
            player.connect();
          } catch (e) {
            console.error(e);
            statusBox.textContent = 'Error getting token. Make sure you have connected Spotify via the button above.';
          }
        };
        // Play random trash (calls your backend)
        async function playRandom() {
          if (!deviceId) {
            statusBox.textContent = 'Player not ready yet.';
            return;
          }
          statusBox.textContent = 'Summoning a random trash song into this tab...';
          try {
            const res = await fetch('/play-random?device_id=' + encodeURIComponent(deviceId));
            const text = await res.text();
            statusBox.innerHTML = text;
          } catch (err) {
            console.error(err);
            statusBox.textContent = 'Error talking to backend. Check console / server logs.';
          }
        }
        playBtn.addEventListener('click', playRandom);
        // Pause playback using Web Playback SDK
        pauseBtn.addEventListener('click', async () => {
          if (!player) return;
          try {
            await player.pause();
            statusBox.textContent = 'Paused.';
          } catch (e) {
            console.error(e);
            statusBox.textContent = 'Error pausing playback.';
          }
        });
        // Resume playback using Web Playback SDK
        resumeBtn.addEventListener('click', async () => {
          if (!player) return;
          try {
            await player.resume();
            statusBox.textContent = 'Resumed.';
          } catch (e) {
            console.error(e);
            statusBox.textContent = 'Error resuming playback.';
          }
        });
        // Next trash = just ask backend for another random track
        nextBtn.addEventListener('click', async () => {
          await playRandom();
        });
      </script>
    </body>
    </html>
    """


@app.route("/login")
def login():
    params = {
        "client_id": CLIENT_ID,
        "response_type": "code",
        "redirect_uri": REDIRECT_URI,
        "scope": SCOPE,
        "show_dialog": "true"
    }

    url = "https://accounts.spotify.com/authorize?" + urllib.parse.urlencode(params)
    return redirect(url)


@app.route("/callback")
def callback():
    error = request.args.get("error")
    if error:
        return f"Error from Spotify: {error}"

    auth_code = request.args.get("code")
    if not auth_code:
        return "No code provided in callback."

    try:
        exchange_code_for_token(auth_code)
    except Exception as e:
        return f"Failed to exchange code for token: {e}"

    return """
    <h2>Spotify linked!</h2>
    <p>You can now go back to <a href="/">the main page</a> and use the web player.</p>
    """


@app.route("/token")
def get_token():
    """
    Frontend uses this to get a fresh access token for the Web Playback SDK.
    """
    global access_token, refresh_token
    if not access_token and not refresh_token:
        return jsonify({"error": "not_authorized"}), 401

    try:
        ensure_access_token()
        return jsonify({"access_token": access_token})
    except Exception as e:
        return jsonify({"error": "token_error", "message": str(e)}), 500


@app.route("/store-tokens", methods=["POST"])
def store_tokens():
    """
    Receive tokens from Next.js callback and store them.
    """
    try:
        token_data = request.get_json()
        if not token_data:
            return jsonify({"error": "no_token_data"}), 400
        
        set_token_info(token_data)
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/play-random")
def play_random():
    """
    Fetch tracks from your trash playlist, pick one at random,
    and tell Spotify to play it. If ?device_id= is provided, play on that device.
    """
    global access_token
    if not access_token and not refresh_token:
        return "You need to <a href='/login'>connect Spotify first</a>.", 400

    device_id = request.args.get("device_id")

    try:
        tracks = get_playlist_tracks(PLAYLIST_ID)
        if not tracks:
            return "No tracks found in playlist. Check PLAYLIST_ID / scopes / playlist visibility.", 400

        t = pick_random_track(tracks)
        name = t.get("name")
        artists = ", ".join(a["name"] for a in t.get("artists", []))
        uri = t.get("uri")

        play_track(uri, device_id=device_id)

        return f"""
        <p>Playing: <b>{name}</b> by {artists}</p>
        <p>Device: {device_id or "default active device"}</p>
        """
    except Exception as e:
        return f"Error while trying to play random track: {e}", 500


if __name__ == "__main__":
    app.run(host="localhost", port=8888, debug=True)