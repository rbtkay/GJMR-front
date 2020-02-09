// component
import Form from "./Form";

class FormNote extends Form {
    handleChange(evt, name) {
        super.handleChange(evt, name);
        if (name === "value") {
            if (evt.target.value > 20 || evt.target.value < 0) {
                evt.target.setCustomValidity(
                    "La note doit être comprise entre 0 et 20."
                );
            } else {
                evt.target.setCustomValidity("");
            }
        }
    }
}

export default FormNote;
