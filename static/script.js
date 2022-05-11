
class Modal {
    showNotFoundModal() {
        $("#notFound-modal").modal('show');
    }
    showConfirmDelte() {
        $("#alert-box").modal('show');
    }
    showMustEnterNumber() {
        $("#mustEnterNumber").modal('show');
    }
    showBrowseOptions() {
        $("#browseOptions").modal('show');
    }

    delete() {
        let modal_yes = document.getElementById("modal-yes").addEventListener("click", () => {
            document.getElementById("modal-delete");
            beginning_enabled_buttons();
        });
    }
}
class Requests {
    async getCostCenter(cost_center_number) {
        return await axios.get(`/api/accounting/CostCenter/${cost_center_number}`)
            .then(function (response) {
                // handle success
                return response
            })
            .catch(function (error) {
                // handle error
                if (error.response.status == 404) {
                    modal.showNotFoundModal()
                }
            })

    }
    showUserCostCenterResults(data) {
        if (data.status) {
            let arDescription = document.getElementById("arabicDescription");
            let engDescription = document.getElementById("englishDescription");

            arDescription.value = data["data"]["ArDescription"];
            engDescription.value = data["data"]["EngDescription"];
            disable_list_by_id(["arabicDescription", "englishDescription"]);
            enable_elements(["btn-edit-cost-center", "btn-return-cost-center", "btn-return-cost-center"]);
        }
    }

}

class Button {

    constructor() {
        this.new_buttons_enable = ["btn-save-cost-center", "btn-return-cost-center"];
        this.save_buttons_enable = ["btn-new-cost-center", "btn-browse-cost-center"];
        this.costCenterInputs = ["costCenterNumber", "arabicDescription", "englishDescription"];
        this.cost_center_id = "costCenterNumber"
    }

    disable_names_keep_number() {

        disable_list_by_id(this.costCenterInputs)
        enable_by_id(this.cost_center_id)
    }

    disable_number_keep_names() {
        enable_list_by_id(this.costCenterInputs)
        disable_by_id(this.cost_center_id)
    }
    new() {


        enable_buttons(this.new_buttons_enable); // This will disable other's non passed id's
        clear_inputs_by_id(this.costCenterInputs);
        this.disable_number_keep_names();


        let cost_center_id = document.getElementById("costCenterNumber");
        cost_center_id.placeholder = "XX";
    };

    save() {
        //  send_datat_to_db()

        clear_inputs_by_id(this.costCenterInputs)
        this.disable_names_keep_number()
        beginning_enabled_buttons();

    };

    browse() {
        // Do something
        modal.showBrowseOptions()
    };

    return() {
        clear_inputs_by_id(this.costCenterInputs.slice(0));
        this.disable_names_keep_number()
        beginning_enabled_buttons();
    };

    edit() {
        this.disable_number_keep_names()
        enable_buttons(this.new_buttons_enable);
    }


}
let modal = new Modal()
let requests = new Requests()
let button = new Button()

document.getElementById("costCenterNumber").addEventListener('keyup', async function onEvent(event) {
    if (event.key === "Enter") {
        let order_num_input = document.getElementById("costCenterNumber").value;
        if (Number.isInteger(order_num_input - 1) != true || order_num_input == '') {
            modal.showMustEnterNumber()
        }
        else if (Number.isInteger(order_num_input - 1) && order_num_input !== 0) {
            data = requests.showUserCostCenterResults(await requests.getCostCenter(order_num_input));
        };

    }
});




function clear_inputs_by_id(elements_id) {
    document.getElementById("costCenterNumber").placeholder = 'الرقم'
    for (var element_id of elements_id) {
        element = document.getElementById(element_id);
        element.value = "";
    }

}
// This enable_buttons() will disable buttons that are not passed
function enable_buttons(arr) {

    // Pass button id's needed to be enabled 


    let container = document.getElementById("cost-center-buttons-container").children;

    for (let index = 0; index < container.length; index++) {
        const element = container[index];

        if (arr.includes(element.id)) {
            element.disabled = false;
        }
        else {
            element.disabled = true;
        }
    }
}
function disable_buttons(arr) {

    // Pass button id's needed to be enabled 


    let container = document.getElementById("cost-center-buttons-container").children;

    for (let index = 0; index < container.length; index++) {
        const element = container[index];

        if (arr.includes(element.id)) {
            element.disabled = true;
        }
        else {
            element.disabled = false;
        }
    }
}

function enable_elements(arr) {
    // Pass button id's needed to be enabled
    for (element_id of arr) {
        let element = document.getElementById(element_id);
        element.disabled = false
    }
}
function disable_list_by_id(arr) {
    // Pass button id's needed to be disabled
    for (element_id of arr) {
        let element = document.getElementById(element_id);
        element.disabled = true
    }
}

function enable_by_id(ele_id) {

    let element_id = document.getElementById(ele_id);
    element_id.disabled = null
}
function disable_by_id(ele_id) {

    let element_id = document.getElementById(ele_id);
    element_id.disabled = true
}

function enable_list_by_id(elements_id_arr) {

    for (let index = 0; index < elements_id_arr.length; index++) {
        const element_id = elements_id_arr[index];

        let element_to_disable = document.getElementById(element_id);
        element_to_disable.disabled = false
    }

}
let beginning_enabled_buttons = () => {
    // These are the buttons which where enabled in the very beginning: New, Browse
    // This function helps alot with avoiding repeated code
    const buttons_id = ["btn-new-cost-center", "btn-browse-cost-center"];
    enable_buttons(buttons_id);
};









//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////                                                                                              //////
//////                      Handling warnings and it's functions                                    //////
//////                                                                                              //////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////



