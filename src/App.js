// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import firebase from "firebase";
import config from "./config";
import "firebase/firestore";

class App extends React.Component {
  constructor() {
    super();

    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(config);
    } else {
      this.app = firebase.app();
    }
    this.database = this.app.database();

    this.state = {
      read: "",
    };
    // this.name = "";
  }

  //  const [name, setName] = useState('');

  handleChange = (e) => {
    // setName(e.target.value);
    console.log(e.target.value);
  };

  readData = () => {
    const path = "/film_festival";
    this.database.ref(path).once("value", (e) => {
      const data = e.val();
      console.log(data.cannes.palme_d_or[9]);
      // this.setState({ read: data });
    });
  };

  render() {
    const { read } = this.state;
    return (
      <div>
        <div>
          <input
            type="text"
            name="text"
            value={this.name}
            onChange={() => this.handleChange}
          />
          <button type="button" onClick={() => this.readData()}>
            read
          </button>
          <div>data: {read}</div>
        </div>
      </div>
    );
  }
}

export default App;
