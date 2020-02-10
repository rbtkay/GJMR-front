//module
import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// component
import FormNote from "../form/FormNote";
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
        const response = await request(`/notes`, this.props.user.token, {
            method: "POST",
            body
        });
        console.log(response);
        if (responseManagment(response)) {
            console.log("note inserted");
            this.props.setLog({
                type: "success",
                message: "Note ajoutée."
            });
            this.props.updateModule(body, this.props.module._id);
        }
    }

    render() {
        return (
            <Fragment>
                <tr
                    className="tr-clickable"
                    onClick={
                        !this.props.module.note ? this.toggleNoteForm : null
                    }
                >
                    <td>
                        <a href={`/modules/${this.props.module._id}`}>
                            {this.props.module.name}
                        </a>
                    </td>
                    <td>
                        {this.props.module.teacher
                            ? `${this.props.module.teacher.first_name} ${this.props.module.teacher.last_name}`
                            : null}
                    </td>
                    {this.props.module.note ? (
                        <Fragment>
                            <td> {this.props.module.note.value}</td>
                            <td> {this.props.module.note.comment}</td>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <td>
                                <button>Noter</button>
                            </td>
                            <td>-</td>
                        </Fragment>
                    )}
                </tr>
                <tr
                    className={
                        "tr-hiddenable" + (this.state.hidden ? " hidden" : "")
                    }
                >
                    <td colSpan="4">
                        <div className="animated-cell">
                            {" "}
                            {this.state.loading ? (
                                <Loading />
                            ) : (
                                <FormNote
                                    form_items={[
                                        {
                                            type: "number",
                                            name: "value",
                                            label: "Note",
                                            placeholder: "/20",
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
                    </td>
                </tr>
            </Fragment>
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
