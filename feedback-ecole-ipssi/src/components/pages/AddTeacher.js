// class AddTeacher extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {  };
//     }
//     // render() {
//     //     return (
            
//     //     );
//     // }

//     async addStudentToYear(form_result) {
//         console.log(form_result);

//         let new_student = {
//             email: form_result['email'],
//             last_name: form_result['last_name'],
//             first_name: form_result['first_name'],
//             role: "student"
//         }

//         //TODO: add token
//         let response = await request(`/user`, { method: "POST", body: new_student });
//         if (response.status === 201) {
//             console.log("Student inserted");
//             this.props.history.push(`/${this.props.user.role}/dashboard`);
//         }
//         // localStorage.getItem(STORED_USER);
//     }
// }

// export default AddTeacher;