import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    torrentInfoHash: "",
    torrentMagnetURI: "",
    torrentName: "",
    torrentProgress: "",
    torrentFiles: []
  };

  componentDidMount() {
    // Sintel, a free, Creative Commons movie
    var torrentId =
      "magnet:?xt=urn:btih:c2d49674fd139f2f116577f9b825178d55d4139b&dn=Puss+In+Boots+The+Last+Wish+(2022)+%5B1080p%5D+%5BWEBRip%5D+%5B5.1%5D+%5BYTS.MX%5D&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2780%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2730%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com";

    var WebTorrent = require("webtorrent");
    var client = new WebTorrent();

    client.on("error", (err) => {
      console.log("[+] Webtorrent error: " + err.message);
    });

    client.add(torrentId, (torrent) => {
      const interval = setInterval(() => {
        // console.log('[+] Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
        this.setState({
          torrentProgress: (torrent.progress * 100).toFixed(1) + "%"
        });
      }, 5000);
      torrent.on("done", () => {
        console.log("Progress: 100%");
        clearInterval(interval);
      });
      console.log(torrent);
      this.setState({
        torrentInfoHash: torrent.infoHash,
        torrentMagnetURI: torrent.magnetURI,
        torrentName: torrent.name,
        torrentFiles: torrent.files
      });

      // TODO Figure out a better way to render these files
      this.state.torrentFiles.map((file, i) => {
        file.appendTo("body");
      });
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.torrentName}</h1>
        <p>
          <b>Torrent Info Hash: </b>
          {this.state.torrentInfoHash}
        </p>
        <p>
          <b>Torrent Progress: </b>
          {this.state.torrentProgress}
        </p>
      </div>
    );
  }
}

export default App;
