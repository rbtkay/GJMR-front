//module
import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// component
import Form from "../form/Form";
import Loading from "../Loading";
// actions
import { setLog } from "../../reducer/actions";
// functions
import { request, responseManagment } from "../../functions/fetch";

class ModuleNotation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            hidden: true
        };

        this.responseManagment = responseManagment.bind(this);
        this.toggleNoteForm = this.toggleNoteForm.bind(this);
        this.postNote = this.postNote.bind(this);
    }

    toggleNoteForm(evt) {
        this.setState({ hidden: !this.state.hidden });
    }

    async postNote(body) {
        if (body.value > 20 || body.value < 0) {
            // set log
        } else {
            const response = await request(`/notes`, this.props.user.token, {
                method: "POST",
                body
            });
            console.log(response);
            if (response.status === 201 || response.status === 200) {
                console.log("note inserted");
                this.props.updateModule(body, this.props.module._id);
            }else if(response.status === 403){
                this.props.history.push("/login");
            }
        }
    }

    render() {
        console.log(this.props.module);
        return (
            <li className="module">
                <span>{this.props.module.name}</span>
                {this.props.module.teacher ? (
                    <span> {this.props.module.teacher.last_name}</span>
                ) : null}
                {this.props.module.note ? (
                    <Fragment>
                        <span> {this.props.module.note.value}</span>
                        <span> {this.props.module.note.comment}</span>
                    </Fragment>
                ) : (
                        <Fragment>
                            <button onClick={this.toggleNoteForm}>Noter</button>
                            <div
                                className={
                                    "note-form" +
                                    (this.state.hidden ? " hidden" : "")
                                }
                            >
                                {this.state.loading ? (
                                    <Loading />
                                ) : (
                                        <Form
                                            form_items={[
                                                {
                                                    type: "number",
                                                    name: "value",
                                                    label: "Note",
                                                    required: true
                                                },
                                                {
                                                    type: "textarea",
                                                    name: "comment",
                                                    label: "Appréciation",
                                                    required: true
                                                },
                                                {
                                                    type: "hidden",
                                                    name: "student_id",
                                                    value: this.props.user._id,
                                                    required: true
                                                },
                                                {
                                                    type: "hidden",
                                                    name: "module_id",
                                                    value: this.props.module._id,
                                                    required: true
                                                }
                                            ]}
                                            callback={this.postNote}
                                        />
                                    )}
                            </div>
                        </Fragment>
                    )}
            </li>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.user };
};

const mapDispatchToProps = {
    setLog
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ModuleNotation)
);
