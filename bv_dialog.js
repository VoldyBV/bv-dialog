/* 
Skeleton of bv-dialog 
    1. bv-dialog -> container for other elements in the skeleton
    2. bv-dialog-header -> container for title of a dialog
    3. bv-dialog-content -> container for content of a dialog
    4. bv-dialog-footer -> container for action buttons of a dialog (OK, Cancel, Yes, No...);
*/
//Creating custom elements
(() => {
    //Creating bv-dialog
    class BVDialog extends HTMLElement {
        constructor() {
            super();
        }
		connectedCallback(){
            
		}
		static get observedAttributes() {
			return []
    	}
		attributeChangedCallback(name, oldValue, newValue) {
			switch(name){
			}
		}
        showDialog() {
            this.style.display = "flex";

			var header = this.querySelector("bv-dialog-header");
			var content = this.querySelector("bv-dialog-content");
			var footer = this.querySelector("bv-dialog-footer");

			if(header == null){
				content.classList.toggle("dialog-content-style-no-header");
			}

			if(footer == null){
				content.classList.toggle("dialog-content-style-no-footer");
			}
        }
		disconnectedCallback() {

		}
    }
    //Creating bv-dialog-header
    class BVDialogHeader extends HTMLElement {
        constructor() {
            super();
        }
		connectedCallback(){
            
		}
		static get observedAttributes() {
			return []
    	}
		attributeChangedCallback(name, oldValue, newValue) {
			switch(name){
			}
		}
		disconnectedCallback() {

		}
    }
    //Creating bv-dialog-content
    class BVDialogContent extends HTMLElement {
        constructor() {
            super();
        }
		connectedCallback(){
            
		}
		static get observedAttributes() {
			return []
    	}
		attributeChangedCallback(name, oldValue, newValue) {
			switch(name){
			}
		}
		disconnectedCallback() {

		}
    }
    //Creating bv-dialog-footer
    class BVDialogFooter extends HTMLElement {
        constructor() {
            super();
        }
		connectedCallback(){
            
		}
		static get observedAttributes() {
			return []
    	}
		attributeChangedCallback(name, oldValue, newValue) {
			switch(name){
			}
		}
        showDialog() {
            this.style.display = "flex";
        }
		disconnectedCallback() {

		}
    }

    //Definning custom elements
    window.customElements.define("bv-dialog", BVDialog);
    window.customElements.define("bv-dialog-header", BVDialogHeader);
    window.customElements.define("bv-dialog-content", BVDialogContent);
    window.customElements.define("bv-dialog-footer", BVDialogFooter);
})();
//DialogSettings class for dialog's settings
class DialogSettings {
	constructor(which) {
		this.title = "";
		this.message = "";
		this.css_classList = [];
		this.on_OK = undefined;
		this.on_Cancel = undefined;
		this.btn_OK_Text = "OK";
		this.btn_Cancel_Text = "Cancel";
		this.dialog_params = {};

		switch (which) {
			case "singleOption": 
			case "multiOption": this.options = []; break;
			case "prompt":
				this.type = undefined;
				this.placeholder = "";
				this.value = ""
				this.min = undefined;
				this.max = undefined;
				this.step = undefined;
				this.upper_lower = undefined;
				break;
			case "custom": 
				this.dialog = undefined;
				this.collect_dialog_values = undefined;
				this.action_callbacks = {}; 
				break;
			default: break;
		}
	}
}
//Premade dialogs
class BV_dialog {
	static #dialog_body = `
			<bv-dialog-header></bv-dialog-header>
			<bv-dialog-content></bv-dialog-content>
			<bv-dialog-footer></bv-dialog-footer>
	`;
	static #create_dialog(settings){
		try {
			settings.dialog = document.createElement("bv-dialog");
			settings.dialog.innerHTML = this.#dialog_body;
			document.body.appendChild(settings.dialog);
			
			//creating container for message
			var message = document.createElement("div");
			message.classList.toggle("message")
			//creating ok action button
			var ok_btn = document.createElement("button");
			ok_btn.classList.toggle("dialog-OK-button");
			//creating cancel action button
			var cancel_btn = document.createElement("button");
			cancel_btn.classList.toggle("dialog-Cancel-button");
			
			if(settings.title != undefined) {
				settings.dialog.querySelector("bv-dialog-header").innerHTML = settings.title;
			}
			if(Array.isArray(settings.css_classList)){
				settings.css_classList.forEach(item => {
					settings.dialog.classList.toggle(item);
				});
			}
			if(settings.message != undefined){
				message.innerHTML = settings.message;
				settings.dialog.querySelector("bv-dialog-content").appendChild(message);
			}
			if(settings.btn_OK_Text != undefined){
				ok_btn.innerHTML = settings.btn_OK_Text;
			}
			if(settings.btn_Cancel_Text != undefined){
				cancel_btn.innerHTML = settings.btn_Cancel_Text;
			}
			
			settings.dialog.querySelector("bv-dialog-footer").appendChild(cancel_btn);
			settings.dialog.querySelector("bv-dialog-footer").appendChild(ok_btn);
			
			return settings;
		}
		catch (error){
			console.error(error);
		}
	}
	
	static alert(settings) {
		try {
			settings = this.#create_dialog(settings);
			
			//ok action button function
			function OK() {
				settings = this;

				if(typeof settings.on_OK == "function") settings.on_OK(settings.dialog_params);
				
				document.body.removeChild(settings.dialog);
			}

			//adding function to ok action button
			var ok_btn = settings.dialog.querySelector("bv-dialog-footer button.dialog-OK-button");
			ok_btn.addEventListener("click", OK.bind(settings));

			//removing cancel action button
			var cancel_btn = settings.dialog.querySelector("bv-dialog-footer button.dialog-Cancel-button");
			settings.dialog.querySelector("bv-dialog-footer").removeChild(cancel_btn);

			//open dialog
			settings.dialog.showDialog();
		}
		catch (error){
			console.error(error);
		}
		
	}
	static confirm(settings) {
		try {
			settings = this.#create_dialog(settings);
			
			//ok action button function
			function OK() {
				settings = this;

				if(typeof settings.on_OK == "function") settings.on_OK(settings.dialog_params);
				
				document.body.removeChild(settings.dialog);
			}
			
			//cancel action button function
			function Cancel() {
				settings = this;

				if(typeof settings.on_Cancel == "function") settings.on_Cancel(settings.dialog_params);
				
				document.body.removeChild(settings.dialog);
			}

			//adding function to ok action button
			var ok_btn = settings.dialog.querySelector("bv-dialog-footer button.dialog-OK-button");
			ok_btn.addEventListener("click", OK.bind(settings));

			//removing cancel action button
			var cancel_btn = settings.dialog.querySelector("bv-dialog-footer button.dialog-Cancel-button");
			cancel_btn.addEventListener("click", Cancel.bind(settings))

			//open dialog
			settings.dialog.showDialog();
		}
		catch (error){
			console.error(error);
		}
		
	}
	static prompt(settings) {
		try {
			//add class for premade prompt dialog
			if(Array.isArray(settings.css_classList)){
				settings.css_classList.unshift("prompt-dialog");
			}
			settings = this.#create_dialog(settings);
			//Creating input field
			var input = document.createElement("input");
			//adding dialog-value attribute
			input.setAttribute("dialog-value", "");
			//checking if type is valid or not
			switch(settings.type){
				case "text":
				case "number":
				case "color":
				case "datetime-local":
				case "date":
				case "time":
				case "email": input.type = settings.type; break;
				default: throw "Invalid type for BV_dialog.prompt";
			}
			if(settings.placeholder) input.placeholder = settings.placeholder;
			if(!isNaN(settings.min * 1)) input.min = settings.min;
			if(!isNaN(settings.max * 1)) input.max = settings.max;
			if(!isNaN(settings.step * 1)) input.step = settings.step;
			if(settings.value != undefined) input.value = settings.value;

			if(settings.type == "text") {
				switch(settings.upper_lower){
					case "upper": 
						input.setAttribute("oninput", "this.value = this.value.toUpperCase();");
						break;
					case "lower": 
						input.setAttribute("oninput", "this.value = this.value.toLowerCase();");
						break;
					default: break;
				}
			}

			//ok action button function
			function OK() {
				settings = this;
				var dialog_value = settings.dialog.querySelector("input[dialog-value]").value;

				if(typeof settings.on_OK == "function"){
					settings.on_OK(dialog_value, settings.dialog_params);
				}

				document.body.removeChild(settings.dialog)
			}
			//cancel action button function
			function Cancel() {
				settings = this;

				if(typeof settings.on_Cancel == "function"){
					settings.on_Cancel(settings.dialog_params);
				}

				document.body.removeChild(settings.dialog)
			}

			//adding input field to dialog
			settings.dialog.querySelector("bv-dialog-content").appendChild(input);

			//adding functions to action buttons
			var ok_btn = settings.dialog.querySelector("button.dialog-OK-button");
			var cancel_btn = settings.dialog.querySelector("button.dialog-Cancel-button");

			ok_btn.addEventListener("click", OK.bind(settings));
			cancel_btn.addEventListener("click", Cancel.bind(settings));

			settings.dialog.showDialog();

			//focusing the input field
			input.focus();
		} catch (error) {
			console.error(error);
		}
	}
	static singleOption(settings){
		try {
			if(Array.isArray(settings.css_classList)){
				settings.css_classList.unshift("singleOption-multiOption-dialog");
			}
			settings = this.#create_dialog(settings);
			//If there are no options, throw an error
			if(!Array.isArray(settings.options) || settings.options.length < 1) 
				throw "You did not provide options for BV_dialog.singleOption";
			
			//If there are some options, go ahead
			//Creating radio button for each option
			settings.options.forEach((item) => {
				var label = document.createElement("label");
				var rb = document.createElement("input");

				rb.type = "radio"
				rb.name = "dialog-value";
				rb.setAttribute("real_value", item.real_value);
				rb.setAttribute("display_value", item.display_value);

				label.appendChild(rb);
				label.innerHTML += item.display_value;

				settings.dialog.querySelector("bv-dialog-content").appendChild(label);
			});

			//ok action button function
			function OK() {
				var settings = this;

				var dialog_value = {};
				var rbs = settings.dialog.querySelectorAll("bv-dialog-content input[type=radio]");

				rbs.forEach((item) => {
					if(item.checked){
						dialog_value.real_value = item.getAttribute("real_value");
						dialog_value.display_value = item.getAttribute("display_value");
					}
				});

				if(typeof settings.on_OK == "function"){
					settings.on_OK(dialog_value, settings.dialog_params);
				}

				document.body.removeChild(settings.dialog);
			}

			//cancel action button
			function Cancel() {
				var settings = this;

				if(typeof settings.on_Cancel == "function"){
					settings.on_Cancel(settings.dialog_params);
				}

				document.body.removeChild(settings.dialog);
			}

			//action buttons
			var ok_btn = settings.dialog.querySelector("button.dialog-OK-button")
			var cancel_btn = settings.dialog.querySelector("button.dialog-Cancel-button");

			ok_btn.addEventListener("click", OK.bind(settings));
			cancel_btn.addEventListener("click", Cancel.bind(settings));

			settings.dialog.showDialog();

		} catch (error) {
			console.error(error);
		}
	}
	static multiOption(settings){
		try {
			if(Array.isArray(settings.css_classList)){
				settings.css_classList.unshift("singleOption-multiOption-dialog");
			}
			settings = this.#create_dialog(settings);
			//If there are no options, throw an error
			if(!Array.isArray(settings.options) || settings.options.length < 1) 
				throw "You did not provide options for BV_dialog.multiOption";
			
			//If there are some options, go ahead
			//Creating checkboxes for each option
			settings.options.forEach((item) => {
				var label = document.createElement("label");
				var cb = document.createElement("input");

				cb.type = "checkbox"
				cb.name = "dialog-value";
				cb.setAttribute("real_value", item.real_value);
				cb.setAttribute("display_value", item.display_value);

				label.appendChild(cb);
				label.innerHTML += item.display_value;

				settings.dialog.querySelector("bv-dialog-content").appendChild(label);
			});

			//ok action button function
			function OK() {
				var settings = this;

				var dialog_values = [];
				var rbs = settings.dialog.querySelectorAll("bv-dialog-content input[type=checkbox]");

				rbs.forEach((item) => {
					if(item.checked){
						var choosen = {}
						choosen.real_value = item.getAttribute("real_value");
						choosen.display_value = item.getAttribute("display_value");
						dialog_values.push(choosen)
					}
				});

				if(typeof settings.on_OK == "function"){
					settings.on_OK(dialog_values, settings.dialog_params);
				}

				document.body.removeChild(settings.dialog);
			}

			//cancel action button
			function Cancel() {
				var settings = this;

				if(typeof settings.on_Cancel == "function"){
					settings.on_Cancel(settings.dialog_params);
				}

				document.body.removeChild(settings.dialog);
			}

			//action buttons
			var ok_btn = settings.dialog.querySelector("button.dialog-OK-button")
			var cancel_btn = settings.dialog.querySelector("button.dialog-Cancel-button");

			ok_btn.addEventListener("click", OK.bind(settings));
			cancel_btn.addEventListener("click", Cancel.bind(settings));

			settings.dialog.showDialog();

		} catch (error) {
			console.error(error);
		}
	}
	static custom(settings){
		try {
			//if setting.dialog is not bv-dialog element, throw an error
			if(settings.dialog == undefined || settings.dialog.tagName.toLowerCase() != "bv-dialog"){
				throw "The setting.dialog must be a bv-dialog element"
			}
			//Otherwise do this
			//Clone dialog
			settings.dialog = settings.dialog.cloneNode(true);
			//bind settings to settings.collect_dialog_values if settings.collect_dialog_values is a function
			if(typeof settings.collect_dialog_values == "function"){
				settings.collect_dialog_values = settings.collect_dialog_values.bind(settings);
			}
			//target action buttons of dialog
			var action_buttons = settings.dialog.querySelectorAll("bv-dialog-footer button");
			//Reseting the dialog
			function Close_Dialog(){
				document.body.removeChild(this.dialog)
			}
			action_buttons.forEach((item) => {
				//adding action to a button from
				if(item.hasAttribute("action-callback")){
					var action = item.getAttribute("action-callback");
					
					if(settings.action_callbacks[action]){
						item.addEventListener("click", settings.action_callbacks[action].bind(settings))
					}
				}

				if(item.hasAttribute("close-dialog")){
					var close = item.getAttribute("close-dialog");
					
					if(close === "true"){
						item.addEventListener("click", Close_Dialog.bind(settings));
					}
				}
			});

			//Adding cloned dialog to the document
			document.body.appendChild(settings.dialog)
			settings.dialog.showDialog();
		} catch (error) {
			console.error(error);
		}
	}
}
window.addEventListener("DOMContentLoaded", () => {
	var link = document.createElement("link")
	link.rel = "stylesheet";
	link.href = "https://combinatronics.com/VoldyBV/bv-dialog/master/bv_dialog.css";
	document.head.insertAdjacentElement("afterbegin", link);
})