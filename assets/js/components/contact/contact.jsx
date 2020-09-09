import React from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import "./Contact.css";
import ErrorBoundary from "../ErrorBoundary";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      name: "",
      email: "",
      subject: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();

    const templateId = "template_UymVgJzV";

    this.sendmessage(templateId, {
      message_html: this.state.message,
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
    });
    this.setState({ message: "", name: "", email: "", subject: "" });
  }

  sendmessage(templateId, variables) {
    emailjs
      .send("gmail", templateId, variables, "user_zi0mU8CyTugL7pYbFrQ4h")
      .then((res) => {
        toast.success("Email bien envoyer");
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((error) => toast.error("Erreur dans la distribution de l'email"));
  }

  render() {
    return (
      <footer className="contact bg-dark" id="contact">
        <form onSubmit={this.handleSubmit} className="mailing">
          <h1 className="contact_h1 mt-5">PRENDRE CONTACT ?</h1>
          <div className="container">
            <ErrorBoundary>
              <div className="form-group">
                <label className="text-white mt-5">Votre Nom</label>
                <input
                  className="form-control"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Jean"
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-white">Sujet du message</label>
                <input
                  className="form-control"
                  name="subject"
                  type="text"
                  value={this.state.subject}
                  onChange={this.handleChange}
                  placeholder="Sujet de votre message"
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-white">Votre email</label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="jean@mail.com"
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-white">Votre message</label>
                <textarea
                  className="form-control"
                  name="message"
                  onChange={this.handleChange}
                  placeholder="Message..."
                  required
                  value={this.state.message}
                />
              </div>

              <button type="submit" className="btn btn-warning">
                Envoyer
              </button>
            </ErrorBoundary>
          </div>
        </form>
      </footer>
    );
  }
}
