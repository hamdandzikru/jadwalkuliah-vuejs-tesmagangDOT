<?php
	$conn = new mysqli("localhost","root","","db_jadwal");
	if ($conn->connect_error) {
		die("Koneksi Gagal".$conn->connect_error);
	}
	$result = array('error'=>false);
	$action = '';

	if (isset($_GET['action'])) {
		$action = $_GET['action'];
	}

	if ($action == 'read') {
		$sql = $conn->query("SELECT * FROM users");
		$users = array();
		while ($row = $sql->fetch_assoc()) {
			array_push($users, $row);
		}
		$result['users'] = $users;
	}

	if ($action == 'create') {
		$nama = $_POST['nama'];
		$matkul = $_POST['matkul'];
		$jadwal = $_POST['jadwal'];

		$sql = $conn->query("INSERT INTO users(nama, matkul, jadwal) VALUES('$nama','$matkul','$jadwal')");
		
		if ($sql) {
			$result['message'] = "Jadwal berhasil ditambahkan!";
		}else{
			$result['error'] = true;
			$result['message'] = "Gagal Menambahkan Jadwal!";
		}

		// $users = array();
		// while ($row = $sql->fetch_assoc()) {
		// 	array_push($users, $row);
		// }
		// $result['users'] = $users;
	}

	if ($action == 'update') {
		$id = $_POST['id'];
		$nama = $_POST['nama'];
		$matkul = $_POST['matkul'];
		$jadwal = $_POST['jadwal'];

		$sql = $conn->query("UPDATE users SET nama='$nama', matkul='$matkul',
		 jadwal='$jadwal' WHERE id='$id' ");
		
		if ($sql) {
			$result['message'] = "Jadwal berhasil diubah!";
		}else{
			$result['error'] = true;
			$result['message'] = "Gagal Mengubah Jadwal!";
		}
	}

	if ($action == 'delete') {
		$id = $_POST['id'];
		

		$sql = $conn->query("DELETE FROM users WHERE id='$id'");
		
		if ($sql) {
			$result['message'] = "Jadwal berhasil dihapus!";
		}else{
			$result['error'] = true;
			$result['message'] = "Gagal Menghapus Jadwal!";
		}
	}

	$conn->close();
	echo json_encode($result);
?>