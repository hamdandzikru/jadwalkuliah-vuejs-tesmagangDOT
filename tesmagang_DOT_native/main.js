var app = new Vue({
	el: '#app',
	data: {
		errorMsg: "",
		successMsg: "",
		showAddModal: false,
		showEditModal: false,
		showDeleteModal: false,
		users: [],
		newUser: {nama: "", matkul: "", jadwal: ""},
		currentUser: {}
	},
	mounted: function(){
		this.getAllUsers();
	},
	methods: {
		getAllUsers(){
			axios.get("http://localhost/Tes%20Magang%20DOT%20-%20vuejs/tesmagang_DOT_native/process.php?action=read").then(function(response){
				if (response.data.error) {
					app.errorMsg = response.data.message;
				}else{
					app.users = response.data.users;
				}
			});
		},
		addUser(){
			var formData = app.toFormData(app.newUser);
			axios.post("http://localhost/Tes%20Magang%20DOT%20-%20vuejs/tesmagang_DOT_native/process.php?action=create", formData).then(function(response){
				app.newUser = {nama: "", matkul: "", jadwal: ""};
				if (response.data.error) {
					app.errorMsg = response.data.message;
				}else{
					app.successMsg = response.data.message;
					app.getAllUsers();
				}
			});
		},

		updateUser(){
			var formData = app.toFormData(app.currentUser);
			axios.post("http://localhost/Tes%20Magang%20DOT%20-%20vuejs/tesmagang_DOT_native/process.php?action=update", formData).then(function(response){
				app.newUser = {nama: "", matkul: "", jadwal: ""};
				if (response.data.error) {
					app.errorMsg = response.data.message;
				}else{
					app.successMsg = response.data.message;
					app.getAllUsers();
				}
			});
		},

		deleteUser(){
			var formData = app.toFormData(app.currentUser);
			axios.post("http://localhost/Tes%20Magang%20DOT%20-%20vuejs/tesmagang_DOT_native/process.php?action=delete", formData).then(function(response){
				app.newUser = {nama: "", matkul: "", jadwal: ""};
				if (response.data.error) {
					app.errorMsg = response.data.message;
				}else{
					app.successMsg = response.data.message;
					app.getAllUsers();
				}
			});
		},

		toFormData(obj){
			var fd = new FormData();
			for(var i in obj){
				fd.append(i, obj[i]);
			}
			return fd;
		},
		selectUser(user){
			app.currentUser = user;
		},
		clearMsg(){
			app.errorMsg = "";
			app.successMsg = "";
		}
	}
});