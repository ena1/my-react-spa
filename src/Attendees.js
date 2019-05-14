import React, { Component } from "react";
import firebase from "./Firebase";
import AttendeesList from "./AttendeesList";

class Attendees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      displayAttendees: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);

    ref.on("value", snapshot => {
      let attendees = snapshot.val();
      let attendeesList = [];
      for (let item in attendees) {
        attendeesList.push({
          attendeeID: item,
          attendeeName: attendees[item].attendeeName,
          attendeeEmail: attendees[item].attendeeEmail,
          star: attendees[item].star
        });
      }
      this.setState({
        displayAttendees: attendeesList
      });
    });
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  render() {
    const dataFilter = item =>
      item.attendeeName
        .toLowerCase()
        .match(this.state.searchQuery.toLowerCase()) && true;
    const filteredAttendees = this.state.displayAttendees.filter(dataFilter);

    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="font-weight-light text-center">Attendees</h1>
            <div className="card bg-light mb-4">
              <div className="card-body text-center">
                <input
                  type="text"
                  name="searchQuery"
                  value={this.state.searchQuery}
                  placeholder="Search Attendees"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <AttendeesList
          userID={this.props.userID}
          adminUser={this.props.adminUser}
          meetingID={this.props.meetingID}
          attendees={filteredAttendees}
        />
      </div>
    );
  }
}

export default Attendees;
