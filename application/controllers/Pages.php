<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pages extends CI_Controller{
	public function view($page = 'home'){
		if(!file_exists(APPPATH.'views/pages/' .$page . '.php')){
			show_404(); # 404 Page
		}

		$this->load->helper('url'); # Let the navigation bar use the URL inbuild functions


		$this->load->view('templates/header'); # Header
		$this->load->view('templates/navigation'); # Navigation
		$this->load->view('pages/' . $page); # Page
		$this->load->view('templates/footer'); # Footer
	}
}
