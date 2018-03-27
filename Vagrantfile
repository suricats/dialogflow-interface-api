# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.synced_folder ".", "/srv/server"
  config.ssh.insert_key = false

  config.vm.provider :virtualbox do |v|
     v.name = "dialogflowapp"
     v.memory = 256
     v.linked_clone = true
  end

  config.vm.define :dialogflowapp do |app|
     app.vm.hostname = "dialogflowapp.lolodev.com"
     app.vm.network :private_network, ip: "192.168.60.6"
     app.vm.network "forwarded_port", guest: 8090, host: 8090
  end

  # Ansible provisioner.
  config.vm.provision "ansible" do |ansible|
     ansible.playbook = "provisioning/playbook.yml"
     ansible.inventory_path = "provisioning/inventories/inventory"
  end

end
